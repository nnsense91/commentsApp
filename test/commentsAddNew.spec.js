import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import commentsAddNew from '../src/components/commentsAddNew.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('commentsAddNew', () => {
	it('Событие blur на input вызывает проверку на валидацию', () => {
		const wrapper = shallowMount(commentsAddNew);
		wrapper.setData({
			formInputValid: {
				name: false,
				email: false,
				text: false,
			},
		});

		wrapper.find('#name').setValue('test');
		wrapper.find('#name').trigger('blur');
		expect(wrapper.vm.formInputValid.name).toBe(true);

		wrapper.find('#name').setValue('');
		wrapper.find('#name').trigger('blur');
		expect(wrapper.vm.formInputValid.name).toBe(false);

		wrapper.find('#email').setValue('test@test.ru');
		wrapper.find('#email').trigger('blur');
		expect(wrapper.vm.formInputValid.email).toBe(true);

		wrapper.find('#email').setValue('test');
		wrapper.find('#email').trigger('blur');
		expect(wrapper.vm.formInputValid.email).toBe(false);

		wrapper.find('#email').setValue('');
		wrapper.find('#email').trigger('blur');
		expect(wrapper.vm.formInputValid.email).toBe(false);

		wrapper.find('#text').setValue('test');
		wrapper.find('#text').trigger('blur');
		expect(wrapper.vm.formInputValid.text).toBe(true);

		wrapper.find('#text').setValue('');
		wrapper.find('#text').trigger('blur');
		expect(wrapper.vm.formInputValid.text).toBe(false);
	});

	it('Проверка валидности формы (computed св-во isFormValid) - зависит от валидности каждого input', () => {
		const localThis = {
			formInputValid: {
				name: false,
				email: false,
				text: false,
			},
		};
		expect(commentsAddNew.computed.isFormValid.call(localThis)).toBe(false);

		localThis.formInputValid.name = true;
		expect(commentsAddNew.computed.isFormValid.call(localThis)).toBe(false);

		localThis.formInputValid.email = true;
		expect(commentsAddNew.computed.isFormValid.call(localThis)).toBe(false);

		localThis.formInputValid.text = true;
		expect(commentsAddNew.computed.isFormValid.call(localThis)).toBe(true);
	});
});

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
		const wrapper = shallowMount(commentsAddNew, {
			store,
			localVue,
			computed: {
				isFormValid() {
					return true;
				},
			},
		});

		wrapper.find('.new-comment__submit').trigger('click');
		expect(actions.addComment).toHaveBeenCalled();
	});
});
