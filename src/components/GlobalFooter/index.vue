<template>
  <div class="footer">
    <section class="copyright">
      <a href="https://kekeee.com">Kekeee</a> © 2022 
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { isMobile } from '@/utils/device'

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
}
</style>
