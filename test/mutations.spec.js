import thisStore from '../src/store/modules/comments';

const state = {
	comments: {
		title: 'Комментарии:',
		children: [
			{
				id: 1,
				depth: 1,
				author: 'testName1',
				email: '',
				creationTime: 1583673300883,
				rating: 0,
				text: 'Text111',
				children: [
					{
						id: 3,
						depth: 2,
						author: 'testName3',
						email: '',
						creationTime: 1583673300883,
						rating: 0,
						text: 'Text333',
						children: [
							{
								id: 4,
								depth: 3,
								author: 'testName4',
								email: '',
								creationTime: 1583673300883,
								rating: 0,
								text: 'Text444',
								children: [],
							}
						],
					}
				],
			},
			{
				id: 2,
				depth: 1,
				author: 'testName2',
				email: '',
				creationTime: 1583673300883,
				rating: 10,
				text: 'Text222',
				children: [],
			},
		],
	},
};
const comment = {
	id: 5,
	depth: 1,
	author: 'testName5',
	email: '',
	creationTime: 1583673300883,
	rating: 0,
	text: 'Text555',
	children: [],
}

test('мутация "ADD_COMMENT" добавляет новый комментарий в state. Если targetId = 1, то объект добавляется в массив children объекта с id = 1', () => {
	const targetId = 1;

	thisStore.mutations.ADD_COMMENT(state, [comment, targetId]);
	expect(state.comments.children['0'].children['1'].id).toBe(5);
	expect(state.comments.children['0'].children['1'].depth).toBe(2);
});

test('мутация "ADD_COMMENT" добавляет новый комментарий в state. Если targetId = 4, то объект добавляется в массив по соседству с id =4, т.к. у целевого объекта свойство depth >= 3 (максимум, по условиям)', () => {
	const targetId = 4;

	thisStore.mutations.ADD_COMMENT(state, [comment, targetId]);
	expect(state.comments.children['0'].children['0'].children['1'].id).toBe(5);
	expect(state.comments.children['0'].children['0'].children['1'].depth).toBe(4);
});

test('мутация "ADD_COMMENT" добавляет новый комментарий в state. Если targetId = undefined, то объект добавляется в корневой массив хранилища comments.children[]', () => {
	const targetId = undefined;

	thisStore.mutations.ADD_COMMENT(state, [comment, targetId]);
	expect(state.comments.children['2'].id).toBe(5);
});

test('мутация "SET_RATING" меняет рейтинг у целевого комментария (передается id) в хранилище на 1 в положительную сторону при переданном actionType = "increase"', () => {
	const actionType = 'increase';
	const commentId = 1;
	

	thisStore.mutations.SET_RATING(state, [commentId, actionType]);
	expect(state.comments.children['0'].rating).toBe(1);
});

test('мутация "SET_RATING" меняет рейтинг у целевого комментария (передается id) в хранилище на 1 в отрицательную сторону при переданном actionType = "reduce"', () => {
	const actionType = 'reduce';
	const commentId = 2;
	

	thisStore.mutations.SET_RATING(state, [commentId, actionType]);
	expect(state.comments.children['1'].rating).toBe(9);
});
