<template lang="pug">
	ul.comments__list
		li.comments__item
			commentsItem(
				@addNewRootComment="addNewRootComment"
			)
</template>

<script>
export default {
	components: {
		commentsItem: () => import ('./commentsItem')
	},
	methods: {
		addNewRootComment() {
			this.$emit("addNewRootComment");
		}
	}
}
</script>