import {
  Component,
  Vue,
  Prop,
  Model
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import 'vue-slider-component/theme/default.css';
/* import types */
import type { CreateElement, VNode } from 'vue';

// avoid typescript error
const VueSlider = require('vue-slider-component');

@Component
export class RiskSlider extends Vue {
  @Model('change', { type: [String, Number], default: '' }) public readonly value!: string | number;

  @Prop({ type: String, default: '' }) private className!: string;
  @Prop({ type: Boolean, default: true }) private disabled!: boolean;
  @Prop({
    type: Object, default: () => ({
      low: 0.7,
      mid: 0.15,
      high: 0.15
    })
  }) private scale!: {
    low: number;
    mid: number;
    high: number;
  }
  @Prop({ type: Object, default: () => ({}) }) private tips!: {
    tip?: string;
    highlight?: string;
  }

  private get isDark() {
    return this.$vuetify?.theme?.dark;
  }

  private get colors() {
    return {
      dark: {
        low: '#56D471',
        mid: '#F79F4D',
        high: '#F67070'
      },
      light: {
        low: '#2CC94E',
        mid: '#F58721',
        high: '#F44C4C'
      }
    };
  }

  public get currentScale() {
    const val = +this.value / 100;
    if (val <= this.scale.low) {
      return 'low';
    } else if (val <= (this.scale.low + this.scale.mid)) {
      return 'mid';
    } else {
      return 'high';
    }
  }

  public render(h: CreateElement): VNode {
    const content = this.$slots.default;
    const classes = classnames('risk-slider');
    const color = this.colors[this.isDark ? 'dark' : 'light'];
    return h(
      'div',
      {
        staticClass: classes(),
        class: this.className
      },
      [
        h(
          VueSlider,
          {
            props: {
              value: this.value,
              height: 8,
              min: 0,
              max: 100,
              interval: 0.01,
              lazy: true,
              tooltip: 'none',
              disabled: this.disabled,
              railStyle: {
                'background': `linear-gradient(to right, ${color.low} 0% ${this.scale.low * 100}%, ${color.mid} ${this.scale.low * 100}% ${(this.scale.low + this.scale.mid) * 100}%, ${color.high} ${(this.scale.low + this.scale.mid) * 100}% 100%)`
              }
            }
          }
        ),
        content ?? h(
          'div',
          {
            staticClass: classes('tips', 'f-greyscale-3 f-caption')
          },
          [
            h(
              'span',
              this.tips.tip
            ),
            h(
              'span',
              {
                staticClass: classes('tips-highlight', 'font-weight-bold'),
                style: {
                  color: color[this.currentScale]
                }
              },
              this.tips.highlight
            )
          ]
        )
      ]
    );
  }
}

export default RiskSlider;