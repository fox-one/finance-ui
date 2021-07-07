import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import RiskSlider from '../';

Vue.use(VueCompositionAPI);

describe('RiskSlider', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(RiskSlider);
    expect(wrapper).toMatchSnapshot();
  });
});
