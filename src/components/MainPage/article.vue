<template>
  <div v-html="article_html"></div>
</template>
<style>
</style>

<script>
import { computed,onMounted, watch, ref, toRefs } from "vue";
import axios from 'axios'
import { useRouter } from 'vue-router'
    const router = useRouter()
export default {
  name: "ArticleHtml",
  setup() {
    const router = useRouter()
    // const article_name = computed(() => {
    //   return props.article_name
    // })
    const article_name = computed(() => {
      return router.currentRoute.value.params.id
    })
    const article_html = ref("")
    // const router = useRouter()
    const article_url = "https://blog-resource-1257103956.cos.ap-nanjing.myqcloud.com/html/" + article_name.value + ".html";
    onMounted(() => {
      if (article_name.value && article_name.value.length > 0) {
        axios.get(article_url)
          .then(function (response) {
            article_html.value = response.data;
          })
          .catch(function (error) {
            article_html.value = "加载失败";
          });
      }
    });

    // watch(article_name, (article_name) => {
    //   if (article_name && article_name.length > 0) {
    //     axios.get(article_url)
    //       .then(function (response) {
    //         article_html.value = response.data;
    //       })
    //       .catch(function (error) {
    //         article_html.value = "加载失败";
    //       });
    //   }
    // });

    return {
      article_html,
    };


  }
};
</script>