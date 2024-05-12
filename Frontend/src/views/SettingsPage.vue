<template>
    <div class="container">
        <h1>{{ $t('settings_page.title') }}</h1>
        <Accordion style="width: 100%">
            <AccordionTab :header="$t('settings_page.accordion_title_change_your_name')">
                <div class="flex gap-3 mt-4">
                    <FloatLabel>
                        <InputText id="name" v-model="user.name" style="width: 13rem;"></InputText>
                        <label for="name">{{ $t('settings_page.label_name') }}</label>
                    </FloatLabel>
                </div>
                <ConfirmDialog></ConfirmDialog>
                <Button class="mt-4" style="width: 13rem; justify-content: center" @click="confirmSetUser(user.name)">{{
            $t('settings_page.button_change_your_name') }}</Button>
            </AccordionTab>
            <AccordionTab :header="$t('settings_page.accordion_title_change_your_password')">
                <div class="flex gap-3 mt-4">
                    <FloatLabel>
                        <Password toggle-mask :feedback="false" v-model="currentPassword"
                            :invalid="!!errorCurrentPassword" />
                        <label for="password">{{ $t('settings_page.input_text_current_password') }}</label>
                    </FloatLabel>
                </div>
                <div class="flex gap-3 mt-4">
                    <FloatLabel>
                        <Password toggle-mask :feedback="false" v-model="user.password"></Password>
                        <label for="new-password">{{ $t('settings_page.input_text_new_password') }}</label>
                    </FloatLabel>
                </div>

                <div class="flex gap-3 mt-4">
                    <FloatLabel>
                        <Password toggle-mask :feedback="false" v-model="confirmPassword"
                            :invalid="!!errorConfirmPassword"></Password>
                        <label for="confirm-password">{{ $t('settings_page.input_text_confirm_password') }}</label>
                    </FloatLabel>
                </div>

                <template v-if="errorCurrentPassword || errorConfirmPassword">
                    <div class="flex gap-3 mt-4">
                        <InlineMessage severity="error" style="width: 14rem">{{ errorCurrentPassword }}{{
            errorConfirmPassword }}
                        </InlineMessage>
                    </div>
                </template>
                <Button class="mt-4" style="width: 14rem; justify-content:center" @click="handlerChangePassword">{{
            $t('settings_page.button_change_your_password') }}</Button>
            </AccordionTab>
            <AccordionTab :header="$t('settings_page.accordion_title_delete_your_account')">
                <Button severity="danger" style="width: 14rem; justify-content:center" @click="openDeleteUserModal"
                    outlined>{{
            $t('settings_page.button_confirm_delete') }}</Button>
            </AccordionTab>
        </Accordion>
    </div>
    <DeleteUserModal v-if="isModalVisible" v-model:visible="isModalVisible" />
    <Toast />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import FloatLabel from 'primevue/floatlabel';
import router from '@/router';
import IUsers from '@/interfaces/IUsers';
import axiosInstance from '@/http';
import DeleteUserModal from '../components/modals/DeleteUserModal.vue';

import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    name: 'SettingsPage',
    components: {
        DeleteUserModal,
        FloatLabel,
    },
    data() {
        return {
            user: {} as IUsers,
            isModalVisible: false,
            errorCurrentPassword: '',
            errorConfirmPassword: '',
            userId: '',
            currentPassword: '',
            confirmPassword: '',
            messageUpdateUser: '',
        }
    },
    setup() {
        const store = useStore();
        const toast = useToast();
        const confirm = useConfirm();

        const userId = store.state.userId;

        const { t } = useI18n();

        const updateUser = async (name: string) => {
            try {
                await axiosInstance.put(`/user/${userId}`, { name: name });
                toast.add({ severity: 'success', summary: t('toast_success.summary_user_updated'), detail: t('toast_success.detail_user_updated'), life: 3000 });
                store.commit('setUser', { id: userId, name: name });
            } catch (error) {
                console.error('Error updating user', error);
                toast.add({ severity: 'error', summary: t('toast_error.summary'), detail: t('toast_error.detail_user_update'), life: 3000 });
            }
        }

        const toastUpdatedPassword = () => {
            toast.add({ severity: 'success', summary: t('toast_success.summary_password_updated'), detail: t('toast_success.detail_user_updated'), life: 3000 });
        }

        const confirmSetUser: (name: string) => void = (name) => {
            confirm.require({
                message: t('confirmation_modal.message'),
                header: t('confirmation_modal.header'),
                icon: 'pi pi-exclamation-circle',
                rejectClass: 'p-button-secondary p-button-outlined',
                rejectLabel: t('confirmation_modal.rejectLabel'),
                acceptClass: 'p-button-success',
                acceptLabel: t('confirmation_modal.acceptLabel'),
                accept: () => {
                    updateUser(name);
                },
            });
        };
        function logout() {
            store.commit('setUser', { id: null, name: null });
            router.push('/');
        }

        return { logout, confirmSetUser, toastUpdatedPassword };
    },

    created() {
        const store = useStore();
        const userId = store.state.userId;
        const userName = store.state.userName;
        if (!userId && !userName) {
            router.push('/');
        }
        this.userId = userId;
        this.user.name = userName;
    },
    methods: {
        async loginUser() {
            try {
                await axiosInstance.post('/login', { _id: this.userId, password: this.currentPassword });
                await this.confirmUserName();
            } catch (error) {
                this.errorCurrentPassword = this.$t('settings_page.error_current_password');
                console.error('Error in confirm password', error);
            }
        },
        async updateUser() {
            try {
                await axiosInstance.put(`/user/${this.userId}`, this.user);
            } catch (error) {
                console.error('Error updating user', error);
            }
        },
        async handlerChangePassword() {
            this.errorCurrentPassword = '';
            this.errorConfirmPassword = '';
            await this.loginUser();

        },
        async confirmUserName() {
            if (this.user.password !== this.confirmPassword) {
                this.errorConfirmPassword = this.$t('settings_page.error_match_password');
                return
            }
            await this.updateUser();
            this.toastUpdatedPassword();
            this.errorCurrentPassword = '';
            this.errorConfirmPassword = '';
        },
        openDeleteUserModal() {
            this.isModalVisible = true;
        }
    }
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    margin: 1vw;
    width: auto;
}
</style>
