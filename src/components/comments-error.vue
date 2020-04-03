<template lang="pug">
	p.error {{error}}
</template>

<script>
export default {
	props: {
		error: {
			type: String,
			default: '',
		},
	},
};
</script>

<style lang="postcss" scoped>
	.error {
		margin-left: 20px;
		color: #f00;
	}
</style>
