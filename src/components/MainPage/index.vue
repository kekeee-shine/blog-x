<template>
  <main>
    <div class="markdown-body main-container">
      <div class="post-container float-left">
        <article-html
          article_url="https://blog-resource-1257103956.cos.ap-nanjing.myqcloud.com/html/222222.html"
        ></article-html>
      </div>

      <aside class="sidebar-container float-left hidden-sm">
        <div>
          <div class="temp">
            <a
              class="label-item"
              v-for="(label, index) in articles"
              :href="'/article/'+label['name']"
              :key="index"
              :style="{
                'background-color': colors[index % 5],
              }"
              >{{ label['name'] + (index % 5) }}</a
            >
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
import {articles, labels,topics} from "@/Global.ts";
export default defineComponent({
  name: "MainPage",
  components: {},
  mounted() {
    this.url1 =
      "https://blog-resource-1257103956.cos.ap-nanjing.myqcloud.com/html/222222.html";
  },
  setup() {
    const colors = ["#16A085", "#27AE60", "#2980B9", "#8E44AD", "#2C3E50"];
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
      colors,
      articles,
      labels,
      topics,
      url1: "",
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