<template>
  <main>
    <!-- <div class="markdown-body main-container"> -->
      <div class="post-container markdown-body float-left box-shadow">
        <ArticleListView v-if="is_home"></ArticleListView>
        <router-view v-else :key="$route.fullPath"></router-view>
      </div>

      <aside class="gkt-sidebar float-left hidden-xs hidden-sm">
        <div class='gkt-sidebar-wrapper'>
          <section class="box-shadow">
            <SideBarLabelView v-if="!toc_mode"></SideBarLabelView>
            <SideBarTocView v-else></SideBarTocView>
          </section>

        </div>
      </aside>
    <!-- </div> -->
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { articles_group_by_label } from "@/global";
import { useRouter } from "vue-router";


import ArticleListView from '@/views/ArticleListView.vue'
import SideBarLabelView from '@/views/sidebarViews/SideBarLabelView.vue'
import SideBarTocView from '@/views/sidebarViews/SideBarTocView.vue'

export default defineComponent({
  name: "MainPage",
  components: {
    ArticleListView,
    SideBarLabelView,
    SideBarTocView
  },
  setup() {
    const router = useRouter();
    const article_name = router.currentRoute.value.params.id;

    const is_home = computed(()=>{
      if(router.currentRoute.value.path=='/'){
        return true;
      }
      else{
        return false;
      }
    });

    const toc_mode = computed(()=>{
      if (router.currentRoute.value.path.startsWith('/article')){
        return true;
      }
      else{
        return false;
      }
    });

    const label_items = computed(() => {
      return articles_group_by_label.value
    })

    return {
      article_name,
      is_home,
      label_items,
      toc_mode
    };
  },
});
</script>


<!-- <style scoped> -->

<style>
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



#click-img-container {
    position: fixed;
    left: 0;
    top: 0;
    text-align: center;
    width: 100%;
    display: none;
    z-index: 9999;
}

#click-img-container img {
    object-fit: contain;
    background: #eaecef;
    padding: 15px;
    border-radius: 10px;
    height: auto;
    width: auto;
    vertical-align: middle;
}

</style>
