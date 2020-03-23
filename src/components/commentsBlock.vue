<template lang="pug">
	.comments
		h2.comments__title Комментарии:
		span(@mouseover="showLegendOn" @mouseleave="showLegendOff").comments__legend-link поддержка markdown
		p(v-show="isLegendShow").comments__legend 
			| #-заголовок h1 ... ###### - заголовок h6<br>
			| > - цитата<br>
			| * - пункт меню<br>
			| [link](https://google.com) - ссылка
		commentsList(
			:comments="comments"
		)
</template>

<script>
import { mapState } from 'vuex';

export default {
	components: {
		commentsList: () => import ('./commentsList'),
		commentsAddNew: () => import ('./commentsAddNew')
	},
	data() {
		return {
			isLegendShow: false
		}
	},
	methods: {
		showLegendOn() {
			this.isLegendShow = true;
		},
		showLegendOff() {
			this.isLegendShow = false;
		}
	},
	computed: {
		/**
			* Возвращает данные из store
		*/ 
    ...mapState("comments", {
      comments: state => state.comments
    })
  },

}
</script>

<style lang="postcss" scoped>
 .comments {
		width: 100%;
 }

 .comments__legend-link {
	 cursor: pointer;
	 font-style: italic;
	 color: #888;
	 border-bottom: dotted;
 }

 .comments__legend {
	 width: 50%;
	 padding: 20px 0 20px 0;
	 border-radius: 5px;
	 background-color: #ccc;
 }
</style>