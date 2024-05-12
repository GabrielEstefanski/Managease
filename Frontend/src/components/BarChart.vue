<template>
    <Chart type="bar" :data="chartData" :options="chartOptions" class="w-full md:w-30rem"/>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
import Chart from 'primevue/chart';

export default defineComponent({
    name: 'HorizontalBarChart',
    props: {
        chartData: {
            type: Object,
            required: true
        },

    },
    components: {
        Chart
    },
    setup(props) {
        const chartOptions = ref({
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                x: {
                    ticks: {
                       color: "grey"
                    },
                    grid: {
                        display: false
                    },
                },
                y: {
                    suggestedMin: 0, 
                    suggestedMax: 0,
                    beginAtZero: true,
                    ticks: {
                        color: "grey",
                        callback: function (value: number) {
                            if (value % 1 === 0) {
                                return value;
                            }
                        },
                    },
                    grid: {
                        color: "rgb(225, 225, 225)",
                    },
                },
            },
        });

        watch(() => props.chartData.datasets[0].data, () => {
            const maxCnpjCount = Math.max(...props.chartData.datasets[0].data);
            chartOptions.value.scales.y.suggestedMax = maxCnpjCount + 5;
        });

        return {
            chartOptions
        };
    }


});
</script>

<style scoped>
.flag-icon {
    width: 1.5em;
    height: auto;
}
</style>