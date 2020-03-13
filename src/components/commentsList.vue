<template lang="pug">
	ul.comments__list
		li.comments__item
			commentsItem
</template>

<script>
export default {
	components: {
		commentsItem: () => import ('./commentsItem')
	}
}
</script>