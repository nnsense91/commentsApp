import { shallowMount } from '@vue/test-utils';
import commentsList from '../src/components/commentsList.vue';

describe('commentsList', () => {
	it('Показывает необходимое количество комментариев', () => {
		const wrapper = shallowMount(commentsList, {
			propsData: {
				comments: {
					children: [
						{},
						{},
					],
				},
			},
			stubs: {
				commentsItem: true,
			}
		});
		
		expect(wrapper.findAll('commentsitem-stub').length).toBe(2);
	});
	it('Показывает форму добавления корневого комментария, если ActiveId = -1', () => {
		const wrapper = shallowMount(commentsList, {
			data() {
				return {
					activeId: -1,
				}
			},
			stubs: {
				commentsAddNew: true,
			}
		});

		expect(wrapper.contains('commentsAddNew-stub')).toBe(true);
	});

	it('Не показывает форму добавления корневого комментария, если ActiveId !== -1', () => {
		const wrapper = shallowMount(commentsList, {
			data() {
				return {
					activeId: 44,
				}
			},
			stubs: {
				commentsAddNew: true,
			}
		});

		expect(wrapper.contains('commentsAddNew-stub')).toBe(false);
	});

	it('При клике "добавить комментарий" показывает форму добавления корневого комментария', () => {
		const wrapper = shallowMount(commentsList, {
			data() {
				return {
					activeId: 44,
				}
			},
			stubs: {
				commentsAddNew: true,
			}
		});
		wrapper.find('.comments__reply-root').trigger('click');
		wrapper.vm.$nextTick(() => {
			expect(wrapper.contains('commentsAddNew-stub')).toBe(true);
		});
	});
});
