import { createApp } from 'vue';

import App from './App.vue';
import '../scss/styles.scss';

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import ToastService from 'primevue/toastservice';
import VueApexCharts from 'vue3-apexcharts';
import router from './router';
import store from './stores/index';
import Avatar from 'primevue/avatar';
import InlineMessage from 'primevue/inlinemessage';
import Breadcrumb from 'primevue/breadcrumb';
import ConfirmDialog from 'primevue/confirmdialog';
import Knob from 'primevue/knob';
import AutoComplete from 'primevue/autocomplete';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Calendar from 'primevue/calendar';
import CountryFlag from 'vue-country-flag-next';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import Toast from 'primevue/toast';
import Password from 'primevue/password';
import DataTable from 'primevue/datatable';
import ConfirmationService from 'primevue/confirmationservice';
import Column from 'primevue/column';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import PrimeVue from "primevue/config";
import { createI18n } from 'vue-i18n';

import locales from './locales';

const i18n = createI18n({
    legacy: false,
    locale: store.state.locale,
    messages: locales
})

const app = createApp(App);

app.use(PrimeVue)
    .use(ToastService)
    .use(ConfirmationService)
    .use(store)
    .use(router)
    .use(i18n)
    .component('Accordion', Accordion)
    .component('AccordionTab', AccordionTab)
    .component('AutoComplete', AutoComplete)
    .component('Avatar', Avatar)
    .component('DataTable', DataTable)
    .component('Breadcrumb', Breadcrumb)
    .component('VueApexCharts', VueApexCharts)
    .component('Column', Column)
    .component('Toolbar', Toolbar)
    .component('Dialog', Dialog)
    .component('Card', Card)
    .component('ConfirmDialog', ConfirmDialog)
    .component('Knob', Knob)
    .component('Textarea', Textarea)
    .component('InputText', InputText)
    .component('InputMask', InputMask)
    .component('InputNumber', InputNumber)
    .component('InputGroup', InputGroup)
    .component('InputGroupAddon', InputGroupAddon)
    .component('Calendar', Calendar)
    .component('CountryFlag', CountryFlag)
    .component('InlineMessage', InlineMessage)
    .component('Dropdown', Dropdown)
    .component('RadioButton', RadioButton)
    .component('Toast', Toast)
    .component('Password', Password)
    .component('Button', Button)
app.mount('#app');
