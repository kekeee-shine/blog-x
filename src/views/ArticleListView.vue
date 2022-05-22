<template>
  <div class="post-list">
    <ul>
      <li v-for="li_item in li_items" :key="li_item" :class="li_item.is_group ? 'group-item' : 'article-item'">
        <router-link :class="li_item.is_group ? 'context-hover' : 'context-hover'"
          :id="li_item.is_group ? 'group_' + li_item.title : ''" :to="li_item.path">{{ li_item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useRouter } from 'vue-router'
import { articlesGroupByTime, articlesGroupByTopic, articlesGroupByLabel } from "@/Global";

export default defineComponent({
  name: "ArticleListView",
  setup() {

    const router = useRouter()
    const route_path = router.currentRoute.value.path
    const li_items = ref()

    let group_kind
    let group_map = []
    if (route_path.startsWith('/archive')) {
      group_kind = 'archive'
      group_map = articlesGroupByTime.value;
    } else if (route_path.startsWith('/label')) {
      group_kind = 'label'
      group_map = articlesGroupByLabel.value
    } else if (route_path.startsWith('/topic')) {
      group_kind = 'topic'
      group_map = articlesGroupByTopic.value
    } else {
      console.log('error list conditions')
    }

    let _li_items = [] as any

    for (let [group_key, group_value] of group_map.entries()) {
      console.log("entries2", group_key, group_key);
      _li_items.push({ title: group_key, path: '/' + group_kind + '/#group_' + group_key, is_group: true })
      for (let i = 0; i < group_value.length; i++) {
        let article = group_value[i]
        _li_items.push({ title: article['title'].length > 0 ? article['title']+article['create_time']: 'No Name'+article['create_time'], path: '/article/' + article['name'], is_group: false })
      }
    }
    li_items.value = _li_items
    return {
      li_items,
    };
  },
});
</script>


<style >
@media (min-width: 1200px) {
  .main-container {
    width: 1000px !important;
  }
}

.group-item a {
  color: #333;
  font-size: 24px;
  font-weight: bolder;
}

.article-item a {
  font-size: 20px;
  color: #2c3e50;

}

.post-list {
  line-height: 2.8em;
  border-left: 4px solid #eaeaea;
}
</style>