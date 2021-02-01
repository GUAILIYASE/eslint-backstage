<template>
  <div class="d-f j-b an-c">
    <div>欢迎来到mt后台系统</div>
    <div class="d-f an-c">
      <div>{{ time }}</div>
      <div id="weather-v2-plugin-simple" class="weather"></div>
      <div>亲爱的{{ user }},</div>
      <div>退出</div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      time: "",
      timeflag: null
    };
  },
  components: {},
  methods: {
    timer() {
      let hour = dayjs(new Date()).hour();
      let when = "";
      if (hour >= 6 && hour < 12) {
        when = "早上";
      } else if (hour >= 12 && hour < 14) {
        when = "中午";
      } else if (hour >= 14 && hour < 18) {
        when = "下午";
      } else if (hour >= 18 && hour <= 23) {
        when = "晚上";
      } else {
        when = "凌晨";
      }
      this.time = dayjs(`${new Date()}`).format(`YYYY/MM/DD  ${when}hh:mm:ss`);
    }
  },
  mounted() {
    this.timeflag = setInterval(() => {
      this.timer();
    }, 1000);
    window.WIDGET = {
      CONFIG: {
        weatherIconSize: 24,
        alertIconSize: 18,
        padding: "10px 10px 10px 10px",
        shadow: "1",
        language: "auto",
        borderRadius: 5,
        fixed: "false",
        vertical: "middle",
        horizontal: "center",
        key: "aGh9gAMF5m"
      }
    };
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://apip.weatherdt.com/simple/static/js/weather-simple-common.js?v=2.0";
    document.getElementsByTagName("head")[0].appendChild(script);
  },
  computed: {
    user() {
      let users = JSON.parse(localStorage.getItem("user"));
      return users.username;
    }
  },
  watch: {},
  beforeDestroy() {
    clearInterval(this.timeflag);
  }
};
</script>

<style lang="scss" scoped>
.weather {
  width: 60px;
  height: 30px;
}
</style>
