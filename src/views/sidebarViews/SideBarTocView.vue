<template>
  <div class="sidebar-toc">
    <strong>{{ current_topic }}</strong>
    <ul>
      <li v-for="article in current_topic_articles" :key="article">
        <router-link class="context-hover" :class="article['name'] == article_name ? 'sidebar-toc-active' : ''"
          :to="'/article/' + article['name']">
          <span>{{
              article["title"].length > 0 ? article["title"] : "No Name"
          }}</span>
        </router-link>
        <ol v-if="article['name'] == article_name">
          <li v-for="heading_item in current_article_headings" :key="heading_item">
            <router-link class="context-hover" :to="'#' + heading_item" @click="scrollToSection(heading_item)">
              <span>{{ heading_item }}</span>
            </router-link>
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import {
  articlesGroupByTopic,
  current_article_headings,
  current_topic,
  current_topic_articles,
} from "@/Global";

import { useRouter } from "vue-router";
import MinxinModule from '@/Mixin.vue'

export default defineComponent({
  name: "SideBarTocView",

  mixins: [MinxinModule
  ],

  methods: {
    scrollToSection(id: string) {
      let section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  },

  setup() {
    const router = useRouter();
    const article_name = computed(() => {
      return router.currentRoute.value.params.id;
    });
    const route_path = router.currentRoute.value.path;

    //todo 此处geektutu设计多很巧妙 必须在.gkt-sidebar-wrapper上有一个额外多section 在scroll 的时候才会完美平滑
    // onMounted(() => {
    //   window.addEventListener("scroll", () => {
    //     let ele: any = document.querySelector(".sidebar-toc");
    //     // if(!ele) return;
    //     var wrapper = document.querySelector(".gkt-sidebar-wrapper");
    //     var last = 0;
    //     // ele.style.maxHeight = ((window.innerHeight || 798) - 200) + 'px'

    //     if (ele && wrapper) {
    //       var scrollTop =
    //         document.documentElement.scrollTop || document.body.scrollTop;
    //       var isDown = scrollTop > last;

    //       var x = 0,
    //         y = 0;
    //       while (ele) {
    //         x += ele.offsetLeft - ele.scrollLeft + ele.clientLeft;
    //         y += ele.offsetTop - ele.scrollTop + ele.clientTop;
    //         ele = ele.offsetParent;
    //       }

    //       var pos = y - scrollTop;
    //       var downLimit = 50;
    //       var upLimit = -100;
    //       // uarrow.style.marginTop = scrollTop + 'px';
    //               console.log('======')
    //       console.log(scrollTop)
    //       console.log(pos)
    //       isDown &&
    //         pos <= downLimit &&
    //         wrapper.classList.add("gkt-sidebar-fixed");
    //       !isDown &&
    //         pos > upLimit &&
    //         wrapper.classList.remove("gkt-sidebar-fixed");
    //       last = scrollTop;
    //     }

    //     // let scrollTop =
    //     //   document.documentElement.scrollTop ||
    //     //   window.pageYOffset ||
    //     //   document.body.scrollTop;
    //     // if (scrollTop > 60) {
    //     //   // 1
    //     // } else {
    //     //   // 2
    //     // }
    //   });
    // });

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

.sidebar-toc ul>a {
  font-size: 16px;
}

.sidebar-toc ul ol>a {
  font-size: 14px;
}

.sidebar-toc ul,
.sidebar-toc ol {
  padding-left: 1.5em;
}

.sidebar-toc ul ol {
  list-style-type: circle;
}

.sidebar-toc-active {
  font-weight: bold;
  font-size: 14px !important;
  color: #2b97ef !important;
}
</style>

function getPosition(ele: any) {
  throw new Error("Function not implemented.");
}

function aaa(): (this: Document, ev: Event) => any {
  throw new Error("Function not implemented.");
}
