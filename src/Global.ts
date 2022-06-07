import { ref } from "vue";
import axios from 'axios'


const labels = ref([]);
const topics = ref([]);
const articles = ref([]);
const articles_group_by_time = ref()
const articles_group_by_topic = ref()
const articles_group_by_label = ref()

const articles_load_time = ref(0)
const bucket_url = 'https://blog-resource-1257103956.cos.ap-nanjing.myqcloud.com/'

const current_article_context = ref()
const current_article_name = ref('')
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
        articles_group_by_label.value = label_map

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
        articles_group_by_topic.value = topic_map


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
        articles_group_by_time.value = time_map

        articles_load_time.value = new Date().getTime()
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
    bucket_url + "data/topics.json"
)
    .then(function (response) {
        topics.value = response.data;
    })
    .catch(function (error) {
        console.log(error);
    });

import { watch } from "vue";

watch(current_topic, (value) => {
    current_topic_articles.value = articles_group_by_topic.value.get(value);
    console.log(1111)
})

watch(current_article_name, (value) => {
    for (let i = 0; i < articles.value.length; i++) {
        const _article = articles.value[i];
        let _topic_name;
        if (_article["name"] == value) {
            _topic_name = _article["topic"];
            current_topic.value = _topic_name;
            // reverse()
            break;
        }
    }
})
watch(current_article_context, (value) => {
    const title_reg = '<(.+?)>';
    const title_tag = value.match(title_reg)[1];
    let heading_tag;
    if (title_tag == 'h2') {
        heading_tag = 'h3';
    } else {
        heading_tag = 'h2';
    }

    const res = value.matchAll('<' + heading_tag + '(.+?)</' + heading_tag + '>');

    // res = Array.from(res) // iterator -> array

    const _headings = []
    for (const iterator of res) {
        const _value = iterator[1];
        _headings.push(_value.slice(_value.indexOf('>') + 1));
    }
    current_article_headings.value = _headings;
})


export {
    bucket_url,

    articles,
    labels,
    topics,
    articles_group_by_time,
    articles_group_by_topic,
    articles_group_by_label,

    articles_load_time,

    current_article_context,

    current_article_headings,
    current_article_name,
    current_topic,
    current_topic_articles,
}