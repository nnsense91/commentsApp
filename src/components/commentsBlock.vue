<template lang="pug">
	.comments
		h2.comments__title Комментарии:
		commentsList(
			@addNewRootComment="addModeOnHanlde"
		)
		commentsAddNew(v-if="isAddModeOn")
</template>

<script>
export default {
	components: {
		commentsList: () => import ('./commentsList'),
		commentsAddNew: () => import ('./commentsAddNew')
	},
	data() {
		return {
			isAddModeOn: false
		}
	},
	methods: {
		addModeOnHanlde() {
			!this.isAddModeOn ? this.isAddModeOn = true : false;
		}
	}
}
</script>

<style lang="postcss" scoped>
 .comments {
	width: 100%;
 }
</style>