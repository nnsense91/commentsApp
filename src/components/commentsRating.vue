<template lang="pug">
	.comment__rating
		.comment__rating-block
			button(type="button" @click="increaseCurrentRating").comment__rating-increase +
		.comment__rating-block.comment__rating-value(:class="{comment__negative: commentRating <= -10}") {{commentRating}}
		.comment__rating-block
			button(type="button" @click="reduceCurrentRating").comment__rating-reduce -
</template>

<script>
import { mapActions } from 'vuex';

export default {
	props: {
		commentRating: {
			type: Number,
			default: 0,
		},
		commentId: {
			type: Number,
			default: 0,
		},
	},
	methods: {
		...mapActions('comments', ['changeRating']),
		/**
			* Вызывает action в store чтобы увеличить рейтинг комментария на 1
  		*/
		async increaseCurrentRating() {
			try {
				await this.changeRating([this.commentId, 'increase']);
			} catch (error) {
				// Здесь должно всплывать окно с ошибкой
				// eslint-disable-next-line no-console
				console.log(error.message);
				// eslint-disable-next-line no-alert
				alert('Ошибка! Не удается увеличить рейтинг комментария.');
			}
		},
		/**
			* Вызывает action в store чтобы понизить рейтинг комментария на 1
  		*/
		async reduceCurrentRating() {
			try {
				await this.changeRating([this.commentId, 'reduce']);
			} catch (error) {
				// Здесь должно всплывать окно с ошибкой
				// eslint-disable-next-line no-console
				console.log(error.message);
				// eslint-disable-next-line no-alert
				alert('Ошибка! Не удается понизить рейтинг комментария.');
			}
		},
	},
};
</script>

<style lang="postcss" scoped>

	.comment__rating {
		display: flex;
		border: 1px solid #777;
		height: 20px;
		border-radius: 2px;
	}

	.comment__rating-block {
		width: 20px;
		height: 20px;
		text-align: center;
		background-color: #ddd;

		>button {
			width: 100%;
			height: 100%;
		}
	}

	.comment__rating-value {
		border-left: 1px solid #777;
		border-right: 1px solid #777;
		width: 30px;
	}

	.comment__negative {
		color: #f00;
	}

</style>
