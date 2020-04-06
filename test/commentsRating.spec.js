import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import commentsRating from '../src/components/commentsRating.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('commentsRating', () => {
	it('красный цвет при рейтинге <= -10', () => {
		const wrapper = shallowMount(commentsRating, {
			propsData: {
				commentRating: -10,
			},
		});
		expect(wrapper.contains('.comment__negative')).toBe(true);
	});

	it('коммент не должен сворачиваться при рейтинге > -10', () => {
		const wrapper = shallowMount(commentsRating, {
			propsData: {
				commentRating: -9,
			},
		});
		expect(wrapper.contains('.comment__negative')).toBe(false);
	});
});

describe('commentsRating, обращения к store', () => {
	let actions;
	let store;

	beforeEach(() => {
		actions = {
			changeRating: jest.fn(),
		};
		store = new Vuex.Store({
			modules: {
				comments: {
					namespaced: true,
					actions,
				},
			},
		});
	});

	it('вызывает действие хранилища "changeRating" по нажатию кнопки +', () => {
		const wrapper = shallowMount(commentsRating, { store, localVue });
		wrapper.find('.comment__rating-increase').trigger('click');
		expect(actions.changeRating).toHaveBeenCalled();
	});

	it('вызывает действие хранилища "changeRating" по нажатию кнопки -', () => {
		const wrapper = shallowMount(commentsRating, { store, localVue });
		wrapper.find('.comment__rating-reduce').trigger('click');
		expect(actions.changeRating).toHaveBeenCalled();
	});
});
