<template>
  <Chart type="line" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Chart from 'primevue/chart';

export default defineComponent({
  name: 'LineChartChart',
  props: {
    chartData: {
      type: Object,
      required: true
    },
  },
  components: {
    Chart
  },
  setup() {
    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "grey",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "grey",
          },
          grid: {
            color: "rgb(225, 225, 225)",
          },
        },
        y: {
          position: 'left',
          beginAtZero: true,
          ticks: {
            color: "grey",
            callback: function (value: number) {
              const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              });

              return value < 0 ? '-' + formatter.format(Math.abs(value)) : formatter.format(value);
            },
          },
          grid: {
            color: "rgb(225, 225, 225)",
          },
        }
      },
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