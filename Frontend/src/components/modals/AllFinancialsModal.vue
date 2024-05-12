<template>
    <Dialog v-model:visible="innerVisible" :modal="true" :header="labelTitle"
        :style="{ width: '90%', maxWidth: '50rem' }">
        <div class="flex-container">
            <div class="flex-item">
                <template v-if="id === ''">
                    <div class="column gap-2 mb-3">
                        <label for="company">{{ $t('financials_modal.label_company') }}</label>
                        <Dropdown v-model="selectedCompany" @change="onSelectCompany" :options="companies"
                            optionLabel="name" optionValue="_id"></Dropdown>
                    </div>
                    <div class="column gap-2 mb-3">
                        <label for="branche">{{ $t('financials_modal.label_branch') }}</label>
                        <AutoComplete id="branche" v-model="selectedBranche" dropdown :suggestions="branchNames"
                            @complete="searchBranches">
                        </AutoComplete>
                    </div>
                </template>
                <template v-else>
                    <div class="column gap-2 mb-3">
                        <label for="company">{{ $t('financials_modal.label_company') }}</label>
                        <InputText v-model="selectedCompany" disabled></InputText>
                    </div>
                    <div class="column gap-2 mb-3">
                        <label for="branche">{{ $t('financials_modal.label_branch') }}</label>
                        <InputText id="branche" v-model="selectedBranche" disabled>
                        </InputText>
                    </div>
                </template>
                <div class="column gap-2 mb-3">
                    <label for="type">{{ $t('financials_modal.label_type') }}</label>
                    <Dropdown id="type" v-model="selectedType" :options="typeFinancial" @change="onTypeChange"
                        optionLabel="name">
                        <template #option="{ option }">
                            {{ option.name }}
                        </template>
                    </Dropdown>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="category">{{ $t('financials_modal.label_category') }}</label>
                    <Dropdown id="category" v-model="selectedCategory" :options="getCategoryForType(selectedType.name)"
                        @change="getIdCategory" optionLabel="name">
                        <template #option="{ option }">
                            {{ option.name }}
                        </template>
                    </Dropdown>
                </div>
            </div>
            <div class="flex-item">
                <div class="column gap-2 mb-3">
                    <label for="date">{{ $t('financials_modal.label_date') }}</label>
                    <Calendar id="date" v-model="dateFinancial" showIcon iconDisplay="input" dateFormat="mm/dd/yy">
                    </Calendar>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="amount">{{ $t('financials_modal.label_amount') }}</label>
                    <InputGroup>
                        <InputNumber id="amount" v-model="financial.amount" inputId="currency-us" mode="currency"
                            currency="USD" locale="en-US"></InputNumber>
                        <InputGroupAddon>
                            <i class="pi pi-dollar"></i>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="description">{{ $t('financials_modal.label_description') }}</label>
                    <Textarea id="description" v-model="financial.description" autoResize rows="6" cols="30"></Textarea>
                </div>
            </div>
        </div>
        <template v-slot:footer>
            <Button :label="$t('financials_modal.button_cancel')" severity="secondary" @click="onCancel"></Button>
            <Button icon="pi pi-check" severity="success" :label="$t('financials_modal.button_save')"
                @click="onSave"></Button>
        </template>
    </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import axiosInstance from '@/http/index';
import IFinancial from '@/interfaces/IFinancial';
import IBranch from '@/interfaces/IBranch';
import ICompany from '@/interfaces/ICompany';
import router from '@/router';
import { useStore } from 'vuex';
import IUsers from '@/interfaces/IUsers';

