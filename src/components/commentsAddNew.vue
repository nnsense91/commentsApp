<template lang="pug">
	.new-comment
		form.new-comment__form
			h2.new-comment__title Добавить комментарий
			.new-comment__content
				.new-comment__form-row
					label(for="name").new-comment__label Имя
					input(type="text" v-model="comment.author" @blur="checkValid($event.target.id)").new-comment__input#name
					validationError(
						:error="errorMessage.name"
					)
				.new-comment__form-row
					label(for="email").new-comment__label E-mail
					input(type="e-mail" v-model="comment.email" @blur="checkValid($event.target.id)").new-comment__input#email
					validationError(
						:error="errorMessage.email"
					)
				.new-comment__form-row
					label(for="text").new-comment__label Текст комментария
					textarea(v-model="comment.text" @blur="checkValid($event.target.id)").new-comment__text#text
					validationError(
						:error="errorMessage.text"
					)
				.new-comment__form-row
					label.new-comment__label
					button(type="submit" @click.prevent="addNewComment").new-comment__submit Добавить комментарий
</template>

<script>
import { mapActions } from 'vuex';

let uniqId = 5;

export default {
	components: {
		validationError: () => import ('./commentsValidationError')
	},
	data() {
		return {
			errorMessage: {
				name: "",
				email: "",
				text: ""
			},
			formInputValid: {
				name: false,
				email: false,
				text: false
			},
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
		/**
			* Вызывает action в store чтобы добавить комментарий, присваивает уникальный id комментарию
  		*/ 
		async addNewComment() {
			if (this.isFormValid) {
				try {
					this.comment.id = uniqId;
					this.comment.creationTime = this.addCreationTime();
					await this.addComment([this.comment, this.targetId]);
					uniqId++;
				} catch(error) {
					console.log(error.message);
					alert("Ошибка! Не удалось добавить комментарий.");
				} finally {
					this.closeAddCommentForm();
				}
				
			} else {
				this.checkValid("name");
				this.checkValid("email");
				this.checkValid("text");
			}
		},
		/**
			* Возвращает время в миллисекундах от 01.01.1970, 00.00.00 UTC
			@returns {Number}
  		*/ 
		addCreationTime() {
			const now = new Date;
			return now.getTime();
		},
		closeAddCommentForm() {
			this.$emit("closeAddCommentForm");
		},
		/**
			* Валидация полей ввода нового комментария
			@param {String} - id элемента DOM
  		*/ 
		checkValid(inputId) {
			if (inputId === "name") {				
				this.comment.author = this.comment.author.trim();

				if (this.comment.author === "") {
					this.formInputValid.name = false;
					this.errorMessage.name = "Поле обязательно к заполнению";
				} else {
					this.formInputValid.name = true;
					this.errorMessage.name = "";
				}
			} else if (inputId === "email") {
				this.comment.email = this.comment.email.trim();
				
				/**
					* Проверка формата e-mail
					@param {String} - данные введенные пользователем в поле ввода e-mail
					@returns {Boolean} - результат проверки
				*/ 
				const validateEmail = email => {
					const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

					return re.test(email);
				};

				if (this.comment.email === "") {
					this.errorMessage.email = "Поле обязательно к заполнению";
				} else if (validateEmail(this.comment.email)) {
					this.formInputValid.email = true;
					this.errorMessage.email = "";
				} else {
					this.formInputValid.email = false;
					this.errorMessage.email = "Некорректный формат e-mail";
				}
			} else if (inputId === "text") {
				this.comment.text = this.comment.text.trim();

				if (this.comment.text === "") {
					this.formInputValid.text = false;
					this.errorMessage.text = "Поле обязательно к заполнению";
				} else {
					this.formInputValid.text = true;
					this.errorMessage.text = "";
				}
			}
		}
	},
	computed: {
		/**
			* Валидация формы
		*/ 
		isFormValid() {
			if (this.formInputValid.name === true && this.formInputValid.email === true && this.formInputValid.text) {
				return true;
			} else {
				return false;
			}
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