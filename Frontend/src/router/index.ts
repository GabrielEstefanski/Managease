import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/LoginPage.vue'),
        props: (route) => ({
            showSuccessToast: route.query.successToast === 'true'
        })
    },
    {
        path: '/financial/:idBranch',
        name: 'Financial',
        component: () => import('../views/FinancialPage.vue'),
        props: true
    },
    {
        path: '/financial',
        name: 'AllFinancials',
        component: () => import('../views/AllFinancialsPage.vue'),
    },
    {
        path: '/signup',
        name: 'Register',
        component: () => import('../views/RegisterPage.vue'),
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/SettingsPage.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/HomePage.vue')
    },
    {
        path: '/company',
        name: 'Company',
        component: () => import('../views/CompanyPage.vue')
    },
    {
        path: '/branch/:idCompany',
        name: 'Branch',
        component: () => import('../views/BranchPage.vue'),
        props: true
    },
    {
        path: '/branch',
        name: 'AllBranches',
        component: () => import('../views/AllBranchesPage.vue')
    },
    {
        path: '/about-me',
        name: 'AboutMe',
        component: () => import('../views/AboutMePage.vue')
    },
    {
        path: '/confirm-user-page',
        name: 'ConfirmUserPage',
        component: () => import('../views/ConfirmUserPage.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
