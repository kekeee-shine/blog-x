
import { ref } from "vue";
import axios from 'axios'


const labels = ref([]);
const topics = ref([]);
const articles = ref([]);
const articlesGroupByTime = ref()
const articlesGroupByTopic = ref()
const articlesGroupByLabel = ref()
const bucket_url = 'https://blog-resource-1257103956.cos.ap-nanjing.myqcloud.com/'

const article_context = ref()

const current_article_headings = ref()
const current_topic = ref();
const current_topic_articles = ref()
axios
    .get(
        bucket_url + "data/articles.json"
    )
    .then(function (response) {
        articles.value = response.data;
        const articles_values = articles.value

        const label_map: Map<string, []> = new Map();
        for (let i = 0; i < articles_values.length; i++) {
            const article = articles_values[i]
            const cur_labels: any = article['labels']
            for (let j = 0; j < cur_labels.length; j++) {
                const cur_label = cur_labels[j]
                if (label_map.has(cur_label)) {
                    label_map.get(cur_label)?.push(article)
                } else {
                    label_map.set(cur_label, [])
                    label_map.get(cur_label)?.push(article)
                }
            }
        }
        articlesGroupByLabel.value = label_map

        const topic_map: Map<string, []> = new Map();
        for (let i = 0; i < articles_values.length; i++) {
            const article = articles_values[i]
            const cur_topic: any = article['topic']
            if (topic_map.has(cur_topic)) {
                topic_map.get(cur_topic)?.push(article)
            } else {
                topic_map.set(cur_topic, [])
                topic_map.get(cur_topic)?.push(article)
            }
        }
        articlesGroupByTopic.value = topic_map


        const time_map: Map<string, []> = new Map();
        
        //按照时间排序 需要reverse 一次
        const reverse_articles_values = articles_values.reverse()
        for (let i = 0; i < reverse_articles_values.length; i++) {
            const article = reverse_articles_values[i]
            const create_time: string = article['create_time']
            const create_year = create_time.substring(0, 4)
            if (time_map.has(create_year)) {
                time_map.get(create_year)?.push(article)
            } else {
                time_map.set(create_year, [])
                time_map.get(create_year)?.push(article)
            }
        }
        articlesGroupByTime.value = time_map

    })
    .catch(function (error) {
        console.log(error);
    });

axios.get(
    bucket_url + "data/labels.json"
)
    .then(function (response) {
        labels.value = response.data;
    })
    .catch(function (error) {
        console.log(error);
    });

axios.get(
    bucket_url+"data/topics.json"
)
    .then(function (response) {
        topics.value = response.data;
    })
    .catch(function (error) {
        console.log(error);
    });

import { watch } from "vue";

watch(current_topic,(value)=>{

    current_topic_articles.value = articlesGroupByTopic.value.get(current_topic.value);
    console.log(1111)
})
export {
    bucket_url,

    articles,
    labels,
    topics,
    articlesGroupByTime,
    articlesGroupByTopic,
    articlesGroupByLabel,

    article_context,    

    current_article_headings,
    current_topic,
    current_topic_articles,
}