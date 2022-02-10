<template>
  <div class="home-page p-5 w-100vw h-100vh !overflow-auto scroll-bar">
    <div class="shadow px-3 py-2 mb-4 flex items-center">
      <i
        class="mdi mdi-arrow-left text-3xl mr-4 cursor-pointer text-blue-600"
        @click="$router.back()"
      />
      <span class="text-2xl font-bold text-gray-800 mr-4">{{ currency }}</span>
      <span class="text-gray-500">
        {{ dayjs(startDate).format("YYYY年MM月DD日") }}
        -
        {{ dayjs(endDate).format("YYYY年MM月DD日") }}汇率
      </span>
    </div>
    <!-- 查询的汇率列表 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      highlight-current-row
      class="shadow min-w-700px mb-4"
      size="mini"
      :data="rateData"
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
      <el-table-column prop="addtime" label="日期" width="120">
      </el-table-column>
    </el-table>
    <div class="px-3 py-2 shadow-lg">
      <RateTrendChart :values="rateData" />
    </div>
  </div>
</template>

<script>
import { getPagedRate } from "@/api/rate";
import { onMounted, ref } from "@vue/composition-api";
import dayjs from "dayjs";
import RateTrendChart from "@/views/RateTrendChart";

export default {
  name: "Query",
  components: { RateTrendChart },
  props: ["currency", "startDate", "endDate"],
  setup(props) {
    //列表数据
    const rateData = ref([]);
    const loading = ref(false);
    const getRateData = async function () {
      try {
        loading.value = true;
        const res = await getPagedRate({
          currency: props.currency,
          startDate: props.startDate,
          endDate: props.endDate,
        });
        rateData.value = res.data ?? [];
      } finally {
        loading.value = false;
      }
    };
    onMounted(getRateData);

    return {
      rateData,
      loading,
      dayjs,
    };
  },
};
</script>
