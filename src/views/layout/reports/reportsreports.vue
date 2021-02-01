<template>
  <div>
    <div ref="myChart" style="width:100%;height:376px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { createNamespacedHelpers } from "vuex";
let informationModel = createNamespacedHelpers("information");
let {
  mapState: informationState,
  mapActions: informationActions
} = informationModel;

export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    ...informationActions(["getReports"]),
    getEchartData() {
      let myChart = echarts.init(this.$refs.myChart);
      console.log(this.reports.data);
      myChart.setOption(this.reports);
    }
  },
  mounted() {
    if (this.reports) this.getReports();
  },
  computed: {
    ...informationState(["reports"])
  },
  watch: {
    reports() {
      this.getEchartData();
    }
  }
};
</script>

<style lang="scss" scoped></style>
