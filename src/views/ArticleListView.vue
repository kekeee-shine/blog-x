<template>
  <div class="article-list">
    <ul class="float-left">
      <li
        v-for="li_item in lllarticlesGroupByLabel"
        :key="li_item"
        :class="li_item.is_group ? 'category-group' : ''"
      >
        <router-link
          :class="li_item.is_group ? '' : 'context-hover'"
          :id="li_item.is_group ? 'group_' + li_item.name : ''"
          :to="
            li_item.is_group
              ? '/label/#group' + li_item.name
              : '/article/' + li_item.name
          "
          >{{ li_item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch,computed} from "vue";
import { useRouter } from 'vue-router'
import {labels, articlesGroupByTime, articlesGroupByTopic,articlesGroupByLabel ,lllarticlesGroupByLabel} from "@/Global";

export default defineComponent({
  name: "ArticleListView",
  setup() {

    const router = useRouter()

    const route_path = router.currentRoute.value.path
    
//     const li_items =computed(() => {
//       let _li_items =[]
//       for (let i = 0; i < labels.value.length; i++) {
//           const group_name = articlesGroupByLabel.value[i][0]
//           _li_items.push({ title: group_name, name: '/group_'+group_name, is_group: true })

//           const group_items = articlesGroupByLabel.value[i][1]
//           for(let j=0;j<group_items.length;j++){
//             const item= group_items[j]
//               _li_items.push({ title: item['title'], name: '/article/'+item['name'] })
//           }
//       }
//       return _li_items
// })

    
    if (route_path.startsWith('/archive')){
        console.log(1)
      const label_items =computed(() => {
      return articlesGroupByLabel.value
    })
    }else if (route_path.startsWith('/label')){
        console.log(1)

    }else if (route_path.startsWith('/topic)')){
        console.log(1)

    }else{
        console.log(1)

    }


    const categories = ref([
      { name: "group1", path: "/12", is_group: true },
      { name: "account_vending_machine", path: "/11" },
      { name: "小芬兰1-2", path: "/12" },
      { name: "group2", path: "/12", is_group: true },
      { name: "小芬兰2-1", path: "/22" },
      { name: "小芬兰2-1", path: "/22" },
      { name: "小芬兰2-3", path: "/22" },
            { name: "group3", path: "/12", is_group: true },
      { name: "小芬兰2-1", path: "/22" },
      { name: "小芬兰2-1", path: "/22" },
      { name: "小芬兰2-3", path: "/22" },
            { name: "group4", path: "/12", is_group: true },
      { name: "小芬兰2-1", path: "/22" },
      { name: "小芬兰2-1", path: "/22" },
      { name: "小芬兰2-3", path: "/22" },
            { name: "group5", path: "/12", is_group: true },
      { name: "小芬兰2-1", path: "/22" },
      { name: "小芬兰2-1", path: "/22" },
      { name: "小芬兰2-3", path: "/22" },
            { name: "group6", path: "/12", is_group: true },
      { name: "小芬兰2-1", path: "/22" },
      { name: "小芬兰2-1", path: "/22" },
      { name: "小芬兰2-3", path: "/22" },

    ]);
    return {
      lllarticlesGroupByLabel,
      categories,
    };
  },
});
</script>


<style scoped>
.category-group a {
  color: #333;
}

.category-group a {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}
.article-list {
  line-height: 2.8em;
  border-left: 4px solid #6c2e2e;
}
</style>