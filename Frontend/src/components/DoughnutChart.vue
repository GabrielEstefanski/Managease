<template>
    <Chart type="doughnut" :data="chartData" :options="chartOptions"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chart from 'primevue/chart';

export default defineComponent({
    name: 'DoughnutChart',
    created() {
        this.chartData;
    },
    props: {
        chartData: {
            type: Object,
            required: true
        },
    },
    components: {
        Chart
    },
    data() {
        return {
            chartOptions: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: "grey",
                        },
                    },
                },
            },
        }
    },

});
</script>
