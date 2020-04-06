/* eslint-disable no-param-reassign */
export default {
	namespaced: true,
	state: {
		comments: {
			children: [
				{
					id: 1,
					depth: 1,
					author: 'Darth Vader',
					email: '',
					creationTime: 1583673300883,
					rating: 0,
					text: '1_Lorem ipsum dolor sit amet consectetur adipiscing elit ultricies lacus tempor primis, cursus malesuada vel commodo mi nascetur conubia litora ligula nunc, eros aenean eleifend etiam condimentum at sociosqu penatibus nullam tristique. Scelerisque suscipit nostra risus pulvinar imperdiet phasellus fringilla integer cursus cum lectus porta, sit commodo est lacus platea quam ante hendrerit laoreet vulputate urna. Est mauris cursus ultricies mollis commodo lectus neque, malesuada arcu mus ligula maecenas sed, dis porttitor torquent scelerisque metus iaculis. Platea habitasse nunc eget fringilla scelerisque cursus erat massa sociis ipsum vel penatibus, nascetur egestas elementum interdum senectus aliquam phasellus sem inceptos placerat luctus eros',
					children: [
						{
							id: 2,
							depth: 2,
							author: 'Agent Smith',
							email: '',
							creationTime: 1584573300883,
							rating: 2,
							text: '2_Lorem ipsum dolor sit amet consectetur adipiscing elit ultricies lacus tempor primis, cursus malesuada vel commodo mi nascetur conubia litora ligula nunc, eros aenean eleifend etiam condimentum at sociosqu penatibus nullam tristique. Scelerisque suscipit nostra risus pulvinar imperdiet phasellus fringilla integer cursus cum lectus porta, sit commodo est lacus platea quam ante hendrerit laoreet vulputate urna. Est mauris cursus ultricies mollis commodo lectus neque, malesuada arcu mus ligula maecenas sed, dis porttitor torquent scelerisque metus iaculis. Platea habitasse nunc eget fringilla scelerisque cursus erat massa sociis ipsum vel penatibus, nascetur egestas elementum interdum senectus aliquam phasellus sem inceptos placerat luctus eros',
							children: [],
						},
						{
							id: 3,
							depth: 2,
							author: 'Volan de mort',
							email: '',
							creationTime: 1584673300883,
							rating: 0,
							text: '2_Lorem ipsum dolor sit amet consectetur adipiscing elit ultricies lacus tempor primis, cursus malesuada vel commodo mi nascetur conubia litora ligula nunc, eros aenean eleifend etiam condimentum at sociosqu penatibus nullam tristique. Scelerisque suscipit nostra risus pulvinar imperdiet phasellus fringilla integer cursus cum lectus porta, sit commodo est lacus platea quam ante hendrerit laoreet vulputate urna. Est mauris cursus ultricies mollis commodo lectus neque, malesuada arcu mus ligula maecenas sed, dis porttitor torquent scelerisque metus iaculis. Platea habitasse nunc eget fringilla scelerisque cursus erat massa sociis ipsum vel penatibus, nascetur egestas elementum interdum senectus aliquam phasellus sem inceptos placerat luctus eros',
							children: [
								{
									id: 4,
									depth: 3,
									author: 'Sauron',
									email: '',
									creationTime: 1584974300883,
									rating: -11,
									text: '3_Lorem ipsum dolor sit amet consectetur adipiscing elit ultricies lacus tempor primis, cursus malesuada vel commodo mi nascetur conubia litora ligula nunc, eros aenean eleifend etiam condimentum at sociosqu penatibus nullam tristique. Scelerisque suscipit nostra risus pulvinar imperdiet phasellus fringilla integer cursus cum lectus porta, sit commodo est lacus platea quam ante hendrerit laoreet vulputate urna. Est mauris cursus ultricies mollis commodo lectus neque, malesuada arcu mus ligula maecenas sed, dis porttitor torquent scelerisque metus iaculis. Platea habitasse nunc eget fringilla scelerisque cursus erat massa sociis ipsum vel penatibus, nascetur egestas elementum interdum senectus aliquam phasellus sem inceptos placerat luctus eros',
									children: [],
								},
							],
						},
					],
				},
			],
		},
	},
	mutations: {
		/**
			* Добавляет новый комментарий в state
			@param {Object} - состояние компонента
			@param {Array.<{comment: Object, targetId: Number}>}
			 - массив с объектом данных добавляемого комментария
			 и id комментария в свойство которого нужно добавить этот объект
		*/
		ADD_COMMENT(state, [comment, targetId]) {
			const setCommentPosition = (array) => {
				array.forEach((element) => {
					if (element.id === targetId) {
						comment.depth = element.depth + 1;

						if (comment.depth <= 3) {
							element.children.push(comment);
						} else {
							array.push(comment);
						}
					} else if (element.children !== undefined) {
						setCommentPosition(element.children);
					}
				});
			};

			if (targetId === undefined) {
				state.comments.children.push(comment);
			} else {
				setCommentPosition(state.comments.children);
			}
		},
		/**
			* Меняет рейтинг комментария в state
			@param {Object} - состояние компонента
			@param {Array.<{commentId: Number, actionType: String}>}
			- массив с id комментария в котором меняется рейтинг и вид действия
		*/
		SET_RATING(state, [commentId, actionType]) {
			const setIncrease = (array) => {
				array.forEach((element) => {
					if (element.id === commentId) {
						if (actionType === 'increase') {
							element.rating += 1;
						} else if (actionType === 'reduce') {
							element.rating -= 1;
						}
					} else {
						setIncrease(element.children);
					}
				});
			};

			setIncrease(state.comments.children);
		},
	},
	actions: {
		/**
			* Вызывает мутацию которая добавит комментарий
			@param {Object} - объект контекста, хранилище
			@param {Array.<{comment: Object, targetId: Number}>}
			- массив с объектом данных добавляемого комментария
			и id комментария в свойство которого нужно добавить этот объект
		*/
		async addComment(store, [comment, targetId]) {
			try {
				await store.commit('ADD_COMMENT', [comment, targetId]);
			} catch (error) {
				// Тут должно всплывать окно с ошибкой
				// eslint-disable-next-line no-console
				console.log(error.message);
				// eslint-disable-next-line no-alert
				alert('Ошибка! Не удалось добавить комментарий.');
			}
		},
		/**
			* Вызывает мутацию которая поменяет рейтинг
			@param {Object} - объект контекста, хранилище
			@param {Array.<{commentId: Number, actionType: String}>}
			- массив с id комментария в котором меняется рейтинг и вид действия
		*/
		async changeRating(store, [commentId, actionType]) {
			try {
				store.commit('SET_RATING', [commentId, actionType]);
			} catch (error) {
				// Тут должно всплывать окно с ошибкой
				// eslint-disable-next-line no-console
				console.log(error.message);
				// eslint-disable-next-line no-alert
				alert('Ошибка! Не удалось изменить рейтинг.');
			}
		},
	},
};
