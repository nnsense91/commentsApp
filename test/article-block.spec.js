import { shallowMount } from '@vue/test-utils';
import articleBlock from '../src/components/articleBlock.vue';

describe('articleBlock', () => {
	it('........', () => {
		const wrapper = shallowMount(articleBlock);
		const msg = wrapper.find('.article__title').text();

		expect(msg).toContain('Article');
	});
});