export default defineComponent({
    name: 'FinancialModal',
    props: {
        id: String,
        idBranche: String,
        visible: Boolean
    },
    data() {
        return {
            financial: {} as IFinancial,
            branche: {} as IBranch,
            user: {} as IUsers,
            branches: [] as IBranch[],
            companies: [] as ICompany[],
            branchNames: [] as string[],
            dateFinancial: new Date(),
            labelTitle: this.$t('branches_modal.title_add'),
            selectedType: { id: 0, name: '' },
            selectedCategory: { id: 0, name: '' },
            selectedBranche: '',
            selectedCompany: '',
            userIdentify: 0,
            userNameIdentify: '',
            typeFinancial: [
                { id: 1, name: this.$t('array_type_fiancial.revenue') },
                { id: 2, name: this.$t('array_type_fiancial.expense') }
            ],
            categoryFinancial: {
                [this.$t('array_type_fiancial.revenue')]: {
                    [this.$t('array_category_financial.product_sales')]: 1,
                    [this.$t('array_category_financial.services_rendered')]: 2,
                    [this.$t('array_category_financial.commissions')]: 3,
                    [this.$t('array_category_financial.property_rent')]: 4,
                    [this.$t('array_category_financial.investments')]: 5,
                    [this.$t('array_category_financial.others_revenues')]: 6
                },
                [this.$t('array_type_fiancial.expense')]: {
                    [this.$t('array_category_financial.salaries_benefits')]: 7,
                    [this.$t('array_category_financial.rent')]: 8,
                    [this.$t('array_category_financial.raw_materials')]: 9,
                    [this.$t('array_category_financial.maintenance')]: 10,
                    [this.$t('array_category_financial.taxes_fees')]: 11,
                    [this.$t('array_category_financial.others_expense')]: 12
                }
            } as Record<string, Record<string, number>>,
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
    computed: {
        innerVisible: {
            get(): boolean {
                return this.visible;
            },
            set(value: boolean) {
                if (!value) {
                    this.$emit('update:visible', value)
                }
            }
        },
    },
    async mounted() {
        await this.fetchUsers();
        await this.fetchAllCompanies();
        await this.fetchAllBranches();
        if (this.id !== '') {
            await this.fetchFinancial();
            this.labelTitle = this.$t('branches_modal.title_edit');
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
        async fetchAllCompanies() {
            try {
                const response = await axiosInstance.get('/company');
                this.companies = response.data as ICompany[];
                this.companies = this.companies.filter(company => this.user.companies.includes(company._id));
            } catch (error) {
                console.error('Error fetching companies', error);
            }
        },
        async fetchAllBranches() {
            try {
                const response = await axiosInstance.get('/branch');
                this.branches = response.data as IBranch[];
                this.branches = this.branches.filter(branch => this.user.branches.includes(branch._id));
            } catch (error) {
                console.error('Error fetching branches ', error);
            }
        },
        async fetchFinancial() {
            try {
                this.onSelectBranche();
                const response = await axiosInstance.get(`/financial/${this.id}`);
                this.financial = response.data as IFinancial;
                this.selectedType.id = this.financial.type;
                this.getTypeById(this.selectedType.id);
                this.getCategoryById(this.financial.category);

                this.dateFinancial = new Date(this.financial.date);
                const branchName = this.branches.find(branch => branch._id === this.financial.branch_id);
                this.selectedBranche = branchName ? branchName.name : '';
                const companyName = this.companies.find(company => company._id === branchName?.company_id);
                this.selectedCompany = companyName ? companyName.name : '';
                this.financial.date = this.formatDate(this.financial.date);
            } catch (error) {
                console.error('Error fetching financials', error);
            }
        },
        async postFinancial() {
            try {
                this.onSelectBranche();

                this.financial.date = this.dateFinancial.toISOString();
                const response = await axiosInstance.post('/financial', this.financial);
                const financialId = response.data.financial._id;
                this.user.financials.push(financialId);
                await axiosInstance.put(`/user/${this.userIdentify}`, this.user);
            } catch (error) {
                console.error('Error posting financial', error);
            }
        },
        async putFinancial() {
            try {
                this.financial.date = this.dateFinancial.toISOString();
                await axiosInstance.put(`/financial/${this.id}`, this.financial);
            } catch (error) {
                console.error('Error posting company', error);
            }
        },
        async onSave() {
            if (this.id !== '') {
                await this.putFinancial();
            } else {
                await this.postFinancial();
            }
            this.innerVisible = false;
            this.$emit('financialUpdated');
        },
        async onSelectCompany() {
            await this.fetchAllBranches();
            this.branches = this.branches.filter(branche => branche.company_id === this.selectedCompany);
            this.selectedBranche = '';
        },
        getTypeById(typeId: number) {
            const type = this.typeFinancial.find(type => type.id === typeId);
            if (type) {
                this.selectedType = type
            }
        },
        getCategoryById(id: number) {
            const categories = Object.values(this.categoryFinancial).reduce((acc, val) => ({ ...acc, ...val }), {});
            const category = Object.entries(categories).find(([name, categoryId]) => categoryId === id);
            if (category) {
                const [name, id] = category;
                this.selectedCategory = { id, name }
            } else {
                this.selectedCategory = { id: 0, name: '' }
            }
        },
        getIdCategory() {
            this.financial.category = this.selectedCategory.id || 0;
        },
        onTypeChange() {
            this.financial.type = this.selectedType.id;
        },
        searchBranches(event: any) {
            const query = event.query.toLowerCase();

            this.branchNames = this.branches
                .filter(branches => branches.name && branches.name.toLowerCase().includes(query))
                .map(branches => branches.name);

        },
        onSelectBranche() {
            const selectedBrancheId = this.branches.find(branche => branche.name === this.selectedBranche)?._id || '';
            this.financial.branch_id = selectedBrancheId;
        },
        getCategoryForType(type: string): { id: number, name: string }[] {
            const categoryIds = this.categoryFinancial[type];
            if (categoryIds) {
                return Object.entries(categoryIds).map(([name, id]) => ({ id, name }));
            }
            return [];
        },
        formatDate(dateString: string) {
            return dateString ? new Date(dateString).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '';
        },
        onCancel() {
            this.innerVisible = false;
        },
    },
});
</script>

<style scoped>
.flex-container {
    display: flex;
    justify-content: space-between;
}

.flex-item {
    flex: 0 0 48%;

}

@media (max-width: 768px) {
    .flex-container {
        flex-direction: column;
    }

    .flex-item {
        flex: 0 0 100%;
    }

    .flex-item {
        flex: 0 0 45%;
    }
}
</style>