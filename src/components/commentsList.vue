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
	components: {
		commentsItem: () => import('./commentsItem'),
		commentsAddNew: () => import('./commentsAddNew'),
	},
	props: {
		comments: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			activeId: -1,
		};
	},
	computed: {
		/**
			* Проверяет открыта ли форма добавления корневого комментария
			@returns {Boolean}
		*/
		isOpenAddForm() {
			if (this.activeId === -1) {
				return true;
			}
			return false;
		},
	},
	methods: {
		/**
			* Открывает форму для добавления корневого комментария
		*/
		newRootComment() {
			try {
				this.activeId = -1;
				window.scrollTo(0, document.body.scrollHeight);
			} catch (error) {
				// Тут должно всплывать окно с ошибкой
				// eslint-disable-next-line no-alert
				alert('Ошибка! Не удается открыть форму создания комментария');
				// eslint-disable-next-line no-console
				console.log(error.message);
			}
		},
		/**
			* Убирает форму добавления комментария
		*/
		clearForm() {
			this.activeId = -2;
		},
		/**
			* Определяет id комментария под которым нужно отрисовать форму добавления коммента
			@param {Number} - id комментария, который вызывает этот метод
		*/
		clickReplyHandle(commentId) {
			try {
				this.activeId = commentId;
			} catch (error) {
				// Тут должно всплывать окно с ошибкой
				// eslint-disable-next-line no-console
				console.log(error.message);
				// eslint-disable-next-line no-alert
				alert('Ошибка! Не удается открыть форму ответа на комментарий');
			}
		},
	},
};
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
