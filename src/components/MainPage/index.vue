<template>
  <main>
    <div class="markdown-body main-container">
      <div class="post-container float-left">
        <!-- <router-link to="/">Home</router-link> |
        <router-view /> -->
        <router-view :key="$route.fullPath">        <ArticleHtml></ArticleHtml></router-view>

      </div>

      <aside class="sidebar-container float-left hidden-sm">
        <div>
          <div class="temp">
            <!-- <a
              class="label-item"
              v-for="(label, index) in articles"
              :href="'/article/'+label['name']"
              :key="index"
              :style="{
                'background-color': colors[index % 5],
              }"
              >{{ label['name'] + (index % 5) }}</a
            > -->

            <router-link class="label-item" v-for="(label, index) in articles" :to="'/article/' + label['name']"
              :key="index" :style="{
                'background-color': colors[index % 5],
              }">{{ label['name'] + (index % 5) }}</router-link>
          </div>
          <div class="temp">
            <a>111</a>
            <a>222</a>
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { articles, labels, topics } from "@/Global";
import ArticleHtml from "@/components/MainPage/article.vue";

import { useRouter } from 'vue-router'

export default defineComponent({
  name: "MainPage",
  components: {
    ArticleHtml
  },
  setup() {
    const colors = ["#16A085", "#27AE60", "#2980B9", "#8E44AD", "#2C3E50"];
    const router = useRouter()
    const article_name = router.currentRoute.value.params.id
    // const article_name = ref(111)
    watch(labels, (Global) => {
      labels.value = Global;
    });

    watch(articles, (Global) => {
      articles.value = Global;
    });

    watch(topics, (Global) => {
      topics.value = Global;
    });
    return {
      article_name,
      colors,
      articles,
      labels,
      topics,
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
  background-color: bisque;
}

.sidebar-container {
  /* background-color: cadetblue; */
}

.temp {
  margin: 15px;
  background-color: burlywood;
  padding: 10px;
  max-width: 200px;
}

.label-item {
  white-space: nowrap !important;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  margin: 10px;
  /* display: block; */
}
</style>

["label1","label2","label3","label4"]