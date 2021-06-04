import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import { CheckOut } from '../';
import '../style';

storiesOf('CheckOut', module)
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
  .add('Simple Example', () => ({
    components: {
      CheckOut
    },
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      handleClick() {
        const self = this as any;
        self.isShow = !self.isShow;
      },
      handleChange(val) {
        console.log('onchange value: ', val);
      }
    },
    template: `<section>
        <p class="mt-10 text-center">各种信息介绍……</p>
        <p class="text-center">各种信息介绍……</p>
        <p class="text-center">各种信息介绍……</p>
        <p class="text-center">各种信息介绍……</p>
        <p class="text-center">各种信息介绍……</p>
        <p class="text-center">各种信息介绍……</p>
        <p class="text-center">各种信息介绍……</p>
        <p class="text-center">大佬快快入群！！！</p>
        <div style="position: absolute; bottom: 20vh; left: 50%; transform: translate(-50%, 0);">
          <v-btn @click="handleClick" color="primary">点我入群</v-btn>
          <CheckOut
            v-model="isShow"
            title="支付入群费"
            subtitle="超级便宜，只要1999.99个BTC"
            @change="handleChange"
          >
            {{'Hello CheckOut'}}
          </CheckOut>
        </div>
      </section>`
  }));
