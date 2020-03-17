<template lang="pug">
	ul.comments__list
		commentsItem(
			v-for="comment in comments.children"
			:comment="comment"
			:key="comment.id"
		)
		.comments__reply-block
			button(type="button" @click="replyThisHandle").comments__reply-root Написать комментарий
		commentsAddNew(
			v-if="comments.addReply"
			:targetId="comments.id"
		)
</template>

<script>
import { mapActions } from 'vuex';

export default {
	components: {
		commentsItem: () => import ('./commentsItem'),
		commentsAddNew: () => import ('./commentsAddNew')
	},
	props: {
		comments: Object
	},
		methods: {
		...mapActions("comments",['openForm']),
		replyThisHandle() {
			this.openForm(this.comments.id);
		}
	}
}
</script>

<style lang="postcss" scoped>

	.comments__reply-block {
		padding: 80px 0 80px 0;
		display: flex;
		justify-content: flex-end;
	}

	.comments__reply-root{
		font-size: 24px;
		text-decoration: underline;
		color: #3541c2;
	}

</style>