<template lang="pug">
	.container
		articleBlock
		commentsBlock
</template>

<script>
export default {
	components: {
		articleBlock: () => import ('./components/articleBlock'),
		commentsBlock: () => import ('./components/commentsBlock'),
	}
}
</script>

<style lang="postcss">
	.container {
		width: 90%;
		margin: 0 auto;
	}

	h1 {
		color: #3541c2
	}
</style>