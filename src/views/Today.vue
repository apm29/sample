<template>
  <div class="home-page p-5 w-100vw h-100vh !overflow-auto scroll-bar">
    <!-- 查询条件 -->
    <div class="shadow px-3 py-2 flex flex-wrap items-center mb-4 min-w-700px">
      <el-select
        placeholder="选择币种"
        v-model="selectedCurrency"
        class="mr-2 mb-1"
      >
        <el-option
          v-for="currency of currencyDict"
          :key="currency"
          :label="currency"
          :value="currency"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        class="mr-2 mb-1"
        range-separator="-"
        start-placeholder="选择起始时间"
        end-placeholder="选择终止时间"
      >
      </el-date-picker>
      <el-button
        @click="handleQuery"
        class="mr-2 mb-1"
        type="primary"
        :disabled="!validateQuery"
      >
        查询
      </el-button>
    </div>
    <!-- 今日汇率 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      highlight-current-row
      class="shadow-lg min-w-700px"
      size="mini"
      :data="todayRateData"
    >
      <el-table-column prop="rate" label="币种汇率" width="160">
        <template slot-scope="{ row }">
          <span class="text-orange-500">
            {{ row.currencyfname }}/{{ row.huilv }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="currencytname" label="本币名称"> </el-table-column>
      <el-table-column prop="currencyto" label="本币简称"> </el-table-column>
      <el-table-column prop="currencyfname" label="外币名称"> </el-table-column>
      <el-table-column prop="currencyfrom" label="外币简称"> </el-table-column>
      <el-table-column prop="fbuypri" label="现汇买入价"> </el-table-column>
      <el-table-column prop="fsellpri" label="现汇卖出价"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPagedRateToday } from "@/api/rate";
import { computed, onMounted, ref, unref } from "@vue/composition-api";
import dayjs from "dayjs";

export default {
  name: "Today",
  setup(props, context) {
    //列表数据
    const todayRateData = ref([]);
    const loading = ref(false);
    const getTodayRateData = async function () {
      try {
        loading.value = true;
        const res = await getPagedRateToday();
        todayRateData.value = res.data ?? [];
      } finally {
        loading.value = false;
      }
    };
    onMounted(getTodayRateData);

    //查询条件
    const selectedCurrency = ref(null);
    const dateRange = ref([]);
    const handleQuery = function () {
      context.root.$router.push({
        path: "/query",
        query: {
          currency: unref(selectedCurrency),
          startDate: dayjs(unref(dateRange)[0]).format("YYYY-MM-DD"),
          endDate: dayjs(unref(dateRange)[1]).format("YYYY-MM-DD"),
        },
      });
    };
    return {
      todayRateData,
      loading,
      getTodayRateData,
      currencyDict: computed(() =>
        unref(todayRateData).map((it) => it.currencyfrom)
      ),
      validateQuery: computed(() => {
        return (
          unref(selectedCurrency) &&
          unref(dateRange) &&
          unref(dateRange).length === 2
        );
      }),
      selectedCurrency,
      dateRange,
      handleQuery,
    };
  },
};
</script>
