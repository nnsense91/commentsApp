<template lang="pug">
	li.comments__item
		.comment(:class="{bad: this.comment.rating <= -10}")
			.comment__avatar(v-show="!isCommentBad")
			.comment__content
				.comment__header
					.comment__info
						h3.comment__owner {{comment.author}}
						.comment__lifetime
							span {{time}}
						commentRating(
							:commentRating="comment.rating"
							:commentId="comment.id"
						)
					.comment__reply
						button(v-if="!isCommentBad" @click="clickReply").comment__reply-btn Ответить
						button(v-if="isHaveSubtree" @click="openSubtreeHandle").comment__showtree-btn {{isSubcommentTreeShow? "-": "+"}}
						button(v-if="isCommentBad" @click="showCommentHandle").comment__reply-btn Открыть комментарий
				p(v-show="!isCommentBad").comment__text {{comment.text}}
		commentsAddNew(
			v-if="isOpenAddForm"
			:targetId="comment.id"
			@closeAddCommentForm="closeAddCommentForm"
		)
		ul.subcomment__list
			commentsItem(
				v-if="isSubcommentTreeShow"
				v-for="comment in comment.children"
				:comment="comment"
				:key="comment.id"
				@clickReply="clickReplyHandle"
				:activeId="activeId"
				@closeAddCommentForm="closeAddCommentForm"
			)
</template>

<script>

export default {
	data() {
		return {
			time: "",
			isShowComment: false,
			isSubcommentTreeShow: false
		}
	},
	components: {
		commentRating: () => import ('./commentRating'),
		commentsItem: () => import ('./commentsItem'),
		commentsAddNew: () => import ('./commentsAddNew')
	},
	props: {
		comment: Object,
		activeId: Number
		
	},
	methods: {
		lifeTimeHandle(commentCreationTime) {
			const now = (new Date()).getTime();
			const duration = now - this.comment.creationTime;
			
			if (duration < 3600000)  {
				this.time = `${Math.trunc(duration/60000)} мин назад`;
			} else if (duration > 3600000 && duration < 86400000) {
				this.time = `${Math.trunc(duration/3600000)} часов назад`;
			} else {
				this.time = `${Math.trunc(duration/86400000)} суток назад`;
			}
		},
		showCommentHandle() {
			this.isShowComment = true;
		},
		clickReply() {
			this.isSubcommentTreeShow = true;
			this.$emit("clickReply", this.comment.id);
		},
		clickReplyHandle(commentId) {
			this.$emit("clickReply", commentId);
		},
		closeAddCommentForm() {
			this.$emit("closeAddCommentForm");
		},
		openSubtreeHandle() {
			this.isSubcommentTreeShow = !this.isSubcommentTreeShow;
			if (this.isSubcommentTreeShow === false) {
				this.$emit("closeAddCommentForm");
			}
		}
	},
	mounted() {
		this.lifeTimeHandle(this.comment.creationTime);
	},
	computed: {
		isHaveSubtree() {
			if (this.comment.children.length === 0) {
				return false
			} else {
				return true
			}
		},
		isOpenAddForm() {
			if (this.comment.id === this.activeId) {
				return true;
			}
		},
		isCommentBad() {
			if (this.comment.rating > -10) {
				return false;
			} else if (this.comment.rating <= -10 && this.isShowComment === true) {
				return false;
			} else {
				return true;
			}
		}
	}
}
</script>

<style lang="postcss" scoped>

	.comment {
		padding: 40px 8px 0 8px;
		display: flex;
		border-radius: 5px;
		box-shadow: 0 1px 1px 1px black;
		margin-top: 10px;
	}

	.comment__content {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-left: 16px;
	}

	.bad {
		padding: 10px 8px;

		& h3 {
			opacity: 0.5;
		}
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
		color: #3541c2;
	}

	.comment__lifetime {
		display: flex;
		align-items: center;

		>span {
			color: #777;
			font-size: 12px;
		}
	}

	.comment__reply {
		position: relative;
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

	.comment__showtree-btn {
		position: absolute;
		right: -40px;

		color: #fff;
		background-color: #3541c2;
		line-height: 0;
		border-radius: 3px;
		width: 20px;
		height: 20px;
	}


</style>