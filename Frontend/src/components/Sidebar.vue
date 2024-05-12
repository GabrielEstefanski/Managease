<template>
    <div class="app-wrapper">
        <Sidebar :visible="!isComponentOpen && isUserId" :modal="false" :show-close-icon="false" :header="'ManagEase'"
            style="width: 220px; box-shadow: none;">
            <div>
                <Button class="p-button p-button-rounded p-button-text" @click="redirectToDashboard">
                    <i class="pi pi-chart-bar mr-5"></i>
                    <span class="font-medium mt-1">{{ $t('sidebar.button_dashboard') }}</span>
                </Button>

                <Button class="p-button p-button-rounded p-button-text" @click="redirectToCompany">
                    <i class="pi pi-briefcase mr-5"></i>
                    <span class="font-medium mt-1">{{ $t('sidebar.button_company') }}</span>
                </Button>

                <Button class="p-button p-button-rounded p-button-text" @click="redirectToCnpj">
                    <i class="pi pi-building mr-5"></i>
                    <span class="font-medium mt-1">{{ $t('sidebar.button_branches') }}</span>
                </Button>

                <Button class="p-button p-button-rounded p-button-text" @click="redirectToFinancials">
                    <i class="pi pi-dollar mr-5"></i>
                    <span class="font-medium mt-1">{{ $t('sidebar.button_financials') }}</span>
                </Button>

                <Button class="p-button p-button-rounded p-button-text" @click="redirectToAboutMe">
                    <i class="pi pi-star mr-5"></i>
                    <span class="font-medium mt-1">{{ $t('sidebar.button_me') }}</span>
                </Button>
                <div class="sidebar-footer">
                    <Button class="p-button p-button-rounded p-button-text" @click="logout">
                        <i class="pi pi-sign-out mr-5"></i>
                        <span class="font-medium mt-1">{{ $t('sidebar.button_logout') }}</span>
                    </Button>
                </div>
            </div>
        </Sidebar>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Sidebar from 'primevue/sidebar';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'SidePanel',
    setup() {
        const router = useRouter();
        const store = useStore();

        function redirectToDashboard() {
            router.push('/home');
        }

        function redirectToCompany() {
            router.push('/company');
        }

        function redirectToCnpj() {
            router.push('/branch');
        }

        function redirectToFinancials() {
            router.push('/financial');
        }

        function redirectToAboutMe() {
            router.push('about-me');
        }

        function logout() {
            store.commit('setUser', { id: null, name: null });
            router.push('/');
        }
        const isComponentOpen = computed(() => store.state.isComponentOpen);

        const isUserId = computed(() => store.state.userId);

        const toggleStatus = () => {
            store.commit(isComponentOpen.value ? 'closeComponent' : 'openComponent');
        };

        return {
            redirectToCompany,
            redirectToDashboard,
            redirectToFinancials,
            redirectToCnpj,
            redirectToAboutMe,
            logout,
            isComponentOpen,
            isUserId,
            toggleStatus
        }
    },
    components: {
        Sidebar
    },
});
</script>

<style>
.sidebar-footer {
    position: sticky; 
    border-top: 1px solid rgba(79, 79, 87, 0.37);
    color: #f4f4f4;
    transition: width 0.3s, box-shadow 0.3s;
}

.p-sidebar {
    background-color: rgba(15, 15, 29, 0.925);
    border-right: 1px solid rgba(79, 79, 87, 0.37);
    color: #f4f4f4;
    transition: width 0.3s, box-shadow 0.3s;
}

.menu {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.menu li {
    padding: 10px;
    background-color: #f4f4f4;
    border-bottom: 1px solid #ddd;
}

.menu li a {
    text-decoration: none;
    color: #333;
}

.main-content {
    margin-left: 250px;
    padding: 20px;
}
</style>

<style scoped>
.p-button {
    width: 100%;
    color: #f4f4f4;
}

.no-list-style {
    list-style-type: none;
    padding: 0;
    margin-left: 15px;
}

.pi-chevron-down {
    position: absolute;
    right: 20px;
}

.sidebar-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
}
</style>
