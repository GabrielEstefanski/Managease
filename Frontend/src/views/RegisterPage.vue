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
                    <InputText v-model="user.username" :invalid="!!errorUsername"></InputText>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="">Password</label>
                    <Password v-model="user.password" :feedback="false" :inputStyle="{ 'width': '100%' }" toggleMask
                        :invalid="!!errorPassword">
                    </Password>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="">Confirm your password</label>
                    <Password v-model="confirmPassword" :feedback="false" :inputStyle="{ 'width': '100%' }" toggleMask
                        :invalid="!!errorPassword">
                    </Password>
                </div>
                <InlineMessage v-if="errorPassword || errorUsername" severity="error" class="text-left"
                    style="width: 100%;">{{ errorPassword }}{{ errorUsername }}
                </InlineMessage>
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
import axiosInstance from '@/http';
import { useToast } from 'primevue/usetoast';
import { useStore } from 'vuex';
import router from '@/router';

export default defineComponent({
    name: 'RegisterPage',
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
            errorUsername: '',
            errorPassword: ''
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
            this.errorUsername = '';
            this.errorPassword = '';
            const isDuplicate = await this.checkDuplicateUsername(this.user.username);
            if (isDuplicate) {
                this.errorUsername = 'This username already exists';
                return
            }

            if (this.user.password !== this.confirmPassword) {
                this.errorPassword = 'Passwords do not match';
                return
            }
            await this.postUser()
            router.push({ path: '/', query: { successToast: 'true' } });
        },
        async checkDuplicateUsername(username: string): Promise<boolean> {
            try {
                const userExists = this.users.find((user: IUsers) => {
                    return user.username.toLowerCase() === username.toLowerCase();
                });
                return userExists !== undefined;
            } catch (error) {
                console.error('Error checking username', error);
                return false;
            }
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