<template lang="pug">
	.comments
		h2.comments__title Комментарии:
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
	methods: {
	},
	computed: {
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
</style>