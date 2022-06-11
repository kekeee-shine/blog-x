<template>
  <header class="header">
    <div class="header-container">
      <nav id="kk-header-nav" class="text-right">
        <a class="float-left" href="">
          <img
            class="float-left"
            style="width: 40px; height: 40px; margin: 8px 0px 4px 0px"
            src="icon/Teach.png"
            alt=""
          />
          <!-- <span>Kekeee</span> -->
        </a>
        <ul class="float-right">
          <li class="float-left" v-for="nav in navs" :key="nav">
            <router-link class="nav-hover" :to="nav.path">{{
              nav.name
            }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="header-container hidden-xs">
      <nav id="kk-category-nav" class="text-right">
        <ul class="float-left">
          <li
            class="float-left"
            v-for="category in categories"
            :key="category"
            @mouseover="category.show = !category.show"
            @mouseout="category.show = !category.show"
          >
            <a class="nav-hover">{{ category.name }} ▾</a>
            <ul class="sub-category-ul" v-show="category.show">
              <li
                v-for="subCategory in category.subCategory"
                class="sub-category-li"
                :key="subCategory"
              >
                <router-link
                  class="sub-category-item text-left"
                  :to="subCategory.path"
                  >{{ subCategory.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "GlobalHeader",
  comments: {},

  setup() {
    const navs = [
      { name: "专题", path: "/topic" },
      { name: "归档", path: "/archive" },
      { name: "感谢", path: "/article/thanks" },
      { name: "待定", path: "/" },
      { name: "待定", path: "/" },
    ];

    const categories = ref([
      // {
      //   name: "SuperCar",
      //   show: false,
      //   subCategory: [
      //     // { name: "法拉利LaFerrari", path: "" },
      //     // { name: "兰博基尼Reventon", path: "" },
      //     // { name: "迈凯轮P1", path: "" },
      //     // { name: "布加迪威龙", path: "" },
      //     // { name: "帕加尼Zonda", path: "" },
      //     // { name: "柯尼塞格Agera", path: "" },
      //     // { name: "保时捷918 Spyder", path: "" },
      //   ],
      // },
      {
        name: "JDM",
        show: false,
        subCategory: [
          // { name: "日产GT-R", path: "" },
          // { name: "丰田Supra", path: "" },
          // { name: "雷克萨斯RCF", path: "" },
          // { name: "讴歌NSX", path: "" },
          // { name: "RX-7", path: "" },
          // { name: "EVO", path: "" },
        ],
      },
    ]);
    return {
      navs,
      categories,
    };
  },
});
</script>

<style lang="less">
#kk-header-nav li {
  float: left;
  padding: 10px 0px;
  margin-bottom: 0;
}

#kk-header-nav > ul > li {
  display: inline-block;
}

#kk-header-nav ul {
  list-style: none;
}

#kk-header-nav a {
  padding: 0 10px;
  font-size: 18px;
  color: #b2bbbd;
  fill: #b2bbbd;
  font-weight: 600;
}

#kk-category-nav a {
  display: block;
  padding: 0px 10px;
  height: 44px;
  line-height: 44px;
  color: #b2bbbd;
  fill: #b2bbbd;
}

#kk-category-nav ul a {
  font-weight: 600;
}

#kk-category-nav ul ul a {
  font-weight: 500;
}
.sub-category-ul {
  /*
  * 当position属性值设置为absolute时，则开启了元素的绝对定位
  * 
  * 绝对定位：
  *     1.开启绝对定位，会使元素脱离文档流
  *     2.开启绝对定位以后，如果不设置偏移量，则元素的位置不会发生变化
  *     3.绝对定位是相对于离他最近的开启了定位的祖先元素进行定位的（一般情况，开启了子元素的绝对定位都会同时开启父元素的相对定位）
  *         如果所有的祖先元素都没有开启定位，则会相对于浏览器窗口进行定位
  *     4.绝对定位会使元素提升一个层级
  *     5.绝对定位会改变元素的性质，
  *         内联元素变成块元素，
  *         块元素的宽度和高度默认都被内容撑开
  */
  position: absolute;
  background: #fafafa;
  min-width: 200px;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.sub-category-li {
  border: 1px;
  list-style: none;
  padding: 0px !important;
  line-height: 30px;
  height: 44px;
}

// 子分栏
.sub-category-item {
  color: #48535c !important;
}

// 子分栏hover
.sub-category-item:hover {
  display: block;
  color: #fafafa !important;
  background-color: rgba(62, 71, 79, 0.8);
}

.header {
  background: #223344;
  padding: 0px;
  z-index: 9999;
  width: 100%;
  position: fixed;

  // a {
  //   color: #b2bbbd;
  //   font-size: 18px;
  //   font-weight: 600;
  // }

  ul {
    margin: 0 !important;
    padding: 0 !important;
  }
}

.header-container {
  max-height: 44px;
}
.header {
  * {
    z-index: 9999;
  }
}
</style>