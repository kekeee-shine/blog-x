<template>
  <div v-html="current_article_context"></div>
</template>


<script lang="ts">
import axios from "axios";
import {
  bucket_url,
  articles,
  current_article_context,
  current_article_name,
  current_topic,
} from "@/global";

import storage from "@/storage";

import { watch, onMounted, nextTick, onUpdated } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const article_name: any = router.currentRoute.value.params.id;

    const article_url = bucket_url + "html/" + article_name + ".html";
    if (
      article_name &&
      article_name.length > 0 &&
      article_name != current_article_name.value
    ) {
      current_article_name.value = article_name;
      let local_storage_data:any = storage.get_article(article_name);
      if (local_storage_data) {
        current_article_context.value = local_storage_data.replaceAll('<img','<img onclick="image_click(this)"');
        // current_article_context.value = 
      } else {
        axios
          .get(article_url)
          .then(function (response) {
            current_article_context.value = response.data.replaceAll('<img','<img onclick="image_click(this)"');
            storage.set_article(article_name, response.data, 1);
          })
          .catch(function () {
            current_article_context.value = "loading failed";
          })
          .finally(function () {
            console.log("load completed");
          });
      }
    }

    watch(current_article_context, () => {
        window.scroll(0, 0);
    });
    return {
      current_article_context,
    };
  },
};
</script>


<style>
@media (min-width: 1200px) {
  .main-container {
    width: 100% !important;
    max-width: 1150px !important;
  }
}
</style>