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
		commentRating: Number,
		commentId: Number
	},
	methods: {
		...mapActions('comments',["changeRating"]),
		increaseCurrentRating() {
			this.changeRating([this.commentId, "increase"]);
		},
		reduceCurrentRating() {
			this.changeRating([this.commentId, "reduce"]);
		}
	}
}
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