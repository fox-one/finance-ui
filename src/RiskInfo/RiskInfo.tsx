import {
  defineComponent,
  PropType,
  onMounted
} from '@vue/composition-api';
import { VDialog, VCard, VCardText, VCardActions, VCardTitle } from 'vuetify/lib';
import { FButton } from '@foxone/uikit/src/components/FButton';
import classnames from '@utils/classnames';
/* import types */
import type { CreateElement, VNode } from 'vue';

export interface CUSTOM_TEXT {
  continue?: {
    title?: string;
    highlights?: string[];
    btn_cancel?: string;
    btn_continue?: string;
  };
  confirm?: {
    title?: string;
    content?: string;
    btn_cancel?: string;
    btn_confirm?: string;
  };
}

export interface CUSTOM_COLOR {
  continue?: {
    btn_cancel?: string;
    btn_continue?: string;
  };
  confirm?: {
    btn_cancel?: string;
    btn_confirm?: string;
  };
}

export interface ASSET {
  symbol: string;
  amount: string;
  name?: string;
  price?: string;
}

export default defineComponent({
  name: 'RiskInfo',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'risk-info'
    },
    impact: {
      type: String,
      default: '?%'
    },
    assetLeft: {
      type: Object as PropType<ASSET>,
      default: () => ({})
    },
    assetRight: {
      type: Object as PropType<ASSET>,
      default: () => ({})
    },
    countdown: {
      type: Number,
      default: 0
    },
    customText: {
      type: Object as PropType<CUSTOM_TEXT>,
      default: () => ({ continue: {}, confirm: {} })
    },
    customColor: {
      type: Object as PropType<CUSTOM_COLOR>,
      default: () => ({ continue: {}, confirm: {} })
    }
  },
  setup(props) {
    const classes = classnames(props.prefixCls);
    const isContinue = false;
    const isShow = false;
    const timer = null as null | ReturnType<typeof setTimeout>;
    const count = void 0 as undefined | number;

    onMounted(() => {
      console.info('RiskInfo mounted!');
    });

    return {
      classes,
      isContinue,
      isShow,
      timer,
      count
    };
  },
  computed: {
    hasAssets (): boolean {
      let res = false;
      try {
        res = this.assetLeft && JSON.stringify(this.assetLeft) !== '{}' && this.assetRight && JSON.stringify(this.assetRight) !== '{}';
      } catch (error) {
        res = false;
      }
      return res;
    }
  },
  watch: {
    value: function (val: boolean) {
      this.isShow = val;
      if (val && this.timer === null) this.onCountDown();
    }
  },
  created() {
    this.isShow = this.value;
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  methods: {
    onCountDown() {
      if (this.count === void 0) {
        this.count = this.countdown;
        this.$emit('countdown:init', this.count);
      }
      if (this.count <= 0) {
        this.timer = null;
        return;
      }
      this.timer = setTimeout(() => {
        if (this.count === void 0) return;
        this.count--;
        this.$emit('countdown:update', this.count);
        this.$nextTick(() => this.$forceUpdate());
        this.onCountDown();
      }, 1000);
    },
    resetTimer() {
      setTimeout(() => {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.count = void 0;
      }, 300);
    },
    handleInput (val: any) {
      if (val && this.timer === null) this.onCountDown();
      this.isShow = val;
      this.$emit('change', val);
    },
    handleContinueClick (evt: string) {
      if (evt === 'continue') {
        this.isContinue = true;
      } else {
        this.isShow = false;
        this.$emit('change', false);
      }
      this.$emit(evt);
    },
    handleConfirmClick (evt: string) {
      this.isShow = false;
      this.$emit('change', false);
      this.$emit(evt);
      setTimeout(() => (this.isContinue = false), 300);
    },
  },
  render(h: CreateElement): VNode {
    const scopedSlots = {
      activator: this.$scopedSlots.activator
    };
    const customContinueText = this.customText.continue ?? {};
    const customConfirmText = this.customText.confirm ?? {};
    const customContinueColor = this.customColor.continue ?? {};
    const customConfirmColor = this.customColor.confirm ?? {};

    return (
      <VDialog
        contentClass={this.classes()}
        scopedSlots={scopedSlots}
        vModel={this.isShow}
        overlayOpacity={0.9}
        vOn:input={this.handleInput}
      >
        <VCard class={this.classes('card')}>
          <VCardTitle class={this.classes('card-title', 'justify-center')}>
            <div class={this.classes('title', 'f-greyscale-1 f-title-1')}>
              {this.isContinue
                ? customConfirmText.title || 'Warning'
                : customContinueText.title || 'Confirm transaction'
              }
            </div>
          </VCardTitle>
          <VCardText class='pa-0 px-8'>
            {
              this.isContinue
                ? <div class='d-flex justify-center'>
                  <div class='text-center f-body-1'>
                    { customConfirmText.content || 'Once the transaction is executed, it is irrevocable, please pay after confirmation carefully.' }
                  </div>
                </div>
                : <div class='d-flex flex-column align-center'>
                  <div class={this.classes('highlight', 'pa-4')}>
                    <h3 class={this.classes('highlight-text', 'f-title-3')}>
                      { customContinueText.highlights?.[0] ?? 'Price impact reached' }
                    </h3>
                    <h3 class={this.classes('highlight-impact')}>
                      { this.impact || '%' }
                    </h3>
                    <h4 class={this.classes('highlight-text', 'f-title-3')}>
                      { customContinueText.highlights?.[1] ?? 'It may cause a serious result.' }
                    </h4>
                  </div>
                  {
                    this.hasAssets
                      ? <div class={this.classes('assets', 'd-flex justify-space-between mt-6')}>
                        <div class={this.classes('assets-left', 'd-inline-flex flex-column justify-left')}>
                          <span class={this.classes('assets-left-symbol', 'f-greyscale-1 f-body-2')}>
                            { this.assetLeft?.symbol }
                          </span>
                          <span class={this.classes('assets-left-amount', 'f-greyscale-3 f-caption text-truncate')}>
                            { this.assetLeft?.amount }
                          </span>
                        </div>
                        <div class={this.classes('assets-right', 'd-inline-flex flex-column justify-center')}>
                          <span class={this.classes('assets-right-symbol', 'f-greyscale-1 f-body-2')}>
                            { this.assetRight?.symbol }
                          </span>
                          <span class={this.classes('assets-right-amount', 'f-greyscale-3 f-caption text-truncate')}>
                            { this.assetRight?.amount }
                          </span>
                        </div>
                      </div>
                      : null
                  }
                </div>
            }
          </VCardText>
          <VCardActions class='mt-6 pa-0 align-center justify-center'>
            {
              this.isContinue
                ? <div class='d-flex align-center'>
                  <FButton
                    class={this.classes('action-confirm-btn-cancel', 'pt-6 pb-8')}
                    type='text'
                    color={customConfirmColor?.btn_cancel || 'f-greyscale-6'}
                    vOn:click={() => this.handleConfirmClick('cancel:confirm')}
                  >
                    { customConfirmText?.btn_cancel || 'Cancel' }
                  </FButton>
                  <FButton
                    class={this.classes('action-confirm-btn-confirm', 'pt-6 pb-8')}
                    type='text'
                    color={customConfirmColor?.btn_confirm || 'error'}
                    vOn:click={() => this.handleConfirmClick('confirm')}
                  >
                    { customConfirmText?.btn_confirm || 'Confirm' }
                  </FButton>
                </div>
                : <div class='d-flex flex-column align-center justify-center'>
                  <FButton
                    class={this.classes('action-continue-btn-cancel', customContinueColor?.btn_cancel ? 'f-greyscale-6' : 'white--text')}
                    color={customContinueColor?.btn_cancel || 'pink'}
                    vOn:click={() => this.handleContinueClick('cancel:continue')}
                  >
                    { customContinueText?.btn_cancel || 'Cancel' }
                  </FButton>
                  <FButton
                    class={this.classes('action-continue-btn-continue', 'py-8')}
                    attrs={{ disabled: this.count !== void 0 && this.count > 0 }}
                    type='text'
                    color={customContinueColor?.btn_continue || 'f-greyscale-1'}
                    vOn:click={() => this.handleContinueClick('continue')}
                  >
                    { `${customContinueText?.btn_continue || 'Continue'}${this.count !== void 0 && this.count > 0 ? `(${this.count}s)` : ''}`.trim() }
                  </FButton>
                </div>
            }
          </VCardActions>
        </VCard>
      </VDialog>
    );
  }
});