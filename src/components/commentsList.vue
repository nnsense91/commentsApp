<template lang="pug">
	ul.comments__list
		commentsItem(
			v-for="comment in comments.children"
			:comment="comment"
			:key="comment.id"
		)
</template>

<script>
export default {
	components: {
		commentsItem: () => import ('./commentsItem')
	},
	props: {
		comments: Object
	},
	methods: {
	}
}
</script>