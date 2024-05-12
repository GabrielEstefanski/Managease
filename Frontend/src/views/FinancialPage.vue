<template>
    <div class="container">
        <div class="table">
            <template v-if="!isLoaded">
                <h1 class="title">{{ $t('financials_page.title') }}</h1>
                <div class="spinner-container">
                    <i class="pi pi-spin pi-spinner large-spinner" />
                </div>
            </template>
            <template v-else>
            <h1 class="title">{{ branch.name }}</h1>
                <Toolbar>
                    <template #start>
                        <Button icon="pi pi-file-excel" class="mr-2" severity="secondary"
                            @click="exportToExcel"></Button>
                        <Button icon="pi pi-print" severity="secondary" @click="exportToPDF"></Button>
                    </template>
                    <template #center>
                        <InputGroup>
                            <InputText icon="pi pi-search" v-model="searchText"
                                :placeholder="$t('financials_page.search_bar')" style="width: 30vw;"
                                @input="filterFinancials" rounded></InputText>
                            <InputGroupAddon>
                                <i class="pi pi-search"></i>
                            </InputGroupAddon>
                        </InputGroup>
                    </template>
                    <template #end>
                        <Button :label="$t('financials_page.button_add_financial')" @click="openModal()"></Button>
                    </template>
                </Toolbar>
                <div class="dataTable">
                    <DataTable :value="filteredFinancials" ref="tableRef" :paginator="true" :rows="10"
                        tableStyle="width: 100%;">
                        <template #empty> No financials found. </template>
                        <Column field="type" :header="$t('financials_page.table_column_type')" sortable
                            :style="{ 'width': '15%' }">
                            <template #body="{ data }">
                                <div>{{ getTypeById(data.type) }}</div>
                            </template>
                        </Column>
                        <Column field="category" :header="$t('financials_page.table_column_category')" sortable
                            :style="{ 'width': '15%' }">
                            <template #body="{ data }">
                                <div>{{ categoryNameById(data.category) }}</div>
                            </template>
                        </Column>
                        <Column field="date" :header="$t('financials_page.table_column_date')" sortable
                            :style="{ 'width': '15%' }">
                            <template #body="{ data }">
                                <data>{{ formatDate(data.date) }}</data>
                            </template>
                        </Column>
                        <Column field="amount" :header="$t('financials_page.table_column_amount')" sortable
                            :style="{ 'width': '10%' }">
                            <template #body="{ data }">
                                <div>{{ formatCurrency(data.amount) }}</div>
                            </template>
                        </Column>
                        <Column field="actions" :header="$t('financials_page.table_column_actions')"
                            :style="{ 'width': '5%' }">
                            <template #body="{ data }">
                                <div class="p-d-flex p-jc-end p-ai-center">
                                    <Button icon="pi pi-pencil" class="mr-2 mb-2" severity="success" rounded
                                        @click="openModal(data)"></button>
                                    <Button icon="pi pi-times" class="mb-2" severity="danger" rounded
                                        @click="deleteItem(data)"></Button>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </div>
    </div>
    <DeleteModal v-if="isDeleteModalVisible" v-model:visible="isDeleteModalVisible" :id="idFinancial"
        :items="'financial'" @itemDeleted="handlerFilteringFinancials" />
    <FinancialModal v-if="isModalVisible" v-model:visible="isModalVisible" :id="idFinancial" :idBranche="idBranch"
        @financialUpdated="handlerFilteringFinancials" />
</template>


<script lang="ts">
import { defineComponent } from 'vue';

import axiosInstance from '../http/index';
import IFinancial from '../interfaces/IFinancial';
import DeleteModal from '../components/modals/DeleteModal.vue';
import FinancialModal from '@/components/modals/FinancialModal.vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import router from '../router';
import { useStore } from 'vuex';
import IBranch from '../interfaces/IBranch';


