<template>
  <a-layout :class="['layout', device]">
    <!-- layout header -->
    <global-header />
    <!-- layout content -->
    <a-layout-content
      style="{ margin: '24px 24px 0', paddingTop: fixedHeader ? '40px' : '0' }"
    >
      <main-page />
      {{ aaa }}
    </a-layout-content>

    <!-- layout footer -->
    <global-footer />
  </a-layout>
</template>

<script >
import {
  defineComponent,
  ref,
  computed,
  watch,
  created,
  onMounted,
  nextTick,
} from "vue";
import GlobalHeader from "@/components/GlobalHeader/index.vue";
import GlobalFooter from "@/components/GlobalFooter/index.vue";
import MainPage from "@/components/MainPage/index.vue";
export default defineComponent({
  name: "BasicLayout",
  components: {
    GlobalHeader,
    MainPage,
    GlobalFooter,
  },
  setup() {
    const aaa = "aaaabbbbccc";
    const bbb = "bbbbccccddd";
    const labels = ref();
    return {
      labels,
      aaa,
      bbb,
    }
  }
});
</script>

<style>
@media (max-width: 767px) {
  .hidden-xs {
    display: none !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .hidden-sm {
    display: none !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .hidden-md {
    display: none !important;
  }
}
@media (min-width: 1200px) {
  .hidden-lg {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .main-container {
    padding-top: 0px;
  }
}
@media (min-width: 768px) {
  .header-container,
  .main-container {
    width: 750px;
  }
  .post-container {
    padding: 10px 30px !important;
  }
  .post-container article {
    padding: 0 !important;
  }
  .post-list {
    margin-left: 30px;
  }
}
@media (min-width: 992px) {
  .header-container,
  .main-container {
    width: 990px;
  }
  .post-container {
    width: calc(100% - 320px);
  }
}
@media (min-width: 1200px) {
  .header-container,
  .main-container {
    width: 100%;
    max-width: 1150px;
  }
}

.text-center {
  text-align: center !important;
}
.text-left {
  text-align: left !important;
}
.text-right {
  text-align: right !important;
}
.float-left {
  float: left !important;
}
.float-right {
  float: right !important;
}

.text-inline {
  white-space: nowrap !important;
}
.a-hover:hover {
  color: #ffffff !important;
}

.no-margin {
  margin: 0 !important;
}
.no-padding {
  padding: 0 !important;
}

/* a标签去除下划线等 */
a {
  text-decoration: none;
}

/* ul 去除列表格式 */
ul {
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
.nav,
.header .footer {
  font-family: "Lato", sans-serif;
}

/* html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
} */
.header-container,
.main-container {
  margin-right: auto;
  margin-left: auto;
  /* padding-top: 20px;
  padding-bottom: 30px; */
  overflow: hidden;
}
</style>
