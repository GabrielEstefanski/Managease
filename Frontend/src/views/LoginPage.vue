<template>
    <div class="container">
        <Card class="card" style="width: 25rem; overflow: hidden">
            <template #title>ManagEase</template>
            <template #content>
                <div class="column gap-2 mb-3">
                    <label for="username">Username</label>
                    <InputText id="username" v-model="username" :invalid="!!error"></InputText>
                </div>
                <div class="column gap-2 mb-3">
                    <label for="password">Password</label>
                    <Password id="password" v-model="password" :feedback="false" :inputStyle="{ 'width': '100%' }"
                        toggleMask :invalid="!!error"></Password>
                </div>
                <InlineMessage v-if="error" severity="error" class="text-left" style="width: 100%;">{{ error }}
                </InlineMessage>
                <div class="text-center mt-4">
                    <p>Don't have an account yet? <a href="/#/signup" class="text-blue-500">Sign up here</a></p>
                </div>
            </template>
            <template #footer>
                <div class="flex gap-3 mt-1">
                    <Button label="Login" class="w-full" @click="findUser" />
                </div>
            </template>
        </Card>
        <Toast />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import IUsers from '../interfaces/IUsers';
import axiosInstance from '@/http';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import router from '@/router';

export default defineComponent({
    name: 'LoginPage',
    props: {
        showSuccessToast: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    mounted() {
        const store = useStore();
        const userId = store.state.userId;
        const userName = store.state.userName;

        if (userId && userName) {
            router.push('/home');
        }
    },
    setup(props) {
        const users = ref<IUsers[]>([]);
        const username = ref('');
        const password = ref('');
        const error = ref('');

        const router = useRouter();
        const store = useStore();
        const toasts = useToast();

        function showFailedToast() {
            toasts.add({ severity: 'error', summary: 'Error', detail: 'Company with this name already exists' });
        }

        onMounted(() => {
            if (props.showSuccessToast) {
                toasts.add({ severity: 'success', summary: 'Success', detail: 'User registered successfully', life: 3000 });
            }
        })

        const findUser = async () => {
            try {
                await fetchUsers();
                const userFounded = users.value.find(user => user.username === username.value) ?? null;
                const response = await axiosInstance.post('/login', { _id: userFounded?._id, password: password.value })
                if (response.status === 200) {
                    const id = response.data.message._id;
                    const name = response.data.message.name;
                    store.commit('setUser', { id, name });
                    router.push('/home');
                }
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

        return {
            username,
            password,
            error,
            findUser
        };
    },
});
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0 auto;
    padding: 0 1rem;
}

@media (max-width: 768px) {
    .container {
        padding: 0;
    }
}
</style>