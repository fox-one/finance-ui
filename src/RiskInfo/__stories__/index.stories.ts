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
  .add('Usage with Slot', () => ({
    components: {
      RiskInfo
    },
    data: () => ({
      assetLeft: {
        symbol: 'BTC',
        amount: '$ 7,323,135,026,28'
      },
      assetRight: {
        symbol: 'pUSD',
        amount: '$ 2,64,935,39'
      }
    }),
    template: `<f-panel class="mt-15 text-center">
      <h3 class="mb-4">开始交易 {{assetLeft.symbol}}</h3>
      <p>BTC: 1</p>
      <p>USDT: 100000</p>
      <risk-info
        :asset-left="assetLeft"
        :asset-right="assetRight"
        impact="128 %"
        :countdown="5"
      >
        <template #activator="{ on }">
          <f-button color="warning" v-on="on">Activator</f-button>
        </template>
      </risk-info>
    </f-panel>`
  }))
  .add('Usage with V-Model', () => ({
    components: {
      RiskInfo
    },
    data: () => ({
      assetLeft: {
        symbol: 'pUSD',
        amount: '$ 2,64,935,39'
      },
      assetRight: {
        symbol: 'BTC',
        amount: '$ 7,323,135,026,28'
      },
      isShow: false
    }),
    template: `<f-panel class="mt-15 text-center">
      <h3 class="mb-4">开始交易 {{assetLeft.symbol}}</h3>
      <p>BTC: 1</p>
      <p>USDT: 100000</p>
      <risk-info
        v-model="isShow"
        :asset-left="assetLeft"
        :asset-right="assetRight"
        impact="286 %"
      />
      <f-button color="pink" @click="isShow = true" class="f-greyscale-6" >Model</f-button>
    </f-panel>`
  }))
  .add('Cancel will Reset Countdown', () => ({
    components: {
      RiskInfo
    },
    data: () => ({
      assetLeft: {
        symbol: 'BOX',
        amount: '$ 57,323,135,026,28'
      },
      assetRight: {
        symbol: 'USDT',
        amount: '$ 64,935,39'
      }
    }),
    methods: {
      resetTimer() {
        (this as any).$refs.riskInfo.resetTimer();
      }
    },
    template: `<f-panel class="mt-15 text-center">
      <h3 class="mb-4">开始交易 {{assetLeft.symbol}}</h3>
      <p>BTC: 1</p>
      <p>USDT: 100000</p>
      <risk-info
        :asset-left="assetLeft"
        :asset-right="assetRight"
        impact="128 %"
        :countdown="3"
        ref="riskInfo"
        @cancel:continue="resetTimer"
        @cancel:confirm="resetTimer"
      >
        <template #activator="{ on }">
          <f-button color="warning" v-on="on">Swap</f-button>
        </template>
      </risk-info>
    </f-panel>`
  }))
  .add('With Pando-Leaf Style', () => ({
    components: {
      RiskInfo
    },
    data: () => ({
      customText: {
        continue: {
          title: 'Liquidation Warning',
          highlights: ['Collateral rate has reached', 'Liquidation ratio is 150.00%, reach this you will be liquidatioon']
        }
      },
      customColor: {
        continue: {
          btn_cancel: 'f-bg-greyscale-1'
        }
      }
    }),
    template: `<f-panel class="mt-15 text-center">
      <h3 class="mb-4">开始交易 Pando</h3>
      <p>BTC: 1</p>
      <p>USDT: 100000</p>
      <risk-info
        :custom-text="customText"
        :custom-color="customColor"
        impact="203.8%"
        :countdown="10"
      >
        <template #activator="{ on }">
          <f-button color="warning" v-on="on">Pando</f-button>
        </template>
      </risk-info>
    </f-panel>`
  }));
