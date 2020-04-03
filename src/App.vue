<template lang="pug">
	.container
		articleBlock
		commentsBlock
</template>

<script>
export default {
	components: {
		articleBlock: () => import('./components/article-block'),
		commentsBlock: () => import('./components/comments-block'),
	},
};
</script>

<style lang="postcss">
@import "normalize.css";
@import url('https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i&display=swap&subset=cyrillic');

	html {
		font-size: 16px;
	}

	body {
		font-family: 'PT Sans', sans-serif;
	}

	h1, h2, h3, h4, h5, h6, p {
		padding: 0;
		margin: 0;
	}

	.container {
		width: 70%;
		margin: 0 auto;
	}

	ul,li {
		padding: 0;
		margin: 0;
	}

	button {
		padding: 0;
		border: none;
		background-color: transparent;
		cursor: pointer;
		outline: none;
	}

</style>
