import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import { RiskInfo } from '../';
import '../style';

storiesOf('RiskInfo', module)
  .addParameters({
    readme: {
      sidebar: require('../README.md').default,
      highlightSidebar: true,
      codeTheme: 'github'
    },
    options: { theme: themes.light },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6'
    }
  })
  .add('Usage with slot', () => ({
    components: {
      RiskInfo
    },
    data: () => ({
      assetLeft: {
        symbol: 'BTC',
        price: '$ 7,323,135,026,28'
      },
      assetRight: {
        symbol: 'pUSD',
        price: '$ 2,64,935,39'
      }
    }),
    template: `<f-panel class="mt-15 text-center">
      <h3 class="mb-4">开始交易 {{assetLeft.symbol}}</h3>
      <p>BTC: 1</p>
      <p>USDT: 100000</p>
      <RiskInfo
        :asset-left="assetLeft"
        :asset-right="assetRight"
      >
        <template #activator="{ on }">
          <f-button color="warning" v-on="on">Activator</f-button>
        </template>
      </RiskInfo>
    </f-panel>`
  }))
  .add('Usage with v-model', () => ({
    components: {
      RiskInfo
    },
    data: () => ({
      assetLeft: {
        symbol: 'pUSD',
        price: '$ 2,64,935,39'
      },
      assetRight: {
        symbol: 'BTC',
        price: '$ 7,323,135,026,28'
      },
      isShow: false
    }),
    template: `<f-panel class="mt-15 text-center">
      <h3 class="mb-4">开始交易 {{assetLeft.symbol}}</h3>
      <p>BTC: 1</p>
      <p>USDT: 100000</p>
      <RiskInfo
        v-model="isShow"
        :asset-left="assetLeft"
        :asset-right="assetRight"
      />
      <f-button color="pink" @click="isShow = true" class="f-greyscale-6" >Model</f-button>
    </f-panel>`
  }));
