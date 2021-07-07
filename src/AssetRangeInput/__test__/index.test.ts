import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import AssetRangeInput from '../';

Vue.use(VueCompositionAPI);

describe('AssetRangeInput', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(AssetRangeInput);
    expect(wrapper).toMatchSnapshot();
  });
});
