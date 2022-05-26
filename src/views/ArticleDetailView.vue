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
} from "@/Global";

import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const article_name:any = router.currentRoute.value.params.id;

    const article_url = bucket_url + "html/" + article_name + ".html";

    if (
      article_name &&
      article_name.length > 0 &&
      article_name != current_article_name.value
    ) {
      axios
        .get(article_url)
        .then(function (response) {
          current_article_name.value = article_name;
          current_article_context.value = response.data;
          
          for (let i = 0; i < articles.value.length; i++) {
            let _article: any = articles.value[i];
            let _topic_name;
            if (_article["name"] == article_name) {
              _topic_name = _article["topic"];
              current_topic.value = _topic_name;
              // reverse()
              break;
            }
          }
        })
        .catch(function () {
          current_article_context.value = "loading failed";
        });
    }

    return {
      current_article_context,
    };
  },
};
</script>


<style scoped>
@media (min-width: 1200px) {
  .header-container,
  .main-container {
    width: 100%;
    max-width: 1150px;
  }
}
</style>