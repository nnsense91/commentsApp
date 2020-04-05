import { shallowMount } from '@vue/test-utils';
import commentsBlock from '../src/components/commentsBlock.vue';

describe('commentsBock', () => {
	it('shows markdown support description on mouse hover', () => {
		const wrapper = shallowMount(commentsBlock);
		wrapper.setData({ isLegendShow: true })

		expect(wrapper.contains('.comments__legend')).toBe(true)
	})
});