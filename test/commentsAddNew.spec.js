import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import commentsAddNew from '../src/components/commentsAddNew.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('commentsAddNew, обращения к store', () => {
	let actions;
	let store;

	beforeEach(() => {
		actions = {
			addComment: jest.fn(),
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

	it('вызывает действие хранилища "addComment" по нажатию кнопки "Добавить комментарий", при условии валидности формы', () => {
		const wrapper = shallowMount(commentsAddNew, { store, localVue, 
			computed: {
				isFormValid() {
					return true;
				}
			}
		});

		wrapper.find('.new-comment__submit').trigger('click');
		expect(actions.addComment).toHaveBeenCalled();
	});
});
