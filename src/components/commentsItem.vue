<template lang="pug">
	li.comments__item
		.comment
			.comment__avatar
			.comment__content
				.comment__header
					.comment__info
						h3.comment__owner {{comment.author}}
						.comment__lifetime
							span {{comment.creationTime}}
						commentRating(
							:rating="comment.rating"
						)
					.comment__reply
						button(@click="replyThisHandle").comment__reply-btn Ответить
				p.comment__text {{comment.text}}
		commentsAddNew(
			v-if="comment.addReply"
			:targetId="comment.id"
		)
		ul.subcomment__list
			commentsItem(
				v-for="comment in comment.children"
				:comment="comment"
				:key="comment.id"
			)
</template>

<script>
import { mapActions } from 'vuex';

export default {
	components: {
		commentRating: () => import ('./commentRating'),
		commentsItem: () => import ('./commentsItem'),
		commentsAddNew: () => import ('./commentsAddNew')
	},
	props: {
		comment: Object
	},
	methods: {
		...mapActions("comments",['openForm']),
		replyThisHandle() {
			this.openForm(this.comment.id);
		}
	}
}
</script>

<style lang="postcss" scoped>

	.comment {
		padding: 40px 8px 0 8px;
		display: flex;
	}

	.comment__content {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-left: 16px;
	}

	.comment__avatar {
		min-width: 100px;
		height: 100px;
		background-image: url('../images/default_avatar_community.png');
		background-repeat: no-repeat;
		background-size: contain;
	}

	.comment__header {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.comment__info {
		width: 35%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.comment__owner {
		text-decoration: underline;
		color: #3541c2
	}

	.comment__lifetime {
		display: flex;
		align-items: center;

		>span {
			color: #777;
			font-size: 12px;
		}
	}

	.comment__reply-btn {
		text-decoration: underline;
		color: #3541c2;
	}

	.comment__text {
		padding-top: 8px;
	}

	.subcomment__list {
		margin-left: 120px;
	}


</style>