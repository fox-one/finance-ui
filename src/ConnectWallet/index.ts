import ConnectWallet from './ConnectWallet.tsx';
import type { VueConstructor } from 'vue';

ConnectWallet.install = (app: VueConstructor<Vue>): void => {
  app.component(ConnectWallet.name, ConnectWallet);
};

export default ConnectWallet;
