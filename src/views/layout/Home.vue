<template>
  <div class="fs p-a  d-f j-c an-c">
    欢迎来到MT后台系统
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      home: ""
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.$setnav(this.$route);
  },
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.fs {
  font-size: 50px;
  left: 10px;
  right: 10px;
  top: 34px;
  bottom: 0;
}
</style>
