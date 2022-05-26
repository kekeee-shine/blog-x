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
      let local_storage_data = storage.get_article(article_name);
      if (local_storage_data) {
        current_article_context.value = local_storage_data;
      } else {
        axios
          .get(article_url)
          .then(function (response) {
            current_article_context.value = response.data;
            storage.set_article(article_name, response.data, 1);
          })
          .catch(function () {
            current_article_context.value = "loading failed";
          });
      }
    }

    onMounted(() => {
      //渲染完毕之后执行，这样才能找到动态加载多博文内容。
      nextTick(() => {
        var container: any = document.querySelector('#click-img-container')
        var targetImg: any = container.querySelector('img')
        var imgs = document.querySelectorAll('.markdown-body img');

        targetImg.addEventListener('click', function (e: any) {
          container.style.display = 'none';
          e && e.stopPropagation && e.stopPropagation();
        }, false);

        for (var i = 0; i < imgs.length; ++i) {
          var img: any = imgs[i];
          img.addEventListener('click', (function (src, rate) {
            return function (e: any) {
              e && e.stopPropagation && e.stopPropagation();
              if (window.innerWidth < 980) {
                return
              }
              targetImg.style.height = targetImg.style.width = 'auto';
              if (window.innerWidth / window.innerHeight > rate) {
                targetImg.style.height = (window.innerHeight - 20) + 'px';
              } else {
                targetImg.style.width = (window.innerWidth - 20) + 'px';
              }
              container.style.height = window.innerHeight + 'px'
              container.style.lineHeight = window.innerHeight + 'px'
              container.style.display = 'block';
              targetImg.src = src;
            };
          }(img.src, img.width / img.height)), false)
        }
      });
    }),

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