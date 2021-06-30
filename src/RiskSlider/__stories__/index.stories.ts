import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import { RiskSlider } from '../';
import '../style';

storiesOf('RiskSlider', module)
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
  .add('Basic Usage', () => ({
    components: {
      RiskSlider
    },
    data: () => ({
      precent: 74.5,
      tips: {
        tip: 'Collateralization Ration reach',
        highlight: '182.5%, it’s in Mid-risk now.'
      }
    }),
    template: `<risk-slider v-model="precent" :tips="tips" />`
  }));
