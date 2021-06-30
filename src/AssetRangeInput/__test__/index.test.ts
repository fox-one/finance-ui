import { shallowMount, mount } from '@vue/test-utils';
import AssetRangeInput from '../';

describe('AssetRangeInput', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(AssetRangeInput);
    expect(wrapper).toMatchSnapshot();
  });
});
