import { shallowMount } from '@vue/test-utils'
import articleBlock from '../src/components/article-block.vue'

describe('articleBlock', () => {
	it('........', () => {
	const wrapper = shallowMount(articleBlock)
	  const msg = wrapper.find('.article__title').text()
	  console.log(msg);

	  expect(msg).toBe('Article Title')
	})
  })
  