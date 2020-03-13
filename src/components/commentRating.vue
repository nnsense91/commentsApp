<template lang="pug">
	.comment__rating
		.comment__rating-block
			button(type="button").comment__rating-increase +
		.comment__rating-block.comment__rating-value 5
		.comment__rating-block
			button(type="button").comment__rating-reduce -
</template>

<style lang="postcss" scoped>
	.comment__rating {
		display: flex;
		border: 1px solid black;
		height: 20px;
	}

	.comment__rating-block {
		width: 20px;
		height: 20px;
		text-align: center;
		background-color: #ccc;

		>button {
			width: 100%;
			height: 100%;
		}
	}

	.comment__rating-value {
		border-left: 1px solid black;
		border-right: 1px solid black;
		width: 30px;
	}

</style>