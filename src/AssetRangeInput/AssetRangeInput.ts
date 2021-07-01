import {
  Component,
  Vue,
  Prop,
  PropSync,
  Model,
  Watch
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import { format } from '@utils/number';
import { VLayout } from 'vuetify/lib';
import { FAssetAmountInput } from '@foxone/uikit/src/components/FAssetAmountInput';
import { FButton } from '@foxone/uikit/src/components/FButton';
import 'vue-slider-component/theme/default.css';
/* import types */
import type { CreateElement, VNode } from 'vue';
import type { MixinAsset } from '@foxone/uikit/src/components/FAssetAmountInput/types';

// avoid typescript error
const VueSlider = require('vue-slider-component');

@Component
export class AssetRangeInput extends Vue {
  @Model('input', { type: [String, Number], default: '' }) public readonly value!: string | number;

  @Prop({ type: Number, default: 0 }) private min!: number;
  @Prop({ type: Number, default: Infinity }) private max!: number;
  @Prop({ type: String, default: '' }) private className!: string;
  @Prop({ type: String, default: 'primary' }) private color!: string;

  @Prop({ type: Boolean, default: true }) private selectable!: boolean;
  @Prop({ type: Boolean, default: false }) private border!: boolean;
  @Prop({ type: Boolean, default: false }) private loading!: boolean;
  @Prop({ type: Array, default: () => [] }) private assets!: MixinAsset[];
  @PropSync('asset') private bindAsset!: MixinAsset | null;
  @Prop({ type: Object, default: () => ({}) }) private inputTips!: {
    amount?: number;
    amountSymbol?: string;
    tipLeft?: string;
    tipRight: string;
  }

  @Prop({ type: String, default: 'Ratio' }) private ratioText!: string;
  @Prop({ type: String, default: 'Confirm' }) private btnText!: string;

  private _value_input: string | number = '';
  private _value_slider: string | number = 0;


  private get hasInputLeftTips() {
    return !!(this.inputTips?.amount || this.inputTips?.amountSymbol || this.inputTips?.tipLeft);
  }

  private get hasUpperLimit() {
    return this.max && (1 / this.max);
  }

  private isInRange(val: number) {
    return val >= this.min && (!this.hasUpperLimit || val <= this.max);
  }

  private setSliderValueWithLimit(val: number) {
    if (this.hasUpperLimit && typeof val === 'number') {
      let _val = val / this.max * 100;
      if (_val > 100) _val = 100;
      if (_val < 0) _val = 0;
      this._value_slider = format({
        n: _val,
        p: 2
      });
    }
  }

  @Watch('value')
  public handleValueChange(val: string) {
    if (!this.isInRange(+val)) this.$emit('error:limit');
    this._value_input = val;
    this.setSliderValueWithLimit(+val);
  }

  public created() {
    if (!this.isInRange(+this.value)) this.$emit('error:limit');
    this._value_input = this.value;
    this.setSliderValueWithLimit(+this.value);
  }

  public render(h: CreateElement): VNode {
    const btn = this.$slots.button;
    const slider = this.$slots.slider;
    const activator = this.$scopedSlots.activator;
    const classes = classnames('asset-range-input');
    return h(
      VLayout,
      {
        staticClass: classes(),
        class: this.className,
        attrs: {
          column: true,
          'align-center': true
        }
      },
      [
        // top section
        h(
          'div',
          {
            staticClass: classes('top')
          },
          [
            // FAssetAmountInput
            h(
              FAssetAmountInput,
              {
                props: {
                  value: this._value_input,
                  assets: this.assets,
                  asset: this.bindAsset,
                  selectable: this.selectable,
                  border: this.border,
                  loading: this.loading,
                },
                attrs: {
                  ...this.$attrs
                },
                on: {
                  ...this.$listeners,
                  input: (val, e) => {
                    if (!this.isInRange(+val)) this.$emit('error:limit');
                    this._value_input = val;
                    this.$emit('input', val);
                    if (!this.value) this.$nextTick(() => this.$forceUpdate());
                    this.setSliderValueWithLimit(+val);
                  }
                },
                scopedSlots: {
                  activator
                },
              }
            ),
            // tips
            h(
              VLayout,
              {
                staticClass: classes('top-tips', 'mt-2 f-greyscale-3 f-caption'),
                attrs: {
                  'justify-space-between': true,
                  'align-center': true
                }
              },
              [
                this.hasInputLeftTips ? h(
                  'div',
                  {
                    staticClass: classes('top-tips-left')
                  },
                  [
                    this.inputTips?.tipLeft ? h(
                      'span',
                      {
                        staticClass: classes('top-tips-left-txt', 'mr-1')
                      },
                      [this.inputTips?.tipLeft]
                    ) : null,
                    this.inputTips?.amount ? h(
                      'span',
                      {
                        staticClass: classes('top-tips-left-amount', 'f-greyscale-1 font-weight-bold'),
                        on: {
                          click: () => {
                            if (!this.isInRange(+this.inputTips?.amount!)) this.$emit('error:limit');
                            this._value_input = `${this.inputTips?.amount!}`;
                            this.setSliderValueWithLimit(+this._value_input);
                            this.$emit('input', this._value_input);
                            this.$emit('click:amount');
                            this.$nextTick(() => this.$forceUpdate());
                          }
                        }
                      },
                      `${this.inputTips?.amount}${this.inputTips?.amountSymbol ?? ''}`
                    ) : null,
                  ]
                ) : null,
                this.inputTips?.tipRight ? h(
                  'div',
                  {
                    staticClass: classes('top-tips-right')
                  },
                  [this.inputTips.tipRight]
                ) : null
              ]
            )
          ]
        ),
        // slider sction
        h(
          'div',
          {
            staticClass: classes('mid', 'my-8')
          },
          slider ?? [
            h(
              VLayout,
              {
                staticClass: classes('mid-tips', 'mb-5 f-greyscale-3 f-body-2'),
                attrs: {
                  'justify-space-between': true,
                  'align-center': true
                }
              },
              [
                h(
                  'span',
                  this.ratioText
                ),
                h(
                  'span',
                  {
                    staticClass: 'f-greyscale-1 font-weight-bold',
                  },
                  `${this._value_slider ?? 0}%`
                )
              ]
            ),
            h(
              VueSlider,
              {
                props: {
                  value: this._value_slider,
                  height: 8,
                  min: 0,
                  max: 100,
                  interval: 0.01,
                  lazy: true,
                  tooltip: 'none',
                  contained: true
                },
                on: {
                  change: val => {
                    this._value_slider = +val;
                    if (this.hasUpperLimit) this._value_input = format({
                      n: +val / 100 * this.max,
                      p: 8
                    });
                    this.$nextTick(() => this.$forceUpdate());
                  }
                }
              }
            )
          ]
        ),
        // btn section
        btn ?? h(
          FButton,
          {
            staticClass: 'px-8 py-4',
            props: {
              color: this.color,

            },
            attrs: {
              disabled: !this.isInRange(+this._value_input)
            },
            on: {
              click: () => {
                this.$emit('click:button');
              }
            }
          },
          this.btnText
        )
      ]
    );
  }
}

export default AssetRangeInput;