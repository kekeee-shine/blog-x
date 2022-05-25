<script>
export default {
  name: "mixins-module",
  components: {},
  props: {},
  data() {
    return {
      mixinData: "mixin中的变量",
    };
  },
  methods: {
    getPosition(ele) {
      var x = 0,
        y = 0;
      while (ele) {
        x += ele.offsetLeft - ele.scrollLeft + ele.clientLeft;
        y += ele.offsetTop - ele.scrollTop + ele.clientTop;
        ele = ele.offsetParent;
      }
      return { x: x, y: y };
    },
  },
};
</script>