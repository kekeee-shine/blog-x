<template>
  <div v-html="article_context"></div>
</template>


<script lang="ts">
import axios from 'axios'
import { bucket_url, articles, article_context, current_topic } from "@/Global";
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const article_name = router.currentRoute.value.params.id

    const article_url = bucket_url + "html/" + article_name + ".html";

    if (article_name && article_name.length > 0) {
      axios.get(article_url)
        .then(function (response) {
          article_context.value = response.data;

          for (let i = 0; i < articles.value.length; i++) {
            let _article: any = articles.value[i];
            let _topic_name;
            if (_article['name'] == article_name) {
              _topic_name = _article['topic'];
              current_topic.value = _topic_name;
              // reverse()
              break;
            }

          }
        })
        .catch(function () {
          article_context.value = "loading failed";
        });
    }

    return {
      article_context,
    };


  }
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