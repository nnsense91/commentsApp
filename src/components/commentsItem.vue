<template lang="pug">
	li.comments__item
		.comment(:class="{bad: this.comment.rating <= -10}")
			.comment__avatar(v-show="!isCommentBad")
			.comment__content
				.comment__header
					.comment__info
						h3.comment__owner {{comment.author}}
						.comment__lifetime
							span {{time}}
						commentRating(
							:commentRating="comment.rating"
							:commentId="comment.id"
						)
					.comment__reply
						button(v-if="!isCommentBad" @click="clickReply").comment__reply-btn Ответить
						button(v-if="isHaveSubtree" @click="toggleSubtreeHandle").comment__showtree-btn {{isSubcommentTreeShow? "-": "+"}}
						button(v-if="isCommentBad" @click="showCommentHandle").comment__reply-btn Показать комментарий
				.comment__text(v-show="!isCommentBad" v-html="addMarkdown(comment.text)")
		commentsAddNew(
			v-if="isOpenAddForm"
			:targetId="comment.id"
			@closeAddCommentForm="closeAddCommentForm"
		)
		ul.subcomment__list
			commentsItem(
				v-if="isSubcommentTreeShow"
				v-for="comment in comment.children"
				:comment="comment"
				:key="comment.id"
				@clickReply="clickReplyHandle"
				:activeId="activeId"
				@closeAddCommentForm="closeAddCommentForm"
			)
</template>

