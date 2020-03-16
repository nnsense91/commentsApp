<template lang="pug">
	.comment
		.comment__avatar
		.comment__content
			.comment__header
				.comment__info
					h3.comment__owner Имя комментатора
					.comment__lifetime
						span Час назад
					commentRating
				.comment__reply
					button(@click="addNewRootComment").comment__reply-btn Ответить
			p.comment__text Здесь будет текст комментария. Длинный такой текст. И комментарий, наверняка, будет интересным и без орфографических ошибок. 
				| И здесь будет текст комментария. Длинный такой текст. И комментарий, наверняка, будет интересным и без орфографических ошибок.
				| И здесь будет текст комментария. Длинный такой текст. И комментарий, наверняка, будет интересным и без орфографических ошибок.
				| И здесь будет текст комментария. Длинный такой текст. И комментарий, наверняка, будет интересным и без орфографических ошибок.
</template>

<script>
export default {
	components: {
		commentRating: () => import ('./commentRating')
	},
	methods: {
		addNewRootComment() {
			this.$emit("addNewRootComment");
		}
	}
}
</script>

<style lang="postcss" scoped>

	.comment {
		padding: 8px;
		display: flex;
	}

	.comment__content {
		display: flex;
		flex-direction: column;
		margin-left: 16px;
	}

	.comment__avatar {
		min-width: 100px;
		height: 100px;
		background-image: url('../images/default_avatar_community.png');
		background-repeat: no-repeat;
		background-size: contain;
	}

	.comment__header {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.comment__info {
		width: 35%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.comment__owner {
		text-decoration: underline;
		color: #3541c2
	}

	.comment__lifetime {
		display: flex;
		align-items: center;

		>span {
			color: #777;
			font-size: 12px;
		}
	}

	.comment__reply-btn {
		text-decoration: underline;
		color: #3541c2;
	}

	.comment__text {
		padding-top: 8px;
	}


</style>