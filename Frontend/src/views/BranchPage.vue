<template>
    <div class="container">
        <div class="table">
            <template v-if="!isLoaded">
                <h1 class="title">{{ $t('branches_page.title') }}</h1>
                <div class="spinner-container">
                    <i class="pi pi-spin pi-spinner large-spinner" />
                </div>
            </template>
            <template v-else>
                <h1 class="title">{{ company.name }}</h1>
                <Toolbar>
                    <template #start>
                        <Button icon="pi pi-file-excel" class="mr-2" severity="secondary"
                            @click="exportToExcel"></Button>
                        <Button icon="pi pi-print" severity="secondary" @click="exportToPDF"></Button>
                    </template>
                    <template #center>
                        <InputGroup>
                            <InputText icon="pi pi-search" v-model="searchText"
                                :placeholder="$t('branches_page.search_bar')" style="width: 30vw;"
                                @input="filterBranches" rounded></InputText>
                            <InputGroupAddon>
                                <i class="pi pi-search"></i>
                            </InputGroupAddon>
                        </InputGroup>
                    </template>
                    <template #end>
                        <Button :label="$t('branches_page.button_add_branche')" @click="openItem()"></Button>
                    </template>
                </Toolbar>
                <div class="dataTable" ref="tableRef">
                    <DataTable :value="filteredBranches" :paginator="true" :rows="10" tableStyle="width: 100%"
                        :loading="!isLoaded">
                        <template #empty>{{ $t('branches_page.empty_table') }} </template>
                        <template #loading>{{ company.name }} está carregando, por favor espere</template>
                        <Column field="name" :header="$t('branches_page.table_column_name')" sortable
                            style="width: 15%">
                        </Column>
                        <Column field="cnpj" :header="$t('branches_page.table_column_cnpj')" sortable
                            style="width: 15%">
                        </Column>
                        <Column field="legal_nature" :header="$t('branches_page.table_column_legal_nature')" sortable
                            style="width: 15%"></Column>
                        <Column field="country" :header="$t('branches_page.table_column_country')" sortable
                            style="width: 15%">
                            <template #body="{ data }">
                                <CountryFlag class="mr-1" :country="getCountryCode(data.country)">
                                </CountryFlag>
                                <span> {{ getCountryName(data.country) }}</span>
                            </template>
                        </Column>
                        <Column field="share_capital" :header="$t('branches_page.table_column_share_capital')" sortable
                            style="width: 10%">
                            <template #body="{ data }">
                                <div>{{ formatCurrency(data.share_capital) }}</div>
                            </template>
                        </Column>
                        <Column field="active" :header="$t('branches_page.table_column_status')" sortable
                            style="width: 10%">
                            <template #body="{ data }">
                                <i class="pi"
                                    :class="{ 'pi-check-circle text-green-500': data.active === 1, 'pi-times-circle text-red-400': data.active === 0 }" />
                            </template>
                        </Column>
                        <Column field="actions" :header="$t('branches_page.table_column_action')" style="width: 10%">
                            <template #body="{ data }">
                                <div class="p-d-flex p-jc-end p-ai-center">
                                    <Button icon="pi pi-pencil" class="mb-2 mr-2" severity="success" rounded
                                        @click="openItem(data)" />
                                    <Button icon="pi pi-times" class="mb-2 mr-2" severity="danger" rounded
                                        @click="deleteItem(data)" />
                                    <Button icon="pi pi-dollar" class="mb-2" severity="help" rounded
                                        @click="goToFinancial(data)"></Button>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </div>
    </div>
    <DeleteModal v-if="isDeleteModalVisible" v-model:visible="isDeleteModalVisible" :id="idBranch" :items="'branch'"
        @itemDeleted="handlerFilteringBranch" />
    <BranchModal v-if="isModalVisible" v-model:visible="isModalVisible" :id="idBranch" :idCompany="idCompany"
        @brancheUpdated="handlerFilteringBranch" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import IBranch from '../interfaces/IBranch';
