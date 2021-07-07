import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import ConnectWallet from '../';

Vue.use(VueCompositionAPI);

describe('ConnectWallet', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ConnectWallet);
    expect(wrapper).toMatchSnapshot();
  });
});
