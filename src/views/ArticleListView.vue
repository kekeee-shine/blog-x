<template>
  <div class="post-list">
    <ul>
      <li
        v-for="item in items"
        :key="item"
        :class="
          item.is_group
            ? 'group-item group-color-' + (item['color_index'] % 5)
            : 'article-item'
        "
      >
      <!-- <div >

      </div > -->

              <router-link
          :class="item.is_group ? 'context-hover' : 'context-hover'"
          :id="item.is_group ? 'group_' + item.title : ''"
          :to="item.path"
          >{{ item.title }}
        </router-link>

        <span class="float-right hidden-xs" v-if="!item.is_group">{{item.date}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
  articles_group_by_time,
  articles_group_by_topic,
  articles_group_by_label,
  articles_load_time,
} from "@/global";

export default defineComponent({
  name: "ArticleListView",
  setup() {
    const router = useRouter();
    const route_path = router.currentRoute.value.path;
    const items = ref();

    const f = function () {
      let group_map = new Map();
      let group_kind;
      if (
        route_path.startsWith("/archive") ||
        route_path == "/" ||
        route_path == ""
      ) {
        group_kind = "archive";
        group_map = articles_group_by_time.value;
      } else if (route_path.startsWith("/label")) {
        group_kind = "label";

        group_map = articles_group_by_label.value;
      } else if (route_path.startsWith("/topic")) {
        group_kind = "topic";
        group_map = articles_group_by_topic.value;
      } else {
        console.log("error list conditions");
      }

      let _items = [];
      if (group_map) {
        let _color_index = 0;
        for (let [group_key, group_value] of group_map.entries()) {
          console.log("entries2", group_key, group_key);
          _items.push({
            title: group_key,
            path: "/" + group_kind + "/#group_" + group_key,
            is_group: true,
            color_index: _color_index,
          });
          for (let i = 0; i < group_value.length; i++) {
            let article = group_value[i];
            _items.push({
              title:
                article["title"].length > 0
                  ? article["title"]
                  : "No Name",
              path: "/article/" + article["name"],
              date: article["create_time"].substring(0,10).replace('-',' '),
              is_group: false,
            });
          }

          _color_index++;
        }
        items.value = _items;
      }
    };

    f();
    
    watch(articles_load_time, () => {
      // let group_kind;
      f();
    });

    return {
      items,
    };
  },
});
</script>


<style lang="less" scoped>
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
  font-size: 16px;
  color: #333333;
}

.post-list {
  line-height: 2.8em;
  border-left: 4px solid #f6f6f6;
}

.group-color-0:before {
  background: #1abc9c !important;
}
.group-color-1:before {
  background: #3498db !important;
}
.group-color-2:before {
  background: #9b59b6 !important;
}
.group-color-3:before {
  background: #e67e22 !important;
}
.group-color-4:before {
  background: #880000 !important;
}
</style>