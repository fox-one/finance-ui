import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import RiskInfo from '../';

Vue.use(VueCompositionAPI);

describe('RiskInfo', () => {
  it('renders correctly', () => {
    const wrapper = mount(RiskInfo);
    expect(wrapper).toMatchSnapshot();
  });
});
