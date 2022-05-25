<template>
  <router-link
    class="label-item context-hover"
    v-for="(value, index) in label_items"
    :to="'/label/#group_' + value[0]"
    :key="index"
    @click="scrollToSection('group_' + value[0])"
    >{{ value[0] + " (" + value[1].length + ") " }}</router-link
  >
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from "vue";
import { articles, labels, topics, articlesGroupByLabel } from "@/Global";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "SideBarLabelView",
  methods: {
    scrollToSection(id: string) {
      let section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },

  setup() {
    const router = useRouter();
    const article_name = router.currentRoute.value.params.id;

    const label_items = computed(() => {
      return articlesGroupByLabel.value;
    });

    return {
      article_name,
      articles,
      labels,
      topics,
      label_items,
    };
  },
});
</script>


<style scoped>
.label-item {
  white-space: nowrap !important;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
  background-color: #eaeaea;
  border-radius: 15px;
  line-height: 30px;
  margin: 5px;
  padding: 0 7px;
  font-size: 15px;
  display: inline-block;
}
</style>
