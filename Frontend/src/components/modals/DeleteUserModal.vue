<template>
    <Dialog v-model:visible="innerVisible" :modal="true" :header="title" :style="{ width: '90%', maxWidth: '25rem' }">
        <template v-if="!logged">
            <div class="column gap-2 mb-3">
                <label for="username">{{ $t('user_delete_modal.login_username') }}</label>
                <InputText id="username" v-model="username"></InputText>
            </div>
            <div class="column gap-2 mb-3">
                <label for="password">{{ $t('user_delete_modal.login_password') }}</label>
                <Password id="password" v-model="password" :feedback="false" :inputStyle="{ 'width': '100%' }"
                    toggleMask></Password>
            </div>
            <InlineMessage v-if="error" severity="error">{{ error }}</InlineMessage>
        </template>
        <template v-else>
            {{ $t('user_delete_modal.message') }}
        </template>
        <template v-slot:footer>
            <Button :label="$t('user_delete_modal.button_cancel')" severity="secondary"
                class="p-button-text p-button-outlined" @click="onCancel"></Button>
            <template v-if="!logged">
                <Button severity="primary" :label="$t('user_delete_modal.button_confirm')" @click="findUser"></Button>

            </template>
            <template v-else>
                <Button severity="danger" :label="$t('user_delete_modal.button_delete')" @click="deleteUser"></Button>
            </template>
        </template>
    </Dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import IUsers from '@/interfaces/IUsers';
import axiosInstance from '@/http/index';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    name: 'DeleteModal',
    props: {
        visible: Boolean,
    },
    data() {
        return {

        }
    },
    setup() {
        const users = ref<IUsers[]>([]);
        const username = ref('');
        const password = ref('');
        const error = ref('');
        const logged = ref(false);

        const { t } = useI18n();
        const title = ref('Login');
        const store = useStore();
        const router = useRouter();

        const userId = store.state.userId;

        const findUser = async () => {
            try {
                await fetchUsers();
                const userFounded = users.value.find(user => user.username === username.value) ?? null;
                await axiosInstance.post('/login', { _id: userFounded?._id, password: password.value });
                logged.value = true;
                title.value = t('user_delete_modal.header')
            } catch (errors) {
                error.value = 'Invalid username or password';
                console.error('Error logging in', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/user');
                users.value = response.data as IUsers[];
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        async function deleteUser() {
            try {
                await axiosInstance.delete(`/user/${userId}`);
                store.commit('setUser', { id: null, name: null });
                router.push('/');
            } catch (error) {
                console.error('Error updating user', error);
            }
        }

        return {
            password,
            username,
            userId,
            title,
            error,
            deleteUser,
            logged,
            findUser
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
        onCancel() {
            this.innerVisible = false;
        },
        async onSave() {
            await this.deleteUser();
            this.innerVisible = false;
        }
    },
});
</script>

<style scoped>
.p-button-outlined {
    border-color: rgba(190, 190, 190, 0.534);
}
</style>