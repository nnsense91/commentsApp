<template lang="pug">
	ul.comments__list
		.comments__reply-block
			button(type="button" @click="newRootComment").comments__reply-root Написать комментарий
		commentsItem(
			v-for="comment in comments.children"
			:comment="comment"
			:key="comment.id"
			@closeAddCommentForm="newRootComment"
			@clickReply="clickReplyHandle"
			:activeId="activeId"
		)
		commentsAddNew(
			v-if="isOpenAddForm"
			:targetId="comments.id"
			@closeAddCommentForm="clearForm"
		)
</template>

<script>

export default {
	data() {
		return {
			addRootFormIsActive: false,
			activeId: -1
		}
	},
	components: {
		commentsItem: () => import ('./commentsItem'),
		commentsAddNew: () => import ('./commentsAddNew')
	},
	props: {
		comments: Object
	},
	methods: {
		newRootComment() {
			window.scrollTo(0, document.body.scrollHeight);
			this.activeId = -1;
		},
		clearForm() {
			this.activeId = -2;
		},
		clickReplyHandle(commentId) {
			this.activeId = commentId;
		}
	},
	computed: {
		isOpenAddForm() {
			if (this.activeId === -1) {
				return true;
			} else {
				return false;
			}
		}
	}
}
</script>

<style lang="postcss" scoped>
	.comments__list {
		padding: 40px 0 40px 0;
	}

	.comments__reply-block {
		padding: 0 0 80px 0;
		display: flex;
	}

	.comments__reply-root{
		font-size: 24px;
		text-decoration: underline;
		color: #3541c2;
	}

</style>