<template>
  <div class="sidebar-toc">
    <strong>{{ current_topic }}</strong>
    <ul>
      <li v-for="article in current_topic_articles" :key="article">
        <router-link class="context-hover" :to="'/article/' + article['name']">
          <span>{{ article['title'].length > 0 ? article['title'] : 'No Name' }}</span>
        </router-link>
        <ol v-if="article['name'] == article_name">
          <li v-for="heading_item in current_article_headings" :key="heading_item">
            <router-link class="context-hover" :to="'#' + heading_item"     @click="scrollToSection(heading_item)">
              <span>{{ heading_item }}</span>
            </router-link>

          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { articles, articlesGroupByTopic, article_context, current_article_headings, current_topic, current_topic_articles } from "@/Global";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "SideBarTocView",

    methods: {
    scrollToSection(id: string) {
      let section = document.getElementById(id);
      if (section) {
        section.scrollIntoView();
      }
    },
  },

  setup() {
    const router = useRouter();
    const article_name = router.currentRoute.value.params.id;
    const route_path = router.currentRoute.value.path;

    //todo 移动到其他地方
    //todo heading加载可以考虑改成document.querySelectorAll()

    
    watch(article_context, (value) => {
      let title_reg = '<(.+?)>';
      let title_tag = value.match(title_reg)[1];
      let heading_tag;
      if (title_tag == 'h2') {
        heading_tag = 'h3'
      } else if (title_tag == 'h3') {
        heading_tag = 'h4'
      } else {
        heading_tag = 'h2'
      }

      heading_tag = 'h3'
      let res = value.matchAll('<' + heading_tag + '(.+?)</' + heading_tag + '>');

      // res = Array.from(res) // iterator -> array

      let _headings = []
      for (const iterator of res) {
        let _value = iterator[1]
        _headings.push(_value.slice(_value.indexOf('>') + 1))
      }
      current_article_headings.value = _headings
    })
    return {
      current_article_headings,
      current_topic,
      current_topic_articles,
      article_name,
      articlesGroupByTopic,
    };
  },
});
</script>


<style scoped>
.sidebar-toc {
  line-height: 1.8em;
}

.sidebar-toc ul {
  list-style-type: square;
}

.sidebar-toc a {
  font-size: 16px;
}

.sidebar-toc ul,
.sidebar-toc ol {
  padding-left: 1.5em;
}

.sidebar-toc ul ol {
  list-style-type: circle;
}
</style>
