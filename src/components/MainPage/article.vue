<template>
  <div v-html="article_html"></div>
</template>
<style>
</style>
<script>
import { onMounted, watch, ref,toRefs } from "vue";
import axios from 'axios'

export default {
  name: "ArticleHtml",
    props: {
    article_url: String
  },
  setup(props) {
    var article_url = toRefs(props).article_url.value
    const article_html = ref("");

    onMounted(() => {
      if (article_url && article_url.length > 0) {
        axios.get(article_url)
        .then(function (response) {
            article_html.value = response.data;
        })
        .catch(function (error) {
            article_html.value = "加载失败";
        });
      }
    });
    return {
      props,
      article_html,
    };
  }
};
</script>