<template>
  <div class="footer">
    <section class="copyright">
      <a href="https://kekeee.com">Kekeee</a> © 2022 
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GlobalFooter",
  components: {},
});
</script>

<style lang="less" scoped>
.footer {
  height: 40px;
  line-height: 60px;
  a {
    color: #888888;
  }

.copyright{
  text-align: center;
}
}
</style>
