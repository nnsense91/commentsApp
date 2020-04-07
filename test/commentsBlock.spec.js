import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import commentsBlock from '../src/components/commentsBlock.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('commentsBlock', () => {
	let store;
	beforeEach(() => {
		store = new Vuex.Store({
			modules: {
				comments: {
					namespaced: true,
					state: {
						comments: {
							title: 'testTitle',
							children: []
						}
					}
				}
			}
		})
	})

	it('Проверка получен ли state из store', () => {
		const wrapper = shallowMount(commentsBlock, {
			store,
			localVue
		});
		expect(wrapper.find('.comments__title').text()).toBe('testTitle');
	});

	it('Легенда должна быть показана при наведении курсора', () => {
		const wrapper = shallowMount(commentsBlock, {
			store,
			localVue
		});

		wrapper.find(".comments__legend-link").trigger("mouseover");
		wrapper.vm.$nextTick( () => {
			expect(wrapper.find('.comments__legend').isVisible()).toBe(true);
		});
	});

	it('Легенда не должна быть показана при наведении курсора', () => {
		const wrapper = shallowMount(commentsBlock, {
			store,
			localVue
		});

		wrapper.find(".comments__legend-link").trigger("mouseleave");
		wrapper.vm.$nextTick(() => {
			expect(wrapper.find('.comments__legend').isVisible()).toBe(false);
		});
	});
});