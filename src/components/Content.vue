<template>
	<div class="container-fluid">
    <input type="text"  v-model="search" class="form-control" placeholder="Search">
		<div class="row fh5co-post-entry">
			<article v-for="newsItem in news" :key="newsItem.title" class="col-lg-3 col-md-3 col-sm-3 col-xs-6 col-xxs-12">
				<figure>
					<a target="_blank" :href="newsItem.url"><img :src="newsItem.urlToImage" alt="Image" class="img-responsive"></a>
				</figure>
				<span class="fh5co-meta"><a target="_blank" :href="newsItem.url">{{ newsItem.source.name }}</a></span>
				<h2 class="fh5co-article-title"><a target="_blank" :href="newsItem.url">{{ newsItem.title }}</a></h2>
			</article>

			<div class="clearfix visible-xs-block"></div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Content',
  props: {
    msg: String,
    newsId: String,
  },
  data () {
    return {
    news: null,
    search: "",
    }
  },
  created () {
    axios.get('https://newsapi.org/v2/top-headlines?country=tr&apiKey=8765177e98ba4f35a687b946d5112c3a')
      .then(response => {
            this.news = response.data.articles
            console.log(response);
         })
  },
  methods: {
	getData: function (val) {
	axios.get('https://newsapi.org/v2/top-headlines?apiKey=8765177e98ba4f35a687b946d5112c3a&sources='+val)
     .then(response => {
            this.news = response.data.articles
            console.log(response);
         })
  },
  handleClick: function(){
    axios
      .get('https://newsapi.org/v2/top-headlines?apiKey=8765177e98ba4f35a687b946d5112c3a&q='+this.search )
      .then(response => {
			this.news = response.data.articles;
            console.log(response);
         })
    },
   },
 watch: {
    newsId: function (val) {
    this.getData(val);
    },
    search: function (val) {
    this.handleClick(val);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '/assets/styles/icomoon.css';

</style>