import ICompany from '../interfaces/ICompany';
import IUsers from '../interfaces/IUsers';
import axiosInstance from '../http';
import BranchModal from '../components/modals/BranchModal.vue';
import DeleteModal from '../components/modals/DeleteModal.vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import router from '../router';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'BranchePage',
    props: {
        idCompany: {
            type: String,
            required: true
        }
    },
    components: {
        BranchModal,
        DeleteModal,
    },
    data() {
        return {
            filteredBranches: [] as IBranch[],
            branches: [] as IBranch[],
            company: {} as ICompany,
            user: {} as IUsers,
            modalData: {} as { type: string, id: number },
            isModalVisible: false,
            isDeleteModalVisible: false,
            isLoaded: false,
            statusActive: this.$t('branches_page.table_status_value_active'),
            statusInactive: this.$t('branches_page.table_status_value_inactive'),
            userIdentify: '',
            userNameIdentify: '',
            idBranch: '',
            searchText: '',
            countries: [
                { name: this.$t('countries.brazil'), code: 'br' },
                { name: this.$t('countries.united_states'), code: 'us' },
                { name: this.$t('countries.france'), code: 'fr' },
                { name: this.$t('countries.germany'), code: 'de' },
                { name: this.$t('countries.japan'), code: 'jp' },
                { name: this.$t('countries.italy'), code: 'it' },
                { name: this.$t('countries.portugal'), code: 'pt' },
            ]
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
            await this.fetchBranches();
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
                const response = await axiosInstance.get(`/company/${this.idCompany}`);
                this.company = response.data as ICompany;
                return this.company;
            } catch (error) {
                console.error('Error fetching companies', error);
            }
        },
        async fetchBranches() {
            try {
                const response = await axiosInstance.get('/branch');
                this.branches = response.data as IBranch[];
                this.branches = this.branches.filter(branch => this.company._id === branch.company_id);
                this.branches = this.branches.filter(branch => this.user.branches.includes(branch._id));
                this.branches = this.branches.map(branch => ({
                    ...branch,
                    date_establishment: this.formatDate(branch.date_establishment)
                }));
                this.filteredBranches = this.branches;
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        },
        async handlerFilteringBranch() {
            await this.fetchUsers();
            this.fetchBranches();
        },
        onSave(updatedBranch: IBranch) {
            this.filteredBranches = this.filteredBranches.map(branch =>
                branch._id === updatedBranch._id ? updatedBranch : branch
            );
        },
        getCountryName(countryCode: string): string {
            const country = this.countries.find(c => c.code === countryCode);
            return country ? country.name : '';
        },
        getStatus(active: number): string {
            return active === 1 ? this.statusActive : this.statusInactive;
        },
        formatDate(dateString: string) {
            return dateString ? new Date(dateString).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '';
        },
        onConfirm(event: { type: string, id: number }) {
            this.isModalVisible = false;
            this.$emit('onConfirm', event);
        },
        deleteItem(branch: IBranch) {
            this.idBranch = branch._id;
            this.isDeleteModalVisible = true;
        },
        goToFinancial(branch: IBranch) {
            router.push(`/financial/${branch._id}`);
        },
        openItem(branch?: IBranch) {
            this.idBranch = branch ? branch._id : '';
            this.isModalVisible = true;
        },
        getCountryCode(countryName: string): string {
            const country = this.countries.find(c => c.code === countryName);
            return country ? country.code : '';
        },
        exportToPDF() {
            const pdf = new jsPDF('p', 'pt', 'a4');
            const columns = [
                { title: "Name", dataKey: "name" },
                { title: "CNPJ", dataKey: "cnpj" },
                { title: "Legal Nature", dataKey: "legal_nature" },
                { title: "Country", dataKey: "country" },
                { title: "Share Capital", dataKey: "share_capital" },
                { title: "Company", dataKey: "company_id" },
                { title: "Status", dataKey: "active" }
            ];
            const rows = this.filteredBranches.map(branch => ({
                "name": branch.name,
                "cnpj": branch.cnpj,
                "legal_nature": branch.legal_nature,
                "country": this.getCountryName(branch.country),
                "share_capital": this.formatCurrency(branch.share_capital.toString()),
                "company_id": this.company.name,
                "active": this.getStatus(branch.active)
            }));

            pdf.autoTable({
                head: [columns.map(col => col.title)],
                body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row])),
                startY: 40,
                styles: { overflow: 'linebreak' },
                columnStyles: {
                    0: { cellWidth: 80 }, // Name
                    1: { cellWidth: 80 }, // Branche
                    2: { cellWidth: 80 }, // Legal Nature
                    3: { cellWidth: 100 }, // Country
                    4: { cellWidth: 80 }, // Share Capital
                    5: { cellWidth: 80 }, // Company
                    6: { cellWidth: 70 }  // Status
                },
                margin: { top: 60, left: 15 }
            });

            pdf.save('branch.pdf');
        },
        formatCurrency(value?: string): string {
            if (!value || isNaN(parseFloat(value))) {
                return '';
            }
            const numericValue = parseFloat(value);
            return '$' + numericValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        },
        exportToExcel() {
            const data = this.filteredBranches.map((branch: IBranch) => ({
                Name: branch.name,
                Branch: branch.cnpj,
                "Legal Nature": branch.legal_nature,
                Country: this.getCountryName(branch.country),
                "Share Capital": this.formatCurrency(branch.share_capital.toString()),
                Company: this.company.name,
                Status: this.getStatus(branch.active)
            }));
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Branche');
            XLSX.writeFile(wb, 'branches.xlsx');
        },
        filterBranches() {
            const searchTextLower = this.searchText.toLowerCase();
            this.filteredBranches = this.branches.filter(branch => {
                const name = branch.name?.toLowerCase() || '';
                const cnpj = branch.cnpj?.toLowerCase() || '';
                const legal_nature = branch.legal_nature?.toLocaleLowerCase() || '';
                const country = this.getCountryName(branch.country)?.toLowerCase() || '';
                const share_capital = (branch.share_capital)?.toString() || '';
                const active = (branch.active === 1 ? this.statusActive : this.statusInactive).toLowerCase();

                return name.includes(searchTextLower) ||
                    cnpj.includes(searchTextLower) ||
                    legal_nature.includes(searchTextLower) ||
                    country.includes(searchTextLower) ||
                    share_capital.includes(searchTextLower) ||
                    active.startsWith(searchTextLower)
            });
        },
    },
});
</script>

<style scoped>
.card-description {
    width: 50vw;
}

.custom-age-td-class {
    width: 70vw;
}

.table {
    width: 100%;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px;
    width: 99%;
}
</style>