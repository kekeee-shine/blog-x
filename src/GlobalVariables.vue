
<script>
const HOME = "https://www.yangshuaionline.com/";
//保存全局状态
import  { Vue,ref } from "vue";
import axios from 'axios'

export default {
  setup() {
    const labels = ref([]);
    const topics = ref([]);
    const articles = ref([]);
    axios
      .get(
        "https://blog-resource-1257103956.cos.ap-nanjing.myqcloud.com/data/articles.json"
      )
      .then(function (response) {
        articles.value = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(
        "https://blog-resource-1257103956.cos.ap-nanjing.myqcloud.com/data/labels.json"
      )
      .then(function (response) {
        labels.value = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(
        "https://blog-resource-1257103956.cos.ap-nanjing.myqcloud.com/data/topics.json"
      )
      .then(function (response) {
        topics.value = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    return{
      articles,
      labels,
      topics,
    }
  },
};
</script>