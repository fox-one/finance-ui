import ConnectWallet from './ConnectWallet';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type ConnectWallet = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(ConnectWallet as ConnectWallet).install = (app: VueConstructor<Vue>): void => {
  app.component(ConnectWallet.name, ConnectWallet);
};

export default ConnectWallet;
