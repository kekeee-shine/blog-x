<template>
  <a-layout :class="['layout', device]">
    <!-- layout header -->
    <global-header />
    <div class="gkt-header-placeholder" style="height: 44px"></div>
    <div class="gkt-header-placeholder hidden-xs" style="height: 44px"></div>
    <!-- layout content -->
    <!-- <a-layout-content
      style="{ margin: '24px 24px 0', paddingTop: fixedHeader ? '40px' : '0' }"
    >
      <main-page />
    </a-layout-content> -->

    <!-- <a-layout-content
      style="{ margin: '24px 24px 0', paddingTop: fixedHeader ? '40px' : '0' }"
    > -->
    <div class="main-container">
      <main-page class="col-xs-12 padding-0" />
    </div>

    <img
      id="go-top"
      src="icon/top.png"
      class="hidden-xs"
      onclick="javascript:window.scroll(0, 0)"
    />


  <div id="click-img-container" onclick="image_close_click(this)">
      <img src="" alt="Big Image">
  </div>

    <!-- layout footer -->
    <global-footer />
  </a-layout>
</template>

<script >
import { defineComponent, ref } from "vue";
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
    };
  },
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


@media (min-width: 1200px) {
  .header-container{
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
.nav-hover:hover {
  color: #ffffff !important;
}

.context-hover {
  color: #333333 !important;
}

.context-hover:hover {
  text-decoration: none !important;
  color: #2b97ef !important;
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
    min-width: 414px;
  margin-right: auto;
  margin-left: auto;
  /* padding-top: 20px;
  padding-bottom: 30px; */
  overflow: hidden;
}


/* .main-container {
  min-width: 414px;
} */

.gkt-sidebar-fixed {
  position: fixed;
  top: 50px;
  margin-top: 0;
  z-index: 1;
}

img#go-top {
  display: none;
  right: 182.714px;
  position: fixed;
  bottom: 100px;
  width: 50px;
  cursor: pointer;
  z-index: 9999;
}
</style>
