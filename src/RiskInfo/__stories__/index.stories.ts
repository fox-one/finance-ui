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
  .add('basic usage', () => ({
    components: {
      RiskInfo
    },
    template: `<f-panel class="mt-15 text-center">
      <h3 class="mb-4">开始交易</h3>
      <p>BTC: 1</p>
      <p>USDT: 100000</p>
      <RiskInfo>
        <template #activator="{ on }">
          <f-button  v-on="on">Swap</f-button>
        </template>
      </RiskInfo>
    </f-panel>`
  }));
