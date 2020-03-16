<template lang="pug">
	.comment__rating
		.comment__rating-block
			button(type="button").comment__rating-increase +
		.comment__rating-block.comment__rating-value {{rating}}
		.comment__rating-block
			button(type="button").comment__rating-reduce -
</template>

<script>
export default {
	props: {
		rating: Number
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

</style>