<script>
export default {
	components: {
		commentRating: () => import('./commentsRating'),
		commentsItem: () => import('./commentsItem'),
		commentsAddNew: () => import('./commentsAddNew'),
	},
	props: {
		comment: {
			type: Object,
			default() {
				return {};
			},
		},
		activeId: {
			default: 0,
			type: Number,
		},
	},
	data() {
		return {
			time: '',
			isShowComment: false,
			isSubcommentTreeShow: false,
		};
	},
	computed: {
		/**
			* Определяет наличие комментариев-потомков у текущего
			@returns {Boolean}
		*/

		isHaveSubtree() {
			if (this.comment.children.length === 0) {
				return false;
			}
			return true;
		},
		/**
			* Определяет нужно ли поместить форму ответа под текущим комментарием
			@returns {Boolean}
		*/

		isOpenAddForm() {
			if (this.comment.id === this.activeId) {
				return true;
			}
			return false;
		},
		/**
			* Определяет достаточно ли низкий рейтинг комментария чтобы его скрыть
			@returns {Boolean}
		*/

		isCommentBad() {
			if (this.comment.rating > -10) {
				return false;
			} if (this.comment.rating <= -10 && this.isShowComment === true) {
				return false;
			}
			return true;
		},
	},
	created() {
		this.addMarkdown(this.comment.text);
	},
	async mounted() {
		try {
			await this.lifeTimeHandle(this.comment.creationTime);
		} catch (error) {
			// Тут должно всплывать окно с ошибкой
			// eslint-disable-next-line no-alert
			alert('Ошибка! Не удалось отобразить дату написания комментария.');
			// eslint-disable-next-line no-console
			console.log(error.message);
		}
	},
	async updated() {
		try {
			await this.lifeTimeHandle(this.comment.creationTime);
		} catch (error) {
			// Тут должно всплывать окно с ошибкой
			// eslint-disable-next-line no-alert
			alert('Ошибка! Не удалось обновить дату написания комментария.');
			// eslint-disable-next-line no-console
			console.log(error.message);
		}
	},
	methods: {
		/**
			* Определяет длительность существования комментария
			@param {Number} - время создания комментария
		*/

		lifeTimeHandle(commentCreationTime) {
			try {
				const now = new Date().getTime();
				const duration = now - commentCreationTime;

				if (duration < 3600000) {
					this.time = `${Math.trunc(duration / 60000)} мин назад`;
				} else if (duration > 3600000 && duration < 86400000) {
					this.time = `${Math.trunc(duration / 3600000)} часов назад`;
				} else {
					this.time = `${Math.trunc(duration / 86400000)} суток назад`;
				}
			} catch (error) {
				// Тут должно всплывать окно с ошибкой
				// eslint-disable-next-line no-console
				console.log(error.message);
				// eslint-disable-next-line no-alert
				alert('Ошибка! Не удалось посчитать дату написания комментария');
			}
		},
		/**
     * Позволяет показать комментарий, скрытый из за низкого рейтинга
     */

		showCommentHandle() {
			this.isShowComment = true;
		},
		/**
     * Разворачивает дерево комментариев
     * Передает в родительский компонент id текущего комментария, чтобы показать форму ввода нового комментария
     */

		clickReply() {
			this.isSubcommentTreeShow = true;
			this.$emit('clickReply', this.comment.id);
		},
		/**
			* Передает в родительский компонент id текущего комментария, чтобы показать форму ввода нового комментария
			@param {Number} - id комментария из дочернего компонента
		*/

		clickReplyHandle(commentId) {
			this.$emit('clickReply', commentId);
		},
		/**
     * Вызывает метод родительского компонента, чтобы закрыть форму добавления нового комментария
     */
		closeAddCommentForm() {
			this.$emit('closeAddCommentForm');
		},
		/**
     * Позволяет показать/скрыть дерево комментариев
     */
		toggleSubtreeHandle() {
			try {
				this.isSubcommentTreeShow = !this.isSubcommentTreeShow;
				if (this.isSubcommentTreeShow === false) {
					this.$emit('closeAddCommentForm');
				}
			} catch (error) {
				// Тут должно всплывать окно с ошибкой
				// eslint-disable-next-line no-console
				console.log(error.message);
				// eslint-disable-next-line no-alert
				alert('Ошибка! Не удалось показать дерево комментариев.');
			}
		},
		/**
			* Заменяет символы markdown на html-теги
			@param {String} - текст комментария, введенного пользователем
			@returns {Strung} - возвращает текст и html-теги при наличии спецсимволов в тексте
		*/

		addMarkdown(mdItem) {
			// заголовок
			let md = mdItem;

			md = md.replace(/#{6}(.+)/g, '<h6>$1</h6>');
			md = md.replace(/#{5}(.+)/g, '<h5>$1</h5>');
			md = md.replace(/#{4}(.+)/g, '<h4>$1</h4>');
			md = md.replace(/#{3}(.+)/g, '<h3>$1</h3>');
			md = md.replace(/#{2}(.+)/g, '<h2>$1</h2>');
			md = md.replace(/#(.+)/g, '<h1>$1</h1>');

			// цитата
			md = md.replace(/^>(.+)/gm, '<blockquote>$1</blockquote>');

			// список
			md = md.replace(/^\s*\n\*/gm, '<ul>\n*');
			md = md.replace(/^(\*.+)\s*\n([^*])/gm, '$1\n</ul>\n\n$2');
			md = md.replace(/^\*(.+)/gm, '<li>$1</li>');

			// ссылки
			md = md.replace(
				/\[([^\]]+)]\(([^")]+)("(.+)")?\)/g,
				'<a href="$2" title="$4">$1</a>',
			);
			return md;
		},
	},
};
</script>

<style lang="postcss" scoped>
.comments__item {
  list-style: none;
}

.comment {
  padding: 40px 8px 0 8px;
  display: flex;
  border-radius: 5px;
  box-shadow: 0 1px 1px 1px black;
  margin-top: 10px;
}

.comment__content {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
}

.bad {
  padding: 10px 8px;

  & h3 {
    opacity: 0.5;
  }
}

.comment__avatar {
  min-width: 100px;
  height: 100px;
  background-image: url("../images/default_avatar_community.png");
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
  color: #3541c2;
}

.comment__lifetime {
  display: flex;
  align-items: center;

  > span {
    color: #777;
    font-size: 12px;
  }
}

.comment__reply {
  position: relative;
}

.comment__reply-btn {
  text-decoration: underline;
  color: #3541c2;
}

.comment__text {
  padding: 8px 0 8px 0;
  list-style: disc inside;
}

.comment__text > li {
  list-style: disc inside;
}

.subcomment__list {
  margin-left: 120px;
}

.comment__showtree-btn {
  position: absolute;
  right: -40px;

  color: #fff;
  background-color: #3541c2;
  line-height: 0;
  border-radius: 3px;
  width: 20px;
  height: 20px;
}
</style>
