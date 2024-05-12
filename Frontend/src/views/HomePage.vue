<template>
    <div class="container">
        <div class="dashboard">
            <h1 class="title">{{ $t('dashboard_page.title') }}</h1>
            <template v-if="!isLoaded">
                <div class="spinner-container">
                    <i class="pi pi-spin pi-spinner large-spinner" />
                </div>
            </template>
            <template v-else>
                <div class="dashboard-display row">
                    <Card class="mini-card col-md-4 mt-3 mr-5">
                        <template #title>{{ $t('dashboard_page.card_total_net') }}</template>
                        <template #content>
                            <div class="flex-card">
                                <template v-if="countAllNetIncome !== 0">
                                    <div class="flex-card-content">
                                        {{ formatCurrency(countAllNetIncome.toString()) }} USD
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="flex-card-content">
                                        {{ $t('dashboard_page.empty_card') }}
                                    </div>
                                </template>
                                <div class="flex-card-full">
                                    <i class="pi pi-money-bill"
                                        style="font-size: 3.5rem; color: rgb(200, 200, 200);"></i>
                                </div>
                            </div>
                        </template>
                    </Card>
                    <Card class="mini-card col-md-4 mt-3 mr-4">
                        <template #title>{{ $t('dashboard_page.card_companies') }}</template>
                        <template #content>
                            <div class="flex-card">
                                <template v-if="totalCompaniesCounts > 0">
                                    <div class="flex-card-content">
                                        {{ totalCompaniesCounts }} {{
                $t('dashboard_page.card_companies_description') }}
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="flex-card-content">
                                        {{ $t('dashboard_page.empty_card') }}
                                    </div>
                                </template>
                                <div class="flex-card-full">
                                    <i class="pi pi-briefcase"
                                        style="font-size: 3.5rem; color: rgb(200, 200, 200);"></i>
                                </div>
                            </div>
                        </template>
                    </Card>
                    <Card class="mini-card col-md-4 mt-3 mr-5">
                        <template #title>{{ $t('dashboard_page.card_financials') }}</template>
                        <template #content>
                            <div class="flex-card">
                                <template v-if="totalFinancialsCounts > 0">
                                    <div class="flex-card-content">
                                        {{ totalFinancialsCounts }} {{
                $t('dashboard_page.card_financials_description') }}
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="flex-card-content">
                                        {{ $t('dashboard_page.empty_card') }}
                                    </div>
                                </template>
                                <div class="flex-card-full">
                                    <i class="pi pi-dollar" style="font-size: 3.5rem; color: rgb(200, 200, 200);"></i>
                                </div>
                            </div>
                        </template>
                    </Card>
                    <Card class="mini-card col-md-4 mt-3">
                        <template #title>{{ $t('dashboard_page.card_branches') }}</template>
                        <template #content>
                            <div class="flex-card">
                                <template v-if="totalBrancheCounts > 0">
                                    <div class="flex-card-content ">
                                        {{ totalBrancheCounts }} {{
                $t('dashboard_page.card_branches_description') }}
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="flex-card-content">
                                        {{ $t('dashboard_page.empty_card') }}
                                    </div>
                                </template>
                                <div class="flex-card-full">
                                    <i class="pi pi-building" style="font-size: 3.5rem; color: rgb(200, 200, 200);"></i>
                                </div>
                            </div>
                        </template>
                    </Card>
                </div>
                <div class="dashboard-display row">
                    <div class="col-md-4 col-sm-6 mt-5 mb-3">
                        <Card class="chart-card mr-4">
                            <template #title>{{ $t('dashboard_page.card_line_graph') }}</template>
                            <template #content>
                                <template v-if="netIncomeChartData.labels.length > 0">
                                    <LineChart :chartData="netIncomeChartData" />
                                </template>
                                <template v-else>
                                    <div class="empty-card">
                                        {{ $t('dashboard_page.empty_card') }}
                                    </div>
                                </template>
                            </template>
                        </Card>
                    </div>
                    <div class="col-md-4 col-sm-6 mt-5 mb-3">
                        <Card class="chart-card">
                            <template #title>{{ $t('dashboard_page.card_bars_branches') }}</template>
                            <template #content>
                                <template v-if="barChartData.labels.length > 0">
                                    <BarChart :chartData="barChartData" />
                                </template>
                                <template v-else>
                                    <div class="empty-card">
                                        {{ $t('dashboard_page.empty_card') }}
                                    </div>
                                </template>
                            </template>
                        </Card>
                    </div>
                </div>
                <div class="dashboard-display">
                    <div class="col-md-4 col-sm-6 mt-5 mb-3">
                        <Card class="small-chart-card mr-3">
                            <template #title>{{ $t('dashboard_page.card_doughnuts_sector') }}</template>
                            <template #content>
                                <template v-if="expenseChartData.labels.length > 0">
                                    <div class="flex-card">
                                        <DoughnutChart :chart-data="sectorsChartData" />
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="empty-card">
                                        {{ $t('dashboard_page.empty_card') }}
                                    </div>
                                </template>
                            </template>
                        </Card>
                    </div>
                    <div class="col-md-4 col-sm-6 mt-5 mb-3">
                        <Card class="bar-chart-custom mr-3">
                            <template #title>{{ $t('dashboard_page.card_horizontalbar_inactive') }}</template>
                            <template #content>
                                <template v-if="chartData.labels.length > 0">
                                    <HorizontalBarChart :chart-data="chartData" />
                                </template>
                                <template v-else>
                                    <div class="empty-card">
                                        {{ $t('dashboard_page.empty_card') }}
                                    </div>
                                </template>
                            </template>
                        </Card>
                    </div>
                    <Card class="small-chart-card col-sm-6 mt-5">
                        <template #title>{{ $t('dashboard_page.card_pie_net_income') }} - {{ formattedDate
                            }}</template>
                        <template #content>
                            <template v-if="pieChartData.labels.length > 0">
                                <PieChart :chart-data="pieChartData"></PieChart>
                            </template>
                            <template v-else>
                                <div class="empty-card">
                                    {{ $t('dashboard_page.empty_card') }}
                                </div>
                            </template>
                        </template>
                    </Card>
                </div>
                <div class="dashboard-display">
                    <div class="card-branche-company mr-4">
                        <Card class="chart-card mt-5">
                            <template #title>{{ $t('dashboard_page.card_line_revenue') }}</template>
                            <template #content>
                                <template v-if="revenueChartData.labels.length > 0">
                                    <LineChart :chartData="revenueChartData" />
                                </template>
                                <template v-else>
                                    <div class="empty-card">
                                        {{ $t('dashboard_page.empty_card') }}
                                    </div>
                                </template>
                            </template>
                        </Card>
                    </div>
                    <div class="card-branche-company mr-3">
                        <div class="col-md-4 mt-5 mb-3">
                            <Card class="chart-card col-sm-6">
                                <template #title>{{ $t('dashboard_page.card_line_expense') }}</template>
                                <template #content>
                                    <template v-if="expenseChartData.labels.length > 0">
                                        <LineChart :chart-data="expenseChartData" />
                                    </template>
                                    <template v-else>
                                        <div class="empty-card">
                                            {{ $t('dashboard_page.empty_card') }}
                                        </div>
                                    </template>
                                </template>
                            </Card>
                        </div>
                    </div>
                </div>

                <div class="dashboard-display">
                    <div class="table mr-4 mt-5">
                        <Toolbar>
                            <template #start>
                                <label style="font-size: 1.5rem; font-weight: 700; color: #495057">{{
                $t('dashboard_page.table_top_countries') }}</label>
                            </template>
                        </Toolbar>
                        <div class="data-table" ref="tableRef" tableStyle="width: 100%">
                            <DataTable :value="countryCounts" :paginator="true" :rows="10" tableStyle="width: 100%">
                                <template #empty>{{ $t('dashboard_page.table_column_country_empty') }}</template>
                                <Column field="country" :header="$t('dashboard_page.table_column_country')">
                                    <template #body="{ data }">
                                        <CountryFlag class="mr-1" :country="getCountryCode(data.country)">
                                        </CountryFlag>
                                        <span> {{ getCountryName(data.country) }}</span>
                                    </template>
                                </Column>
                                <Column field="counts" :header="$t('dashboard_page.table_column_count_branches')">
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                    <div class="table mt-5">
                        <Toolbar>
                            <template #start>
                                <label style="font-size: 1.5rem; font-weight: 700; color: #495057">{{
                $t('dashboard_page.table_top_financials_earnings') }} - {{ formattedDate
                                    }}</label>
                            </template>
                        </Toolbar>
                        <div class="data-table">
                            <DataTable :value="topEarnings" :paginator="true" :rows="10">
                                <template #empty>{{ $t('dashboard_page.table_column_valuation_empty') }}</template>
                                <Column field="companyName" :header="$t('dashboard_page.table_column_company')" />
                                <Column field="sector" :header="$t('dashboard_page.table_column_sector')" />
                                <Column field="earnings" :header="$t('dashboard_page.table_column_earnings')">
                                    <template #body="{ data }">
                                        <data>{{ formatCurrency(data.earnings) }}</data>
                                    </template>
                                </Column>
                                <Column field="active" :header="$t('dashboard_page.table_column_status')">
                                    <template #body="{ data }">
                                        <i class="pi"
                                            :class="{ 'pi-check-circle text-green-500': data.active === 1, 'pi-times-circle text-red-400': data.active === 0 }" />
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </div>

                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';

