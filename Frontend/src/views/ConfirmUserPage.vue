<template>
    <div class="container">
        <Card style="width: 25rem; overflow: hidden">
            <template #title>Sign up</template>
            <template #content>
                <div class="column gap-2 mb-3">
                    <label for="username">Name</label>
                    <InputText v-model="user.name"></InputText>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="username">Username</label>
                    <InputText v-model="user.username"></InputText>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="">Password</label>
                    <Password v-model="user.password" :feedback="false" :inputStyle="{ 'width': '100%' }" toggleMask>
                    </Password>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="">Confirm your password</label>
                    <Password v-model="confirmPassword" :feedback="false" :inputStyle="{ 'width': '100%' }" toggleMask>
                    </Password>
                </div>
                <span v-if="error" class="text-red-500" style="font-size:14px;">{{ error }}</span>
            </template>
            <template #footer>
                <div class="flex gap-3 mt-1">
                    <Button label="Login" class="w-full" @click="createUser" />
                </div>
            </template>
        </Card>
        <Toast />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import IUsers from '../interfaces/IUsers';
import axiosInstance from '../http';
import { useToast } from 'primevue/usetoast';
import { useStore } from 'vuex';
import router from '../router';

export default defineComponent({
    name: 'ConfirmUserPage',
    setup() {
        const toasts = useToast();

        function showSucessToast() {
            toasts.add({ severity: 'success', summary: 'Success', detail: 'User registered successfully' });
        }

        return { showSucessToast };
    },
    data() {
        return {
            user: {} as IUsers,
            users: [] as IUsers[],
            confirmPassword: '',
            error: ''
        }
    },
    created() {
        const store = useStore();
        const userId = store.state.userId;
        const userName = store.state.userName;
        if (userId && userName) {
            router.push('/home');
        }

    },
    async mounted() {
        await this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axiosInstance.get('/user');
                this.users = response.data as IUsers[];
            } catch (error) {
                console.error('Error fetching users', error);
            }
        },
        async postUser() {
            try {
                await axiosInstance.post('/user', this.user);
                this.showSucessToast();
            } catch (error) {
                console.error('Error creating user', error);
            }
        },
        async createUser() {
            if (this.user.password !== this.confirmPassword) {
                this.error = 'Passwords do not match';
                return
            }
            await this.postUser()
            router.push({ path: '/', query: { successToast: 'true' } });
        }
    }
});
</script>

<style scoped>
.container {
    justify-content: center;
    align-items: center;
    margin: 0;
    width: 100%;
    height: 100%;
}
</style>