export default defineComponent({
    name: 'FinancialPage',
    props: {
        idBranch: {
            type: String,
            required: true
        }
    },
    components: {
        FinancialModal,
        DeleteModal,
    },
    data() {
        return {
            financials: [] as IFinancial[],
            filteredFinancials: [] as IFinancial[],
            branch: {} as IBranch,
            isDeleteModalVisible: false,
            isModalVisible: false,
            isLoaded: false,
            id: '',
            idFinancial: '',
            searchText: '',
            typeFinancial: [
                { id: 1, name: this.$t('array_type_fiancial.revenue') },
                { id: 2, name: this.$t('array_type_fiancial.expense') }
            ],
            categoryFinancial: {
                [this.$t('array_category_financial.product_sales')]: 1,
                [this.$t('array_category_financial.services_rendered')]: 2,
                [this.$t('array_category_financial.commissions')]: 3,
                [this.$t('array_category_financial.property_rent')]: 4,
                [this.$t('array_category_financial.investments')]: 5,
                [this.$t('array_category_financial.others_revenues')]: 6,
                [this.$t('array_category_financial.salaries_benefits')]: 7,
                [this.$t('array_category_financial.rent')]: 8,
                [this.$t('array_category_financial.raw_materials')]: 9,
                [this.$t('array_category_financial.maintenance')]: 10,
                [this.$t('array_category_financial.taxes_fees')]: 11,
                [this.$t('array_category_financial.others_expense')]: 12
            }
        }
    },
    created() {
        const store = useStore();
        const userId = store.state.userId;
        const userName = store.state.userName;
        if (!userId && !userName) {
            router.push('/');
        }
    },
    async mounted() {
        await this.fetchBranches();
        await this.fetchFinancials();
        this.isLoaded = true;
    },
    methods: {
        async fetchBranches() {
            try {
                const response = await axiosInstance.get(`/branch/${this.idBranch}`);
                this.branch = response.data as IBranch;
            } catch (error) {
                console.error('Error fetching branches ', error);
            }
        },
        async fetchFinancials() {
            try {
                const response = await axiosInstance.get('/financial/');
                this.financials = response.data as IFinancial[];
                this.financials = this.financials.filter(financial => this.branch._id === financial.branch_id);
                this.financials = this.financials.map(financial => ({
                    ...financial,
                    date: this.formatDate(financial.date)
                }));
                this.filteredFinancials = this.financials
            } catch (error) {
                console.error('Error fetching financials', error);
            }
        },
        async handlerFilteringFinancials() {
            await this.fetchBranches();
            this.fetchFinancials();
        },
        formatDate(dateString: string) {
            return dateString ? new Date(dateString).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
        },
        openModal(financial?: IFinancial): void {
            this.idFinancial = financial ? financial._id : '';
            this.isModalVisible = true;
        },
        formatCurrency(value?: string): string {
            if (!value || isNaN(parseFloat(value))) {
                return '';
            }
            const numericValue = parseFloat(value);
            return '$' + numericValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        },
        closeModal(): void {
            this.isModalVisible = false;
        },
        onConfirm(event: { id: number }) {
            this.isModalVisible = false;
            this.$emit('onConfirm', event);
        },
        deleteItem(financial: IFinancial) {
            this.idFinancial = financial._id;
            this.isDeleteModalVisible = true;
        },
        getTypeById(typeId: number) {
            return this.typeFinancial.find(type => type.id === typeId)?.name;
        },
        categoryNameById(id: number) {
            return Object.entries(this.categoryFinancial)
                .filter(([name, categoryId]) => categoryId === id)
                .map(([name, categoryId]) => name)
                .join('') || '';
        },
        exportToPDF() {
            const pdf = new jsPDF('p', 'pt', 'a4');
            const columns = [
                { title: "Category", dataKey: "category" },
                { title: "Type", dataKey: "type" },
                { title: "Date", dataKey: "date" },
                { title: "Amount", dataKey: "amount" },
                { title: "Description", dataKey: "description" },
            ];
            const rows = this.filteredFinancials.map(financial => ({
                "category": this.categoryNameById(financial.category),
                "type": this.getTypeById(financial.type),
                "amount": this.formatCurrency(financial.amount.toString()),
                "date": financial.date,
                "description": financial.description,
            }));

            pdf.autoTable({
                head: [columns.map(col => col.title)],
                body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row])),
                startY: 40,
                styles: { overflow: 'linebreak' },
                columnStyles: {
                    0: { cellWidth: 100 }, // Category
                    1: { cellWidth: 80 }, // Type
                    2: { cellWidth: 100 }, // Amount
                    3: { cellWidth: 80 }, // Date
                    4: { cellWidth: 150 }, //Description
                },
                margin: { top: 60 }
            });

            pdf.save('Financial.pdf');
        },
        exportToExcel() {
            const data = this.filteredFinancials.map((financial: IFinancial) => ({
                Category: this.categoryNameById(financial.category),
                Type: this.getTypeById(financial.type),
                Date: this.formatDate(financial.date),
                Amount: this.formatCurrency(financial.amount.toString()),
                Description: financial.description
            }));
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Financial');
            XLSX.writeFile(wb, 'Financial.xlsx');
        },
        filterFinancials() {
            const searchTextLower = this.searchText.toLowerCase();
            this.filteredFinancials = this.financials.filter(financial => {
                const category = this.categoryNameById(financial.category)?.toLowerCase() || '';
                const type = this.getTypeById(financial.type)?.toLowerCase() || '';
                const date = financial.date?.toLowerCase() || '';
                const amount = (financial.amount)?.toString() || '';

                return category.includes(searchTextLower) ||
                    type.includes(searchTextLower) ||
                    date.includes(searchTextLower) ||
                    amount.includes(searchTextLower);
            });
        },

    }
});
</script>

<style scoped>
.table {
    width: 100%;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 99%;
}
</style>