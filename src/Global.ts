
import {ref} from "vue";
import axios from 'axios'


const labels = ref([]);
const topics = ref([]);
const articles = ref([]);
const articlesGroupByTime =ref()
const articlesGroupByTopic =ref()
const articlesGroupByLabel =ref()


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

import { watch} from "vue";    

// 我们认为articles就是按时间顺序排的
watch(articles, (values) => {
    // let values =ref_values.values
    const label_map:Map<string,[]> = new Map();
    for (let i = 0; i < values.length; i++) {
        const article = values[i]
        const cur_labels:any = article['labels']
        for(let j=0;j<cur_labels.length;j++){
            const cur_label=cur_labels[j]
            if (label_map.has(cur_label)){
                label_map.get(cur_label)?.push(article)
            }else{
                label_map.set(cur_label,[])
                label_map.get(cur_label)?.push(article)
            }
        }
    }
    articlesGroupByLabel.value=label_map
})

watch(articles, (values) => {
    // let values =ref_values.values
    const topic_map:Map<string,[]> = new Map();
    for (let i = 0; i < values.length; i++) {
        const article = values[i]
        const cur_topic:any = article['topic']
        if (topic_map.has(cur_topic)){
            topic_map.get(cur_topic)?.push(article)
        }else{
            topic_map.set(cur_topic,[])
            topic_map.get(cur_topic)?.push(article)
        }
    }
    articlesGroupByTopic.value=topic_map
})

watch(articles, (values) => {
    // let values =ref_values.values
    const time_map:Map<string,[]> = new Map();
    for (let i = 0; i < values.length; i++) {
        const article = values[i]
        const create_time:string = article['create_time']
        const create_year = create_time.substring(0,4)
        if (time_map.has(create_year)){
            time_map.get(create_year)?.push(article)
        }else{
            time_map.set(create_year,[])
            time_map.get(create_year)?.push(article)
        }
    }
    articlesGroupByTime.value=time_map
})


export {
    articles,
    labels,
    topics,
    articlesGroupByTime,
    articlesGroupByTopic,
    articlesGroupByLabel
}