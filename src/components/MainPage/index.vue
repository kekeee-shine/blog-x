<template>
  <main>
    <div class="markdown-body main-container">
      <div class="post-container float-left box-shadow">
        <!-- <router-link to="/">Home</router-link> |
        <router-view /> -->
        <router-view :key="$route.fullPath"></router-view>

      </div>

      <aside class="sidebar-container float-left hidden-sm">
        <div>
          <section class="sidebar-section box-shadow">
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

            <router-link class="label-item " v-for="(value, index) in articlesGroupByLabel" :to="'/label/#' + value[0]"
              :key="index" >{{ value[0]+" ("+value[1].length+") "}}</router-link>
          </section>
          <section class="sidebar-section box-shadow">
            <a>111</a>
            <a>222</a>
          </section>
        </div>
      </aside>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { articles, labels, topics,articlesGroupByLabel } from "@/Global";

import { useRouter } from 'vue-router'

export default defineComponent({
  name: "MainPage",
  setup() {
    // const colors = ["#16A085", "#27AE60", "#2980B9", "#8E44AD", "#2C3E50"];
    const router = useRouter()
    const article_name = router.currentRoute.value.params.id
    // const article_name = ref(111)
    watch(labels, (value) => {
      labels.value = value;
    });

    watch(articles, (value) => {
      articles.value = value;
    });

    watch(topics, (value) => {
      topics.value = value;
    });

        watch(articlesGroupByLabel, (value) => {
      articlesGroupByLabel.value = value;
    });
    return {
      article_name,
      // colors,
      articles,
      labels,
      topics,
      articlesGroupByLabel,
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

.sidebar-container {
  width: 320px;
}

.sidebar-section {
  margin: 0px 15px 15px 15px;
  background-color: #fff;
  padding: 10px;
}

.label-item {
  white-space: nowrap !important;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
  background-color: #eaeaea;
  border-radius: 15px;
  line-height: 30px;
  margin: 5px;
  padding: 0 7px;
  font-size: 15px;
  display: inline-block
}

.label-item:hover {
  /* display: block; */
  text-decoration:none;
  color: #2b97ef !important;
}


.box-shadow {
    -webkit-box-shadow: 0 1px 3px rgb(26 26 26 / 10%);
    box-shadow: 0 1px 3px rgb(26 26 26 / 10%);
    border-radius: 2px;
}

</style>

["label1","label2","label3","label4"]