<template>
  <main>
    <div class="markdown-body main-container">
      <div class="post-container float-left box-shadow">
        <router-view :key="$route.fullPath"></router-view>
      </div>

      <aside class="gkt-sidebar float-left hidden-xs hidden-sm">
        <div>
          <section class="box-shadow">
            <SideBarLabelView v-if="!toc_mode"></SideBarLabelView>
            <SideBarTocView v-else></SideBarTocView>
          </section>

        </div>
      </aside>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from "vue";
import { articlesGroupByLabel } from "@/Global";
import { useRouter } from "vue-router";

import SideBarLabelView from '@/views/sidebarViews/SideBarLabelView.vue'
import SideBarTocView from '@/views/sidebarViews/SideBarTocView.vue'

export default defineComponent({
  name: "MainPage",
  components: {
    SideBarLabelView,
    SideBarTocView
  },
  setup() {
    const router = useRouter();
    const article_name = router.currentRoute.value.params.id;



    const toc_mode = computed(()=>{
      if (router.currentRoute.value.path.startsWith('/article')){
        return true;
      }
      else{
        return false;
      }
    });

    const label_items = computed(() => {
      return articlesGroupByLabel.value
    })

    return {
      article_name,
      label_items,
      toc_mode
    };
  },
});
</script>


<style scoped>
.main-container {
  margin-right: auto;
  margin-left: auto;
  padding-top: 20px;
  padding-bottom: 30px;
  overflow: hidden;
}

.main-container div {
  height: auto;
}

.post-container {
  padding: 30px, 0px;
  background-color: #fff;
}
</style>
