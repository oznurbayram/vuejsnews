<template>
	<div id="fh5co-offcanvas">
		<a href="#" class="fh5co-close-offcanvas js-fh5co-close-offcanvas"><span><i class="icon-cross3"></i> <span>Close</span></span></a>
		<div class="fh5co-menu">
			<div class="fh5co-box">
				<h3 class="heading">News</h3>
				<ul class="news-list" v-for="newsTitleItem in newsTitle" :key="newsTitleItem.id">
					<li class="news-list-text" v-on:click="getNewsId(newsTitleItem.id)" >{{newsTitleItem.name}}</li>
				<button class="btn" :class="{ red : newsTitleItem.favorite }" v-on:click="chooseFavoriteNews(newsTitleItem)" >Add Favorite</button>
				</ul>
			</div>
		</div>
	</div>
	<!-- END #fh5co-offcanvas -->
	<header id="fh5co-header">
		
		<div class="container-fluid">

			<div class="row">
				<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle"><i></i></a>
				<div class="col-lg-12 col-md-12 text-center">
					<h1 id="fh5co-logo">News Flash</h1>
				</div>

			</div>
		
		</div>

	</header>
  <Content msg="Welcome to Your Vue.js App" :newsId="newsId" />

	<footer id="fh5co-footer">
		<p></p>
	</footer>
</template>

<script>
import Content from './components/Content.vue'
import axios from 'axios';
// import BaseServices from './BaseServices.js';

export default {
  name: 'App',
  components: {
    Content
  },
   data () {
    return {
	newsTitle: null,
	newsId: "",
	favoriteNewsList: [],
	favoriteMode:false,
    }
  },
   created () {
    axios
      .get('https://newsapi.org/v2/sources?apiKey=8765177e98ba4f35a687b946d5112c3a')
      .then(response => {
		this.newsTitle = response.data.sources;
		if(this.favoriteNewsList.length > 0) {
			this.favoriteNewsList.forEach(item => {
				let removeIndex = this.newsTitle.findIndex(i => i.id === item);
				let addObject=this.newsTitle[removeIndex];
				addObject.favorite = true;
				this.newsTitle.splice(removeIndex,1);
				this.newsTitle.unshift(addObject);
				console.log(this.newsTitle);
			})
		}
         })
  },
    computed: {
    favoriteNews() {
      return localStorage.getItem("favoriteNews");
      
    }
  },
    mounted() {
	if(localStorage.getItem('favoriteNewsList')) {
      try {
        this.favoriteNewsList = JSON.parse(localStorage.getItem('favoriteNewsList'));
      } catch(e) {
        localStorage.removeItem('favoriteNewsList');
	}
	}
    },
  methods: {
	getNewsId: function (id) {
		this.newsId = id; 
	console.log(this.newsId);
	},
	chooseFavoriteNews: function (favoriteNews) {

		if(favoriteNews.favorite === undefined || favoriteNews.favorite===false ) {
	if(this.favoriteNewsList.indexOf(favoriteNews.id) === -1) {
	favoriteNews.favorite = true;
	this.favoriteNewsList.push(favoriteNews.id);
	console.log(this.favoriteNewsList);
	this.saveStorage();
		}
		}
		else {
				if(this.favoriteNewsList.indexOf(favoriteNews.id) !== -1) {
		let removeIndex = this.favoriteNewsList.map(item => item).indexOf(favoriteNews.id);
		favoriteNews.favorite = false;
		this.favoriteNewsList.splice(removeIndex,1);
		this.saveStorage();
			}
		}

	},
	removeFavoriteNews: function (favoriteNewsId) {
			if(this.favoriteNewsList.indexOf(favoriteNewsId) !== -1) {
		let removeIndex = this.favoriteNewsList.map(item => item).indexOf(favoriteNewsId);
				this.favoriteNewsList.splice(removeIndex,1);
		this.saveStorage();
			}
	},
	saveStorage: function() {
    let parsed = JSON.stringify(this.favoriteNewsList);
    localStorage.setItem('favoriteNewsList', parsed);
	}
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
