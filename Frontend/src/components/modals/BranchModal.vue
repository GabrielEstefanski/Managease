<template>
    <Dialog v-model:visible="innerVisible" :modal="true" :header="labelTitle"
        :style="{ width: '100%', maxWidth: '50rem' }">
        <div class="flex-container">
            <div class="flex-item">
                <div class="column gap-2 mb-3">
                    <label for="company">{{ $t('branches_modal.label_company') }}</label>
                    <InputText id="company" v-model="selectedCompany" disabled />
                </div>
                <div class="column gap-2 mb-3">
                    <label for="name">{{ $t('branches_modal.label_name') }}</label>
                    <InputText id="name" v-model="branches.name"></InputText>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="country">{{ $t('branches_modal.label_country') }}</label>
                    <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" optionValue="code"
                        @change="onCountryChange">
                        <template #option="{ option }">
                            <div class="country-option">
                                <CountryFlag class="mr-1" :country="option.code" size="small"></CountryFlag>
                                <span> {{ option.name }}</span>
                            </div>
                        </template>
                    </Dropdown>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="legalNature">{{ $t('branches_modal.label_legal_nature') }}</label>
                    <Dropdown v-model="selectedLegalNature" :options="getLegalNaturesForCountry(selectedCountry)"
                        optionLabel="name" optionValue="name" @change="onLegalNatureChange" />
                </div>
                <div class="column gap-2 mb-3">
                    <label for="cnpj">{{ $t('branches_modal.label_cnpj') }}</label>
                    <InputMask id="cnpj" v-model="branches.cnpj" :mask="getMaskForCountryBranche()"></InputMask>
                </div>
            </div>
            <div class="flex-item">
                <div class="column gap-2 mb-3">
                    <label for="share_capital">{{ $t('branches_modal.label_share_capital') }}</label>
                    <InputGroup>
                        <InputNumber id="share_capital" v-model="branches.share_capital" inputId="currency-us"
                            mode="currency" currency="USD" locale="en-US"></InputNumber>
                        <InputGroupAddon>
                            <i class="pi pi-dollar"></i>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="establishment">{{ $t('branches_modal.label_date_establishment') }}</label>
                    <Calendar id="establishment" showIcon iconDisplay="input" v-model="dateEstablishment"
                        dateFormat="mm/dd/yy">
                    </Calendar>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="zip">{{ $t('branches_modal.label_zip_code') }}</label>
                    <InputMask id="zip" v-model="branches.zip" :mask="getMaskForCountryZipCode()"></InputMask>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="phone">{{ $t('branches_modal.label_phone') }}</label>
                    <InputMask id="phone" v-model="branches.phone" :mask="getMaskForCountryPhone()">
                    </InputMask>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="phone">{{ $t('branches_modal.label_status') }}</label>
                    <div class="flex flex-wrap">
                        <RadioButton v-model="branches.active" id=1 class="mr-2" name="Active" :value="1">
                        </RadioButton>
                        <label for="active" class="mr-4">{{ $t('branches_modal.radio_button_active') }}</label>
                        <RadioButton v-model="branches.active" id=0 class="mr-2" name="Inactive" :value="0">
                        </RadioButton>
                        <label for="inactive" class="ml-2">{{ $t('branches_modal.radio_button_inactive') }}</label>
                    </div>
                </div>
            </div>
        </div>
        <template v-slot:footer>
            <Button :label="$t('branches_modal.button_cancel')" severity="secondary" @click="onCancel"></Button>
            <Button icon="pi pi-check" severity="success" :label="$t('branches_modal.button_save')"
                @click="onSave"></Button>
        </template>
        <Toast />
    </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import axiosInstance from '@/http/index';
import IBranch from '@/interfaces/IBranch';
import ICompany from '@/interfaces/ICompany';
import router from '@/router';
import { useToast } from 'primevue/usetoast';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import IUsers from '@/interfaces/IUsers';

