import {
  defineComponent,
  PropType,
  onMounted
} from '@vue/composition-api';
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

export interface INPUT_TIPS {
  amount?: number;
  amountSymbol?: string;
  tipLeft?: string;
  tipRight: string;
}

export type ERROR = string | ((value: number | string) => string | VNode) | VNode;

export default defineComponent({
  name: 'AssetRangeInput',

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: 'primary'
    },
    disabledInput: {
      type: Boolean,
      default: void 0
    },
    disabledSlider: {
      type: Boolean,
      default: void 0
    },
    disabledBtn: {
      type: Boolean,
      default: void 0
    },
    selectable: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    assets: {
      type: Array as PropType<MixinAsset[]>,
      default: () => []
    },
    asset: {
      type: Object as PropType<MixinAsset>,
      default: () => ({})
    },
    inputTips: {
      type: Object as PropType<INPUT_TIPS>,
      default: () => ({})
    },
    error: {
      type: [String, Function] as PropType<ERROR>,
      default: ''
    },
    ratioText: {
      type: String,
      default: 'Ratio'
    },
    showSlider: {
      type: Boolean,
      default: true
    },
    btnText: {
      type: String,
      default: 'Confirm'
    },
    showBtn: {
      type: Boolean,
      default: true
    },
  },

  setup(props) {
    const classes = classnames('asset-range-input');

    onMounted(() => {
      console.info('AssetRangeInput mounted!');
    });

    return {
      classes
    };
  },

  data: () => {
    const _value_input = '' as string | number;
    const _value_slider = 0 as string | number;
    return {
      _value_input,
      _value_slider
    };
  },

  computed: {
    bindAsset: {
      get(): MixinAsset {
        return this.asset;
      },
      set(val) {
        this.$emit('update:asset', val);
      }
    },
    hasInputLeftTips(): boolean {
      return !!(this.inputTips?.amount || this.inputTips?.amountSymbol || this.inputTips?.tipLeft);
    },
    hasUpperLimit(): number {
      return this.max && (1 / this.max);
    }
  },

  watch: {
    value: function (val: string) {
      if (!this.isInRange(+val)) this.$emit('error:limit');
      this._value_input = val;
      this.setSliderValueWithLimit(+val);
    }
  },

  created() {
    if (!this.isInRange(+this.value)) this.$emit('error:limit');
    this._value_input = this.value;
    this.setSliderValueWithLimit(+this.value);
  },

  methods: {
    isInRange(val: number) {
      return val >= this.min && (!this.hasUpperLimit || val <= this.max);
    },
    setSliderValueWithLimit(val: number) {
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
  },

  render(h: CreateElement): VNode {
    const btn = this.$slots.button;
    const slider = this.$slots.slider;
    const inputTips = this.$slots.inputTips;
    const sliderTips = this.$slots.sliderTips;
    const scopedSlots = {
      activator: this.$scopedSlots.activator
    };

    return (
      <VLayout
        class={this.classes()}
        attrs={{
          column: true,
          'align-center': true
        }}
      >
        <div class={this.classes('top')}>
          <FAssetAmountInput
            vModel={this._value_input}
            assets={this.assets}
            asset={this.bindAsset}
            selectable={this.selectable}
            border={this.border}
            loading={this.loading}
            vOn:input={(val, e) => {
              if (!this.isInRange(+val)) this.$emit('error:limit');
              this._value_input = val;
              this.$emit('input', val);
              if (!this.value) this.$nextTick(() => this.$forceUpdate());
              this.setSliderValueWithLimit(+val);
            }}
            listeners={{
              ...this.$listeners
            }}
            attrs={{
              ...this.$attrs,
              disabled: this.disabledInput
            }}
            scopedSlots={scopedSlots}
          />
          {
            inputTips ?? <VLayout
              class={this.classes('top-tips', 'mt-2 f-greyscale-3 f-caption')}
              attrs={{
                'justify-space-between': true,
                'align-center': true
              }}
            >
              {
                this.hasInputLeftTips
                  ? <div class={this.classes('top-tips-left')}>
                    {
                      this.inputTips?.tipLeft
                        ? <span class={this.classes('top-tips-left-txt', 'mr-1')}>
                          { this.inputTips?.tipLeft }
                        </span>
                        : null
                    }
                    {
                      this.inputTips?.amount
                        ? <span
                          class={this.classes('top-tips-left-amount', 'f-greyscale-1 font-weight-bold')}
                          vOn:click={() => {
                            if (!this.isInRange(+this.inputTips?.amount!)) this.$emit('error:limit');
                            this._value_input = `${this.inputTips?.amount!}`;
                            this.setSliderValueWithLimit(+this._value_input);
                            this.$emit('input', this._value_input);
                            this.$emit('click:amount');
                            this.$nextTick(() => this.$forceUpdate());
                          }}
                        >
                          { `${this.inputTips?.amount}${this.inputTips?.amountSymbol ?? ''}` }
                        </span>
                        : null
                    }
                  </div>
                  : null
              }
              {
                this.inputTips?.tipRight
                  ? <div class={this.classes('top-tips-right')}>
                    { this.inputTips.tipRight }
                  </div>
                  : null
              }
            </VLayout>
          }
          {
            this.error
              ? <div class={this.classes('top-error', 'f-caption pt-2')}>
                { typeof this.error === 'function' ? this.error(this._value_input) : this.error }
              </div>
              : <div class={this.classes('top-error-placeholder')} />
          }
        </div>

        {
          this.showSlider
            ? <div class={this.classes('mid', 'mb-8')}>
                {
                  sliderTips ?? <VLayout
                    class={this.classes('mid-tips', 'mb-5 f-greyscale-3 f-body-2')}
                    attrs={{
                      'justify-space-between': true,
                      'align-center': true
                    }}
                  >
                    <span>{ this.ratioText }</span>
                    <span class='f-greyscale-1 font-weight-bold'>{ `${this._value_slider ?? 0}%` }</span>
                  </VLayout>
                }
                {
                  slider ?? <VueSlider
                    vModel={this._value_slider}
                    height={8}
                    min={0}
                    max={100}
                    interval={0.01}
                    lazy={true}
                    tooltip='none'
                    contained={true}
                    disabled={this.disabledSlider}
                    vOn:change={
                      val => {
                        this._value_slider = +val;
                        if (this.hasUpperLimit) {
                          this._value_input = format({
                            n: +val / 100 * this.max,
                            p: 8
                          });
                          this.$emit('input', this._value_input);
                        }
                        this.$nextTick(() => this.$forceUpdate());
                      }
                    }
                  />
                }
              </div>
            : null
        }

        {
          this.showBtn
            ? btn ?? <FButton
              class='px-8 py-4'
              color={this.color}
              attrs={{
                disabled: this.disabledBtn !== void 0 ? this.disabledBtn : !this.isInRange(+this._value_input)
              }}
              vOn:click={() => this.$emit('click:button')}
            >
              { this.btnText }
            </FButton>
            : null
        }
      </VLayout>
    );
  }
});