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

export type SCALE = 'low' | 'mid' | 'high';

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
    if (val <= this.getScaleRatio('low')) {
      return 'low';
    } else if (val <= (this.getScaleRatio('low') + this.getScaleRatio('mid'))) {
      return 'mid';
    } else {
      return 'high';
    }
  }

  public getScaleRatio (scale: SCALE) {
    const { low, mid, high } = this.scale;
    const total = low + mid + high;
    return this.scale[scale] / total;
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
                'background': `linear-gradient(to right, ${color.low} 0% ${this.getScaleRatio('low') * 100}%, ${color.mid} ${this.getScaleRatio('low') * 100}% ${(this.getScaleRatio('low') + this.getScaleRatio('mid')) * 100}%, ${color.high} ${(this.getScaleRatio('low') + this.getScaleRatio('mid')) * 100}% 100%)`
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