export default defineComponent({
    name: "BrancheModal",
    props: {
        id: String,
        idCompany: {
            required: true,
            type: String
        },
        visible: Boolean
    },

    setup() {
        const toasts = useToast();

        const { t } = useI18n();

        function showFailedToast() {
            toasts.add({ severity: 'error', summary: t('toast_error.summary'), detail: t('toast_error.detail_branch_exists'), life: 3000 });

        }
        return { showFailedToast };
    },
    data() {
        return {
            branches: {} as IBranch,
            user: {} as IUsers,
            branchesArray: [] as IBranch[],
            company: {} as ICompany,
            companies: [] as ICompany[],
            companyNames: [] as string[],
            dateEstablishment: new Date(),
            isDuplicate: false,
            labelTitle: this.$t('branches_modal.title_add'),
            userIdentify: 0,
            userNameIdentify: '',
            selectedPhoneMask: '',
            selectedCompany: '',
            selectedCountry: '',
            selectedLegalNature: '',
            masks: {
                'br': '+55 (99) 99999-9999',
                'us': '+1 (999) 999-9999',
                'fr': '+33 99 99 99 99 99',
                'de': '+49 99999 999999',
                'it': '+39 999 999 9999',
                'jp': '+81 999-9999-9999',
                'pt': '+351 999 999 999',
            } as Record<string, string>,
            legalNatures: {
                'br': ['Empresário Individual', 'Ltda', 'S.A', 'EIRELI', 'MEI', 'Cooperativa'],
                'us': ['LLC', 'Corp', 'Sole Proprietorship', 'Partnership', 'Cooperative', 'Nonprofit Organization'],
                'fr': ['SARL', 'SA', 'Entreprise Individuelle', 'SNC', 'SCS', 'Association'],
                'de': ['GmbH', 'AG', 'Einzelunternehmen', 'OHG', 'KG', 'eG'],
                'jp': ['Kabushiki Kaisha', 'Godo Kaisha', 'Shokushu Gyo', 'Gomei Kaisha', 'Goshi Kaisha'],
                'it': ['SRL', 'SpA', 'Impresa Individuale', 'SNC', 'SAS', 'COOP'],
                'pt': ['Lda', 'SA', 'Empresário em Nome Individual', 'Sociedade em Comandita', 'Cooperativa']
            } as Record<string, string[]>,
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
        await this.fetchUsers();
        await this.fetchCompany();
        await this.fetchAllCompanies();
        if (this.id !== '') {
            await this.fetchBranch();
            this.labelTitle = this.$t('branches_modal.title_edit');
        }
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
        async fetchCompany() {
            try {
                const response = await axiosInstance.get(`/company/${this.idCompany}`);
                this.company = response.data as ICompany;
                this.selectedCompany = this.company.name;
            } catch (error) {
                console.error('Error fetching company', error);
            }
        },
        async fetchBranch() {
            try {
                const response = await axiosInstance.get(`/branch/${this.id}`);
                this.branches = response.data as IBranch;
                this.dateEstablishment = new Date(this.branches.date_establishment);
                this.selectedLegalNature = this.branches.legal_nature;
                this.selectedCountry = this.branches.country;

                this.branches.date_establishment = this.formatDate(this.branches.date_establishment);

            } catch (error) {
                console.error('Error fetching branche', error);
            }
        },
        async postBranch() {
            this.onSelectCompany();
            try {
                this.isDuplicate = await this.checkDuplicateBranche(this.branches.name);

                if (this.isDuplicate) {
                    this.showFailedToast();
                    return;
                }

                this.branches.date_establishment = this.dateEstablishment.toISOString()
                const response = await axiosInstance.post('/branch/', this.branches);
                const brancheId = response.data.branch._id;

                this.user.branches.push(brancheId);

                await axiosInstance.put(`/user/${this.userIdentify}`, this.user);
            } catch (error) {
                console.error('Error posting branche', error);
            }
        },
        async putBranch() {
            this.onSelectCompany();
            try {
                this.isDuplicate = await this.checkDuplicateBranche(this.branches.name);

                if (this.isDuplicate) {
                    this.showFailedToast();
                    return;
                }
                this.branches.date_establishment = this.dateEstablishment.toISOString()
                await axiosInstance.put(`/branch/${this.id}`, this.branches);
            } catch (error) {
                console.error('Error posting branche', error);
            }
        },
        async onSave() {
            if (this.id !== '') {
                await this.putBranch();
            } else {
                await this.postBranch();
            }
            if (!this.isDuplicate) {
                this.innerVisible = false;
                this.$emit('brancheUpdated');
            }
        },
        async checkDuplicateBranche(brancheName: string): Promise<boolean> {
            try {
                const response = await axiosInstance.get('/branch');
                const filteredBranches = response.data.filter((branche: IBranch) => {
                    return this.user.branches.some((userBrancheId: string) => userBrancheId === branche._id &&
                        brancheName.toLowerCase() === branche.name.toLowerCase() &&
                        branche._id !== this.id);
                });
                return filteredBranches.length > 0;
            } catch (error) {
                console.error('Error checking duplicate branche', error);
                return false;
            }
        },
        onCountryChange() {
            this.branches.country = this.selectedCountry;
        },
        formatDate(dateString: string) {
            return dateString ? new Date(dateString).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '';
        },
        onLegalNatureChange() {
            this.branches.legal_nature = this.selectedLegalNature;
        },
        getLegalNaturesForCountry(country: string): { name: string; value: string }[] {
            return (this.legalNatures[country] || []).map(name => ({ name, value: name }));
        },
        getMaskForCountryBranche(): string {
            const masks: Record<string, string> = {
                'br': '99.999.999/9999-99',
                'us': '99-9999999',
                'fr': '99999999999',
                'de': '999999999999',
                'it': '99.999.999.999',
                'jp': '999-99-99999',
                'pt': '999999999',
            };
            return masks[this.selectedCountry] || '';
        },
        getMaskForCountryZipCode(): string {
            const masks: Record<string, string> = {
                'br': '99999-999',
                'us': '99999-9999',
                'fr': '99999',
                'de': '99999',
                'it': '99999',
                'jp': '999-9999',
                'pt': '9999-999',
            };
            return masks[this.selectedCountry] || '';
        },
        getMaskForCountryPhone(): string {
            const masks: Record<string, string> = {
                'br': '+55 (99) 99999-9999',
                'us': '+1 (999) 999-9999',
                'fr': '+33 99 99 99 99 99',
                'de': '+49 99999 999999',
                'it': '+39 999 999 9999',
                'jp': '+81 999-9999-9999',
                'pt': '+351 999 999 999',
            };
            return masks[this.selectedCountry] || '';
        },
        onSelectCompany() {
            const selectedCompanyId = this.companies.find(company => company.name === this.selectedCompany)?._id || '';
            this.branches.company_id = selectedCompanyId;
        },
        searchCompanies(event: any) {
            const query = event.query.toLowerCase();
            this.companyNames = this.companies
                .filter(company => company.name.toLowerCase().includes(query))
                .map(company => company.name);
        },
        onCancel() {
            this.innerVisible = false;
        },
    }
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