<template>
    <Dialog v-model:visible="innerVisible" :modal="true" :header="labelTitle"
        :style="{ width: '90%', maxWidth: '25rem' }">
        <div class="column gap-2 mb-3">
            <label for="name">{{ $t('company_modal.label_company') }}</label>
            <InputText id="name" v-model="company.name"></InputText>
        </div>
        <div class="column gap-2 mb-3">
            <label for="sector">{{ $t('company_modal.label_sector') }}</label>
            <InputText id="sector" v-model="company.sector"></InputText>
        </div>
        <div class="column gap-2 mb-3">
            <label for="valuation">{{ $t('company_modal.label_valuation') }}</label>
            <InputGroup>
                <InputNumber id="valuation" v-model="company.valuation" inputId="currency-us" mode="currency"
                    currency="USD" locale="en-US"></InputNumber>
                <InputGroupAddon>
                    <i class="pi pi-dollar"></i>
                </InputGroupAddon>
            </InputGroup>
        </div>
        <div class="flex flex-wrap mb-3">
            <RadioButton v-model="company.active" id="active" class="mr-2" name="active" :value="1"></RadioButton>
            <label for="active" class="mr-4">{{ $t('company_modal.radio_button_active') }}</label>
            <RadioButton v-model="company.active" id="inactive" class="mr-2" name="Inactive" :value="0">
            </RadioButton>
            <label for="inactive" class="ml-2">{{ $t('company_modal.radio_button_inactive') }}</label>
        </div>
        <template v-slot:footer>
            <Button label="Cancel" severity="secondary" @click="onCancel"></Button>
            <Button icon="pi pi-check" severity="success" label="Save" @click="onSave"></Button>
        </template>
        <Toast />
    </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import axiosInstance from '@/http/index';
import ICompany from '@/interfaces/ICompany';
import router from '@/router';
import { useToast } from 'primevue/usetoast';
import { useStore } from 'vuex';
import IUsers from '@/interfaces/IUsers';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    name: 'ModalCard',
    props: {
        id: String,
        visible: Boolean
    },
    setup() {
        const toasts = useToast();

        const { t } = useI18n();

        function showFailedToast() {
            toasts.add({ severity: 'error', summary: t('toast_error.summary'), detail: t('toast_error.detail_company_exists') });

        }
        return { showFailedToast };
    },
    data() {
        return {
            company: {} as ICompany,
            user: {} as IUsers,
            isDuplicate: false,
            userIdentify: 0,
            labelTitle: this.$t('company_modal.title_add'),
            userNameIdentify: ''
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
        if (this.id !== '') {
            await this.fetchCompany();
            this.labelTitle = this.$t('company_modal.title_edit');
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
        async fetchCompany() {
            try {
                const response = await axiosInstance.get(`/company/${this.id}`);
                this.company = response.data as ICompany;
            } catch (error) {
                console.error('Error fetching company', error);
            }
        },
        async postCompany() {
            try {
                this.isDuplicate = await this.checkDuplicateCompany(this.company.name);

                if (this.isDuplicate) {
                    this.showFailedToast();
                    return;
                }

                const response = await axiosInstance.post('/company', this.company);
                const companyId = response.data.company._id;

                this.user.companies.push(companyId);

                await axiosInstance.put(`/user/${this.userIdentify}`, this.user);
            } catch (error) {
                console.error('Error posting company', error);
            }
        },
        async putCompany() {
            try {
                this.isDuplicate = await this.checkDuplicateCompany(this.company.name);

                if (this.isDuplicate) {
                    this.showFailedToast();
                    return;
                }

                await axiosInstance.put(`/company/${this.id}`, this.company);
            } catch (error) {
                console.error('Error posting company', error);
            }
        },
        async onSave() {
            if (this.id !== '') {
                await this.putCompany();
            } else {
                await this.postCompany();
            }
            if (!this.isDuplicate) {
                this.innerVisible = false;
                this.$emit('companyUpdated');
            }
        },
        async checkDuplicateCompany(companyName: string): Promise<boolean> {
            try {
                const response = await axiosInstance.get('/company');
                const filteredCompanies = response.data.filter((company: ICompany) => {
                    return this.user.companies.some((userCompanyId: string) => userCompanyId === company._id &&
                        companyName.toLowerCase() === company.name.toLowerCase() &&
                        company._id !== this.id);
                });
                return filteredCompanies.length > 0;
            } catch (error) {
                console.error('Error checking duplicate company', error);
                return false;
            }
        },
        onCancel() {
            this.innerVisible = false;
        },
    },
});
</script>

<style></style>
