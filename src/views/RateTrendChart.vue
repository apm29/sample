<template>
  <div id="main" class="w-full min-h-300px"></div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, toRefs, unref, watch } from "@vue/composition-api";

export default {
  name: "RateTrendChart",
  props: {
    values: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  setup(props) {
    const { values } = toRefs(props);
    const init = function () {
      // 基于准备好的dom，初始化echarts实例
      const chart = echarts.init(document.getElementById("main"));
      // 绘制图表
      chart.setOption({
        title: {
          text: "汇率折线",
        },
        tooltip: {},
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: unref(values).map((it) => it.addtime),
        },
        yAxis: {
          scale: true,
          type: "value",
        },
        series: [
          {
            name: "汇率",
            type: "line",
            data: unref(values).map((it) => it.huilv),
          },
        ],
      });
    };
    onMounted(init);
    watch(values, init);
  },
};
</script>

<style scoped></style>
