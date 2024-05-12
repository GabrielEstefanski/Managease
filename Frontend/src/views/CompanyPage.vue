<template>
    <div class="container">
        <div class="table">
            <h1 class="title">{{ $t('companies_page.title') }}</h1>
            <template v-if="!isLoaded">
                <div class="spinner-container">
                    <i class="pi pi-spin pi-spinner large-spinner" />
                </div>
            </template>
            <template v-else>
                <Toolbar>
                    <template #start>
                        <Button icon="pi pi-file-excel" class="mr-2" severity="secondary"
                            @click="exportToExcel"></Button>
                        <Button icon="pi pi-print" severity="secondary" @click="exportToPDF"></Button>
                    </template>
                    <template #center>
                        <InputGroup>
                            <InputText icon="pi pi-search" v-model="searchText"
                                :placeholder="$t('companies_page.search_bar')" style="width: 30vw;"
                                @input="filterCompanies" rounded></InputText>
                            <InputGroupAddon>
                                <i class="pi pi-search"></i>
                            </InputGroupAddon>
                        </InputGroup>
                    </template>
                    <template #end>
                        <Button class="button-add" :label="$t('companies_page.button_add_company')"
                            @click="openModal()"></Button>
                    </template>
                </Toolbar>
                <div class="dataTable" ref="tableRef">
                    <DataTable :value="filteredCompanies" :paginator="true" :rows="10" tableStyle="width: 100%">
                        <template #empty>{{ $t('companies_page.empty_table') }} </template>
                        <Column field="name" filterField="name" :header="$t('companies_page.table_column_name')"
                            sortable :style="{ 'width': '25%' }"></Column>
                        <Column field="sector" :header="$t('companies_page.table_column_sector')" sortable
                            :style="{ 'width': '20%' }">
                        </Column>
                        <Column field="valuation" :header="$t('companies_page.table_column_valuation')" sortable
                            :style="{ 'width': '20%' }">
                            <template #body="{ data }">
                                <div>{{ formatCurrency(data.valuation) }}</div>
                            </template>
                        </Column>
                        <Column field="active" :header="$t('companies_page.table_column_status')" sortable
                            :style="{ 'width': '10%' }">
                            <template #body="{ data }">
                                <i class="pi"
                                    :class="{ 'pi-check-circle text-green-500': data.active === 1, 'pi-times-circle text-red-400': data.active === 0 }" />
                            </template>
                        </Column>
                        <Column field="actions" :header="$t('companies_page.table_column_actions')"
                            :style="{ 'width': '10%' }">
                            <template #body="{ data }">
                                <div class="p-d-flex p-jc-end p-ai-center">
                                    <Button icon="pi pi-pencil" class="mb-2 mr-2" severity="success" rounded
                                        @click="openModal(data)"></button>
                                    <Button icon="pi pi-times" class="mb-2 mr-2" severity="danger" rounded
                                        @click="deleteItem(data)"></Button>
                                    <Button icon="pi pi-building" class="mb-2" severity="warning" rounded
                                        style="color: white;" @click="goToBranche(data)"></Button>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </div>
    </div>
    <DeleteModal v-if="isDeleteModalVisible" v-model:visible="isDeleteModalVisible" :id="idCompany" :items="'company'"
        @itemDeleted="handlerFilteringCompanies" />
    <CompanyModal v-if="isModalVisible" v-model:visible="isModalVisible" :id="idCompany"
        @companyUpdated="handlerFilteringCompanies" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import axiosInstance from '@/http/index';
import ICompany from '../interfaces/ICompany'
import CompanyModal from '@/components/modals/CompanyModal.vue';
import DeleteModal from '@/components/modals/DeleteModal.vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import router from '@/router';
import { useStore } from 'vuex';
import IUsers from '@/interfaces/IUsers';