import axiosInstance from '@/http';
import HorizontalBarChart from '../components/HorizontalBarChart.vue';
import randomColor from 'randomcolor';
import DoughnutChart from '../components/DoughnutChart.vue';
import LineChart from '../components/LineChart.vue'
import BarChart from '../components/BarChart.vue';
import PieChart from '@/components/PieChart.vue';
import IUsers from '@/interfaces/IUsers';
import IFinancial from '@/interfaces/IFinancial';
import IBranch from '@/interfaces/IBranch';
import ICompany from '@/interfaces/ICompany';
import router from '@/router';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { watchEffect } from 'vue';

export default defineComponent({
    name: 'HomePage',
    components: {
        HorizontalBarChart,
        LineChart,
        DoughnutChart,
        PieChart,
        BarChart
    },
    setup() {
        const { locale } = useI18n();
        const formattedDate = ref('');

        function capitalizeFirstLetter(date: string) {
            return date.charAt(0).toUpperCase() + date.slice(1);
        }

        watch(locale, () => {
            const date = new Date();
            const month = date.toLocaleString(locale.value, { month: 'long' });
            const capitalizedMonth = capitalizeFirstLetter(month);
            formattedDate.value = date.toLocaleString(locale.value, { month: 'long' }).replace(month, capitalizedMonth);
        });

        onMounted(() => {
            const date = new Date();
            const month = date.toLocaleString(locale.value, { month: 'long' });
            const capitalizedMonth = capitalizeFirstLetter(month);
            formattedDate.value = date.toLocaleString(locale.value, { month: 'long' }).replace(month, capitalizedMonth);
        });

        return { formattedDate };
    },
    data() {
        return {
            user: {} as IUsers,
            branches: [] as IBranch[],
            companies: [] as ICompany[],
            financials: [] as IFinancial[],
            topCountryBranche: [] as IBranch[],
            topEarnings: [] as { companyName: string; sector: string; active: number; earnings: number }[],
            countryCounts: [] as { country: string, counts: number }[],
            totalCompaniesCounts: 0,
            totalBrancheCounts: 0,
            totalFinancialsCounts: 0,
            countAllNetIncome: 0,
            userIdentify: 0,
            isLoaded: false,
            userNameIdentify: '',
            netIncomeChartData: {
                labels: [] as string[],
                datasets: [
                    {
                        label: "Net Income",
                        data: [] as number[],
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1
                    }
                ]
            },
            chartData: {
                labels: [] as string[],
                datasets: [
                    {
                        label: "Branche",
                        backgroundColor: [] as string[],
                        borderColor: "rgb(255, 255, 255)",
                        borderWidth: 1,
                        data: [] as number[],
                    },
                ],
            },
            barChartData: {
                labels: [] as string[],
                datasets: [
                    {
                        label: '',
                        backgroundColor: [] as string[],
                        borderColor: "rgb(255, 255, 255)",
                        borderWidth: 1,
                        data: [] as number[],
                    }
                ]
            },
            valuationChartData: {
                labels: [] as string[],
                datasets: [
                    {
                        label: "Valuation das Empresas",
                        backgroundColor: [] as string[],
                        borderColor: [] as string[],
                        borderWidth: 1,
                        data: [] as number[],
                    },
                ],
            },
            expenseChartData: {
                labels: [] as string[],
                datasets: [
                    {
                        label: "Revenue Counts",
                        data: [] as number[],
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1
                    }
                ]
            },
            pieChartData: {
                labels: [] as string[],
                datasets: [
                    {
                        label: "",
                        data: [] as number[],
                        backgroundColor: [] as string[],
                        fill: false,
                        tension: 0.1
                    }
                ]
            },
            revenueChartData: {
                labels: [] as string[],
                datasets: [
                    {
                        label: "Revenue Counts",
                        data: [] as number[],
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1
                    }
                ]
            },
            sectorsChartData: {
                labels: [] as string[],
                datasets: [
                    {
                        label: "Sectors",
                        data: [] as number[],
                        fill: false,
                        backgroundColor: "",
                        tension: 0.1
                    }
                ]
            },
            monthNames: {
                br: ["Janeiro", "Fevereiro", "March", "Abril", "Maio", "Junho",
                    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                en: ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"],
            },
            countries: [
                { name: this.$t('countries.brazil'), code: 'br' },
                { name: this.$t('countries.united_states'), code: 'us' },
                { name: this.$t('countries.france'), code: 'fr' },
                { name: this.$t('countries.germany'), code: 'de' },
                { name: this.$t('countries.japan'), code: 'jp' },
                { name: this.$t('countries.italy'), code: 'it' },
                { name: this.$t('countries.portugal'), code: 'pt' },
            ]

        };
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
        if (this.userIdentify) {
            await this.fetchUsers();
            await this.fetchBranches();
            await this.fetchCompanies();
            await this.fetchFinancials();
            this.calculateBrancheAmounts();
            this.calculateBrancheAmounts(true);
            this.calculateTopCountryBranches();
            this.calculateRevenueCounts();
            this.calculateExpenseAmounts();
            this.calculateNetIncome();
            this.calculateTopEarnings();
            this.calculateCompaniesCounts();
            this.calculateBrancheCounts();
            this.calculateFinancialCounts();
            this.calculateSectorCounts();
            this.calculateAllNetIncome();
            this.calculateNetIncomePerCategories();
            this.isLoaded = true;
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
        async fetchCompanies() {
            try {
                const response = await axiosInstance.get('/company');
                this.companies = response.data as ICompany[];
                this.companies = this.companies.filter(company => this.user.companies.includes(company._id));

                this.valuationChartData.datasets[0].backgroundColor = this.companies.map(() => randomColor());
                this.valuationChartData.datasets[0].borderColor = this.companies.map(() => randomColor());
                this.valuationChartData.datasets[0].data = this.companies.map(company => company.valuation || 0);
                this.valuationChartData.labels = this.companies.map(company => company.name);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        },
        async fetchBranches() {
            try {
                const response = await axiosInstance.get('/branch');
                this.branches = response.data as IBranch[];
                this.branches = this.branches.filter(branche => this.user.branches.includes(branche._id));
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        },
        async fetchFinancials() {
            try {
                const response = await axiosInstance.get('/financial');
                this.financials = response.data as IFinancial[];
                this.financials = this.financials.filter(financial => this.user.financials.includes(financial._id));
            } catch (error) {
                console.error('Error fetchin financials', error);
            }
        },
        randomColor() {
            return `rgba(${Math.floor(Math.random() * 300)}, ${Math.floor(Math.random() * 300)}, ${Math.floor(Math.random() * 300)}, 0.5)`;
        },
        getCountryName(countryCode: string): string {
            const country = this.countries.find(c => c.code === countryCode);
            return country ? country.name : '';
        },
        formatDate(dateString: string) {
            return dateString ? new Date(dateString).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '';
        },
        calculateCompaniesCounts() {
            const totalCompanies = this.companies.length;
            this.totalCompaniesCounts = totalCompanies;
        },
        calculateBrancheCounts() {
            const totalBranches = this.branches.length;
            this.totalBrancheCounts = totalBranches;
        },
        calculateFinancialCounts() {
            const totalFinancials = this.financials.length;
            this.totalFinancialsCounts = totalFinancials;
        },
        calculateTopEarnings() {
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();

            const earningsMap = this.financials.reduce((acc, financial) => {
                const dateParts = this.formatDate(financial.date).split('/');
                const month = parseInt(dateParts[0]);
                const year = parseInt(dateParts[2]);

                if (month === currentMonth && year === currentYear) {
                    const brancheId = financial.branch_id;
                    const branche = this.branches.find(branche => branche._id === brancheId);
                    const companyId = branche ? branche.company_id : 'Unknown';

                    const company = this.companies.find(company => company._id === companyId);
                    const companyName = company ? company.name : 'Unknown';

                    const currentEarnings = acc.get(companyName) || 0;
                    if (financial.type === 1) {
                        acc.set(companyName, currentEarnings + financial.amount);
                    } else if (financial.type === 2) {
                        acc.set(companyName, currentEarnings - financial.amount);
                    }
                }
                return acc;
            }, new Map());

            this.topEarnings = Array.from(earningsMap.entries())
                .sort((a, b) => b[1] - a[1])
                .map(([companyName, earnings]) => {
                    const company = this.companies.find(company => company.name === companyName);
                    const active = company ? company.active : 0;
                    const sector = company ? company.sector : 'Unknown';
                    return { companyName, earnings, active, sector };
                });
        },
        calculateNetIncomePerCategories() {
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();

            const netIncomeMap = this.financials.reduce((acc, financial) => {
                const dateParts = this.formatDate(financial.date).split('/');
                const month = parseInt(dateParts[0]);
                const year = parseInt(dateParts[2]);

                if (month === currentMonth && year === currentYear) {
                    const brancheId = financial.branch_id;
                    const branche = this.branches.find(branche => branche._id === brancheId);
                    const companyId = branche ? branche.company_id : 'Unknown';

                    const company = this.companies.find(company => company._id === companyId);
                    const companySector = company ? company.sector : 'Unknown';

                    const currentNetIncome = acc.get(companySector) || 0;
                    if (financial.type === 1) {
                        acc.set(companySector, currentNetIncome + financial.amount);
                    } else if (financial.type === 2) {
                        acc.set(companySector, currentNetIncome - financial.amount);
                    }
                }

                return acc;
            }, new Map());

            this.pieChartData.labels = [...netIncomeMap.keys()];
            this.pieChartData.datasets[0].data = [...netIncomeMap.values()];
            this.pieChartData.datasets[0].backgroundColor = Array.from(netIncomeMap.keys(), () => randomColor());
        },
        calculateNetIncome() {
            const locale = this.$i18n.locale as keyof typeof this.monthNames;
            const monthNames = this.monthNames[locale];
            const netIncomeAmounts = this.financials.reduce((acc, financial) => {
                const dateParts = this.formatDate(financial.date).split('/');
                const month = parseInt(dateParts[0]);
                const year = parseInt(dateParts[2]);
                const key = `${monthNames[month - 1]} ${year}`;

                const brancheId = financial.branch_id;
                const branche = this.branches.find(branche => branche._id === brancheId);
                const companyId = branche ? branche.company_id : 'Unknown';
                const company = this.companies.find(company => company._id === companyId);
                const companyName = company ? company.name : 'Unknown';

                const companyKey = `${companyId}-${companyName}-${key}`;
                const currentAmount = acc[companyKey] || 0;

                if (financial.type === 1) {
                    acc[companyKey] = currentAmount + financial.amount;
                } else if (financial.type === 2) {
                    acc[companyKey] = currentAmount - financial.amount;
                }

                return acc;
            }, {} as Record<string, number>);

            const groupedAmounts = Object.keys(netIncomeAmounts).reduce((acc, key) => {
                const [companyId, companyName, monthYear] = key.split('-');
                const currentData = acc[companyName] || { labels: [], data: [] };
                currentData.labels.push(monthYear);
                currentData.data.push(netIncomeAmounts[key]);
                acc[companyName] = currentData;
                return acc;
            }, {} as Record<string, { labels: string[]; data: number[] }>);

            const datasets = Object.keys(groupedAmounts).map(companyName => {
                const companyData = groupedAmounts[companyName];
                return {
                    label: `${companyName}`,
                    data: companyData.data,
                    fill: false,
                    borderColor: randomColor(),
                    tension: 0.1
                };
            });

            this.netIncomeChartData.labels = Array.from(new Set(Object.values(groupedAmounts).flatMap(data => data.labels))).sort().reverse();
            this.netIncomeChartData.datasets = datasets;
        },
        calculateAllNetIncome() {
            this.countAllNetIncome = this.financials.reduce((acc, financial) => {
                const multiplier = financial.type === 2 ? -1 : 1;
                acc += multiplier * financial.amount;
                return acc;
            }, 0);
        },
        formatCurrency(value?: string): string {
            const numericValue = parseFloat(value ?? '');
            return '$' + numericValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        },

        calculateExpenseAmounts() {
            const locale = this.$i18n.locale as keyof typeof this.monthNames;
            const monthNames = this.monthNames[locale];
            const expenseAmounts = this.financials.reduce((acc, financial) => {
                const dateParts = this.formatDate(financial.date).split('/');
                const month = parseInt(dateParts[0]);
                const year = parseInt(dateParts[2]);
                const key = `${monthNames[month - 1]} ${year}`;

                if (financial.type === 2) {
                    const brancheId = financial.branch_id;
                    const branche = this.branches.find(branche => branche._id === brancheId);
                    const companyId = branche ? branche.company_id : 'Unknown';
                    const company = this.companies.find(company => company._id === companyId);
                    const companyName = company ? company.name : 'Unknown';

                    const companyKey = `${companyId}-${companyName}-${key}`;
                    const currentAmount = acc[companyKey] || 0;
                    acc[companyKey] = currentAmount + financial.amount;
                }

                return acc;
            }, {} as Record<string, number>);

            const groupedAmounts = Object.keys(expenseAmounts).reduce((acc, key) => {
                const [companyId, companyName, monthYear] = key.split('-');
                const currentData = acc[companyName] || { labels: [], data: [] };
                currentData.labels.push(monthYear);
                currentData.data.push(expenseAmounts[key]);
                acc[companyName] = currentData;
                return acc;
            }, {} as Record<string, { labels: string[]; data: number[] }>);

            const datasets = Object.keys(groupedAmounts).map(companyName => {
                const companyData = groupedAmounts[companyName];
                return {
                    label: `${companyName}`,
                    data: companyData.data,
                    fill: false,
                    borderColor: randomColor(),
                    tension: 0.1
                };
            });

            this.expenseChartData.labels = Array.from(new Set(Object.values(groupedAmounts).flatMap(data => data.labels))).sort().reverse();
            this.expenseChartData.datasets = datasets;
        },

        calculateRevenueCounts() {
            const locale = this.$i18n.locale as keyof typeof this.monthNames;
            const monthNames = this.monthNames[locale];
            const revenueAmounts = this.financials.reduce((acc, financial) => {
                const dateParts = this.formatDate(financial.date).split('/');
                const month = parseInt(dateParts[0]);
                const year = parseInt(dateParts[2]);
                const key = `${monthNames[month - 1]} ${year}`;

                if (financial.type === 1) {
                    const brancheId = financial.branch_id;
                    const branche = this.branches.find(branche => branche._id === brancheId);
                    const companyId = branche ? branche.company_id : 'Unknown';
                    const company = this.companies.find(company => company._id === companyId);
                    const companyName = company ? company.name : 'Unknown';

                    const companyKey = `${companyId}-${companyName}-${key}`;
                    const currentAmount = acc[companyKey] || 0;
                    acc[companyKey] = currentAmount + financial.amount;
                }

                return acc;
            }, {} as Record<string, number>);

            const groupedAmounts = Object.keys(revenueAmounts).reduce((acc, key) => {
                const [companyId, companyName, monthYear] = key.split('-');
                const currentData = acc[companyName] || { labels: [], data: [] };
                currentData.labels.push(monthYear);
                currentData.data.push(revenueAmounts[key]);
                acc[companyName] = currentData;
                return acc;
            }, {} as Record<string, { labels: string[]; data: number[] }>);

            const datasets = Object.keys(groupedAmounts).map(companyName => {
                const companyData = groupedAmounts[companyName];
                return {
                    label: `${companyName}`,
                    data: companyData.data,
                    fill: false,
                    borderColor: randomColor(),
                    tension: 0.1
                };
            });

            this.revenueChartData.labels = Array.from(new Set(Object.values(groupedAmounts).flatMap(data => data.labels))).sort().reverse();
            this.revenueChartData.datasets = datasets;
        },
        calculateBrancheAmounts(isOnlyInactive = false) {
            const branchesToConsider = isOnlyInactive ? this.branches.filter(branche => branche.active === 0) : this.branches;
            const brancheCounts = branchesToConsider.reduce((acc, branche) => {
                const companyId = branche.company_id;
                acc.set(companyId, (acc.get(companyId) || 0) + 1);
                return acc;
            }, new Map());

            if (isOnlyInactive) {
                this.chartData.labels = this.companies
                    .filter(company => brancheCounts.get(company._id) > 0)
                    .map(company => company.name);
                this.chartData.datasets[0].data = this.companies
                    .filter(company => brancheCounts.get(company._id) > 0)
                    .map(company => brancheCounts.get(company._id) || 0);
                this.chartData.datasets[0].backgroundColor = this.companies.map(() => randomColor());
            } else {
                this.barChartData.labels = this.companies.map(company => company.name);
                this.barChartData.datasets[0].data = this.companies.map(company => brancheCounts.get(company._id) || 0);
                this.barChartData.datasets[0].backgroundColor = this.companies.map(() => randomColor());
            }
        },
        calculateSectorCounts() {
            const sectorCounts = this.companies.reduce((acc, company) => {
                const sector = company.sector;
                acc.set(sector, (acc.get(sector) || 0) + 1);
                return acc;
            }, new Map());

            const labels = Array.from(sectorCounts.keys());
            const data = Array.from(sectorCounts.values());

            const datasets = [{
                label: "Sectors",
                data: data,
                backgroundColor: labels.map(() => randomColor()),
                borderColor: "rgb(255, 255, 255)",
                borderWidth: 1,
                fill: false,
                tension: 0.1
            }];

            this.sectorsChartData.labels = labels;
            this.sectorsChartData.datasets = datasets as [];
        },
        getCountryCode(countryName: string): string {
            const country = this.countries.find(c => c.code === countryName);
            return country ? country.code : '';
        },

        calculateTopCountryBranches() {
            const countryCounts = Array.from(this.branches.reduce((acc, branch) => {
                const branchCountry = branch.country;
                acc.set(branchCountry, (acc.get(branchCountry) || 0) + 1);
                return acc;
            }, new Map()), ([country, counts]) => ({ country, counts }));

            this.countryCounts = countryCounts.sort((a, b) => b.counts - a.counts);
        },
    }
});

</script>


<style scoped>
.ml-custom {
    margin-left: 5px;
}

.dashboard {
    width: 100%;
}

.flex-container {
    display: flex;
}

.empty-card {
    height: 344px;
}

.small-chart-card {
    width: 25rem;
    height: 30rem;
}

.bar-chart-custom {
    width: 49.5rem;
    height: 30rem;
}

.chart-card {
    width: 50rem;
    height: 30rem;
}

.mini-card {
    width: 24rem;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 99%;
}

.flex-card {
    display: flex;
}

.flex-card-content {
    flex-grow: 0;
    display: flex;
    align-items: center;
}

.flex-card-full {
    flex-grow: 1;
    display: flex;
    justify-content: right;
    align-items: center;
}

.table {
    width: 50rem;
}

.dashboard-display {
    display: flex;
    width: 100%;
}

@media (max-width: 768px) {
    .dashboard-display {
        display: contents;
        flex-wrap: wrap;
        width: 100%;
    }

    .chart-card,
    .mini-card,
    .bar-chart-custom,
    .small-chart-card,
    .data-table,
    .table {
        width: 100%;
        max-width: 22rem;
        height: auto;
    }
}
</style>