<template>
    <Chart type="bar" :data="chartData" :options="chartOptions"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chart from 'primevue/chart';

export default defineComponent({
    name: 'HorizontalBarChart',
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
                        display: false
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: "grey",
                            callback: function (value: number) {
                                if (value % 1 === 0) {
                                    return value;
                                }
                            },
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: "rgb(250, 250, 250)",
                            drawBorder: false
                        },

                    },

                },

            },
        }
    },

});
</script>

<style scoped>
.flag-icon {
    width: 1.5em;
    height: auto;
}
</style>