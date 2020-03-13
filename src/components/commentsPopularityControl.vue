<template lang="pug">
	.comment__popularity
		.comment__popularity-block
			button(type="button").comment__popularity-increase +
		.comment__popularity-block.comment__popularity-value 5
		.comment__popularity-block
			button(type="button").comment__popularity-reduce -
</template>

<style lang="postcss" scoped>
	.comment__popularity {
		display: flex;
		border: 1px solid black;
		height: 20px;
	}

	.comment__popularity-block {
		width: 20px;
		height: 20px;
		text-align: center;
		background-color: #ccc;

		>button {
			width: 100%;
			height: 100%;
		}
	}

	.comment__popularity-value {
		border-left: 1px solid black;
		border-right: 1px solid black;
		width: 30px;
	}

</style>