<template>
  <div v-html="article_html"></div>
</template>
<style>
</style>

<script>
import { computed,onMounted, watch, ref, toRefs } from "vue";
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
  name: "ArticleDetailView",
  setup() {
    const router = useRouter()
    // const article_name = computed(() => {
    //   return router.currentRoute.value.params.id
    // })
    const article_name = router.currentRoute.value.params.id

    // const router = useRouter()
    const article_url = "https://blog-resource-1257103956.cos.ap-nanjing.myqcloud.com/html/" + article_name + ".html";
    
    const article_html=ref("")
    if (article_name && article_name.length > 0) {
      axios.get(article_url)
        .then(function (response) {
              article_html.value =  response.data;
        })
        .catch(function (error) {
          article_html.value =   "loading failed";
        });
    }

    return {
      article_html,
    };


  }
};
</script>