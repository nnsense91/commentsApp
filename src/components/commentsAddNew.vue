<template lang="pug">
	.new-comment
		form.new-comment__form
			h2.new-comment__title Добавить комментарий
			.new-comment__content
				.new-comment__form-row
					label(for="name").new-comment__label Имя
					input(type="text" v-model="comment.author").new-comment__input#name
				.new-comment__form-row
					label(for="email").new-comment__label E-mail
					input(type="e-mail" v-model="comment.email").new-comment__input#email
				.new-comment__form-row
					label(for="text").new-comment__label Текст комментария
					textarea(v-model="comment.text").new-comment__text#text
				.new-comment__form-row
					label.new-comment__label
					button(type="submit" @click.prevent="addNewComment").new-comment__submit Добавить комментарий
</template>

<script>
import { mapActions } from 'vuex';

let uniqId = 4;

export default {
	data() {
		return {
			comment: {
				id: 0,
				depth: 1,
				addReply: false,
				author: "",
				email: "",
				creationTime: "",
				rating: 0,
				text: "",
				children: []
			}
		}
	},
	props: {
		targetId: Number
	},
	methods: {
		...mapActions('comments',["addComment"]),
		addNewComment() {
			this.comment.id = uniqId;
			this.comment.creationTime = this.addCreationTime();
			this.addComment([this.comment, this.targetId]);
			uniqId++;
			this.closeAddCommentForm();
		},
		addCreationTime() {
			const now = new Date;
			return now.getTime()
		},
		closeAddCommentForm() {
			this.$emit("closeAddCommentForm");
		}
	}
}
</script>

<style lang="postcss" scoped>
	.new-comment {
		padding: 32px 0;
	}

	.new-comment__content {
		width: 100%;
		padding: 16px;
	}

	.new-comment__form {
		position: relative;
		width: 100%;
		border: 1px solid #777;
	}

	.new-comment__title {
		position: absolute;
		top: -10px;
		left: 13px;

		padding: 0 3px;
		font-size: 16px;
		background-color: #fff;
	}

	.new-comment__form-row {
		display: flex;
		width: 100%;

		&:not(:first-child) {
			margin-top: 10px;
		}
	}

	.new-comment__label {
		width: 20%;
	}

	.new-comment__input {
		display: block;
		width: 25%;
	}

	.new-comment__text {
		width: 50%;
		min-height: 100px;
		resize: none;
	}

	.new-comment__submit {
		padding: 4px 8px;
		border-radius: 2px;
		background-color: #3541c2;
		color: #fff;
	}
</style>