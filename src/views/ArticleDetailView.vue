<template>
  <div v-html="article_html"></div>
</template>


<script>
import { computed,onMounted, watch, ref, toRefs } from "vue";
import axios from 'axios'
import {bucket_url } from "@/Global";

import { useRouter } from 'vue-router'
    const router = useRouter()
export default {
  setup() {
    const router = useRouter()

    const article_name = router.currentRoute.value.params.id

    const article_url = bucket_url+"html/" + article_name + ".html";
    
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


<style scoped>
</style>