export default defineComponent({
    name: 'HomePage',
    components: {
        CompanyModal,
        DeleteModal,
    },
    data() {
        return {
            companies: [] as ICompany[],
            filteredCompanies: [] as ICompany[],
            user: {} as IUsers,
            modalData: {} as { type: string, id: number },
            isModalVisible: false,
            isDeleteModalVisible: false,
            store: useStore(),
            isLoaded: false,
            statusActive: this.$t('companies_page.table_status_value_active'),
            statusInactive: this.$t('companies_page.table_status_value_inactive'),
            userIdentify: '',
            userNameIdentify: '',
            searchText: '',
            idCompany: ''
        }
    },
    created() {
        const store = useStore();
        const userId = store.state.userId;
        const userName = store.state.userName;
        if (!userId && !userName) {
            router.push('/');
        }
        this.userIdentify = userId;
        this.userNameIdentify = userName;
    },
    async mounted() {
        if (this.userIdentify) {
            await this.fetchUsers();
            await this.fetchCompanies();
            this.isLoaded = true;
        }
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axiosInstance.get(`/user/${this.userIdentify}`);
                this.user = response.data as IUsers;
            } catch (error) {
                console.error('Error fetching user', error);
            }
        },
        async fetchCompanies() {
            try {
                const response = await axiosInstance.get('/company');
                this.companies = response.data as ICompany[];

                this.companies = this.companies.filter(company => this.user.companies.includes(company._id));
                this.filteredCompanies = this.companies;
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        },
        async handlerFilteringCompanies() {
            await this.fetchUsers();
            this.fetchCompanies();
        },
        getStatus(active: number): string {
            return active === 1 ? this.statusActive : this.statusInactive;
        },
        openModal(company?: ICompany): void {
            this.idCompany = company ? company._id : '';
            this.isModalVisible = true;
        },
        closeModal(): void {
            this.isModalVisible = false;
        },
        onDelete(id: string) {
            this.companies = this.companies.filter(company => company._id !== id);
        },
        onConfirm(event: { type: string, id: number }) {
            this.isModalVisible = false;
            this.$emit('onConfirm', event);
        },
        deleteItem(company: ICompany) {
            this.idCompany = company._id;
            this.isDeleteModalVisible = true;
        },
        goToBranche(company: ICompany) {
            router.push(`/branch/${company._id}`);
        },
        formatCurrency(value?: string): string {
            if (!value || isNaN(parseFloat(value))) {
                return '';
            }
            const numericValue = parseFloat(value);
            return '$' + numericValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        },
        exportToPDF() {
            const pdf = new jsPDF('p', 'pt', 'a4');
            const columns = [
                { title: "Name", dataKey: "name" },
                { title: "Sector", dataKey: "sector" },
                { title: "Valuation", dataKey: "valuation" },
                { title: "Status", dataKey: "active" }
            ];
            const rows = this.filteredCompanies.map(companies => ({
                'name': companies.name,
                'sector': companies.sector,
                'valuation': this.formatCurrency(companies.valuation.toString()),
                'active': this.getStatus(companies.active)
            }));

            pdf.autoTable({
                head: [columns.map(col => col.title)],
                body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row])),
                startY: 40,
                styles: { overflow: 'linebreak' },
                columnStyles: {
                    0: { cellWidth: 150 },
                    1: { cellWidth: 100 },
                    2: { cellWidth: 150 },
                    3: { cellWidth: 100 },
                }
            });

            pdf.save('companies.pdf');
        },
        exportToExcel() {
            const data = this.filteredCompanies.map((companies: ICompany) => ({
                Name: companies.name,
                Sector: companies.sector,
                Valuation: this.formatCurrency(companies.valuation.toString()),
                Status: this.getStatus(companies.active)
            }));
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Companies');
            XLSX.writeFile(wb, 'companies.xlsx');
        },
        filterCompanies() {
            const searchTextLower = this.searchText.toLowerCase();
            this.filteredCompanies = this.companies.filter(companies =>
                companies.name?.toLowerCase().includes(searchTextLower) ||
                companies.sector?.toLowerCase().includes(searchTextLower) ||
                (companies.valuation)?.toString().includes(searchTextLower) ||
                (companies.active === 1 ? this.statusActive : this.statusInactive).toLowerCase().startsWith(searchTextLower)
            );
        },
    },
});
</script>

<style scoped>
.card-description {
    width: 50vw;
}

.custom-age-td-class {
    width: 50vw;
}

.table {
    width: 100%;
}

.p-d-flex {
    height: 100%;
    justify-content: flex-end;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px;
    width: 99%;
}

@media (max-width: 768px) {
    .table {
        overflow-x: auto;
    }

    .table .p-datatable-scrollable-body {
        overflow: auto;
    }
}
</style>
