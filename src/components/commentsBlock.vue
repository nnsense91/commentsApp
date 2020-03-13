<template lang="pug">
	.comments
		h2.comments__title Комментарии:
		commentsList
</template>

<script>
export default {
	components: {
		commentsList: () => import ('./commentsList')
	}
}
</script>