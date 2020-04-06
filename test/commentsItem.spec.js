import { shallowMount } from '@vue/test-utils';
import commentsItem from '../src/components/commentsItem.vue';
import commentsAddNew from '../src/components/commentsAddNew.vue';

describe('commentsItem', () => {
	it('Сворачивает комментарий если рейтинг <= -10 (не появляются кнопка "ответить", аватар и текст комментария. Появляется кнопка "Показать комментарий")', () => {
		const wrapper = shallowMount(commentsItem, {
			propsData: {
				comment: {
					id: 0,
					depth: 1,
					author: '',
					email: '',
					creationTime: '',
					rating: -10,
					text: '',
					children: [],
				},
			},
		});

		expect(wrapper.contains('#reply')).toBe(false);
		expect(wrapper.contains('#show')).toBe(true);
		expect(wrapper.find('.comment__text').isVisible()).toBe(false);
		expect(wrapper.find('.comment__avatar').isVisible()).toBe(false);
	});

	it('Если рейтинг > -10 существует кнопка "ответить" и отсутствует кнопка "Показать комментарий". Видно текст и аватар', () => {
		const wrapper = shallowMount(commentsItem, {
			propsData: {
				comment: {
					id: 0,
					depth: 1,
					author: '',
					email: '',
					creationTime: '',
					rating: 0,
					text: '',
					children: [],
				},
			},
		});
		expect(wrapper.contains('#reply')).toBe(true);
		expect(wrapper.contains('#show')).toBe(false);
		expect(wrapper.find('.comment__text').isVisible()).toBe(true);
		expect(wrapper.find('.comment__avatar').isVisible()).toBe(true);
	});

	it('Существует форма добавления комметария если id активного комментария совпадает с текущим', () => {
		const wrapper = shallowMount(commentsItem, {
			propsData: {
				comment: {
					id: 77,
					depth: 1,
					author: '',
					email: '',
					creationTime: '',
					rating: 0,
					text: '',
					children: [],
				},
				activeId: 77,
			},
		});

		expect(wrapper.find(commentsAddNew).exists()).toBe(true);
	});

	it('Отсутствует форма добавления комметария если id активного комментария не совпадает с текущим', () => {
		const wrapper = shallowMount(commentsItem, {
			propsData: {
				comment: {
					id: 77,
					depth: 1,
					author: '',
					email: '',
					creationTime: '',
					rating: 0,
					text: '',
					children: [],
				},
				activeId: 76,
			},
		});


		expect(wrapper.find(commentsAddNew).exists()).toBe(false);
	});

	it('При нажатии на кнопку "ответить" вызывает эмит события (который в последствии выдаст активный id равный id данного комментария)', () => {
		const wrapper = shallowMount(commentsItem, {
			propsData: {
				comment: {
					id: 77,
					depth: 1,
					author: '',
					email: '',
					creationTime: '',
					rating: 0,
					text: '',
					children: [],
				},
			},
		});
		wrapper.find('#reply').trigger('click');

		wrapper.vm.$emit('clickReply', 77);

		expect(wrapper.emitted().clickReply).toBeTruthy();
		expect(wrapper.emitted().clickReply[1]).toEqual([77]);
	});

	it('Дерево подкомментариев существует если prop comments.children не пустой (вычисляется computed свойством). Появляется кнопка  которая позволяет свернуть или развернуть ветку комментариев', () => {
		const wrapper = shallowMount(commentsItem, {
			propsData: {
				comment: {
					id: 77,
					depth: 1,
					author: '',
					email: '',
					creationTime: '',
					rating: 0,
					text: '',
					children: [
						{
							id: 78,
							depth: 1,
							author: '',
							email: '',
							creationTime: '',
							rating: 0,
							text: '',
							children: [],
						},
					],
				},
			},
		});
		const { isHaveSubtree } = wrapper.vm;

		expect(isHaveSubtree).toBe(true);
		expect(wrapper.contains('.comment__showtree-btn')).toBe(true);
	});

	it('Нажатие на кнопку "+" показывает дерево подкомментариев', () => {
		const wrapper = shallowMount(commentsItem, {
			propsData: {
				comment: {
					id: 77,
					depth: 1,
					author: '',
					email: '',
					creationTime: '',
					rating: 0,
					text: '',
					children: [
						{
							id: 78,
							depth: 1,
							author: '',
							email: '',
							creationTime: '',
							rating: 0,
							text: '',
							children: [],
						},
					],
				},
			},
		});
		wrapper.find('.comment__showtree-btn').trigger('click');

		expect(wrapper.contains(commentsItem)).toBe(true);
	});
});
