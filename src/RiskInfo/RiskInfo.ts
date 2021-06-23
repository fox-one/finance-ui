import {
  Component,
  Vue,
  Prop,
  Watch,
  Model
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import { $t } from '@utils/t';
import { VDialog, VCard, VCardText, VCardActions, VCardTitle } from 'vuetify/lib';
import { FButton } from '@foxone/uikit/src/components/FButton';
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

export interface ASSET {
  symbol: string;
  amount: string;
  name?: string;
  price?: string;
}

@Component
export class RiskInfo extends Vue {
  @Model('change', { default: false }) public value!: boolean;
  @Prop({ type: String, default: '' }) private className!: string;
  @Prop({ type: String, default: '?%' }) private impact!: string;
  @Prop({ type: Object, default: () => ({}) }) private assetLeft!: ASSET;
  @Prop({ type: Object, default: () => ({}) }) private assetRight!: ASSET;
  @Prop({ type: Number, default: 0 }) private countdown!: number;
  @Prop({ type: Object, default: () => ({ continue: {}, confirm: {} }) }) private customText!: CUSTOM_TEXT;

  private isContinue = false;
  private isShow = false;
  private timer: null | ReturnType<typeof setTimeout> = null;
  private count = 0;

  private get hasAssets () {
    let res = false;
    try {
      res = JSON.stringify(this.assetLeft) !== '{}' && JSON.stringify(this.assetRight) !== '{}';
    } catch (error) {
      res = false;
    }
    return res;
  }

  private get _countdown () {
    return this.count;
  }

  private onCountDown () {
    if (this.count <= 0) {
      this.timer = null;
      return;
    }
    this.timer = setTimeout(() => {
      this.count--;
      this.onCountDown();
    }, 1000);
  }

  public resetTimer () {
    setTimeout(() => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.count = this.countdown;
    }, 300);
  }

  @Watch('value')
  public handleValueChange (val: boolean) {
    this.isShow = val;
  }

  public created () {
    this.isShow = this.value;
    this.count = this.countdown;
  }

  public beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public render(h: CreateElement): VNode {
    const activator = this.$scopedSlots.activator;
    const customContinueText = this.customText.continue ?? {};
    const customConfirmText = this.customText.confirm ?? {};

    const classes = classnames('risk-info');
    return h(
      VDialog,
      {
        staticClass: classes(),
        class: this.className,
        scopedSlots: {
          activator: ({ on, attrs }) => {
            return (activator && activator({ on, attrs })) || null;
          },
        },
        props: {
          value: this.isShow
        },
        on: {
          input: (val: any) => {
            if (val && this.timer === null) this.onCountDown();
            this.isShow = val;
            this.$emit('change', val);
          },
        },
      },
      [
        h(
          VCard,
          {
            staticClass: classes('card'),
          },
          [
            h(
              VCardTitle,
              {
                staticClass: classes('card-title', 'justify-center'),
              },
              [
                h(
                  'div',
                  {
                    staticClass: classes('title', 'f-greyscale-1 f-title-1')
                  },
                  [customContinueText.title || $t(this, this.isContinue ? 'risk_info_confirm_title' : 'warning')]
                )
              ]
            ),
            h(
              VCardText,
              {
                staticClass: 'pa-0 px-8'
              },
              [
                this.isContinue
                  ? h(
                    'div',
                    {
                      staticClass: 'd-flex justify-center'
                    },
                    [
                      h(
                        'div',
                        {
                          staticClass: 'text-center f-body-1'
                        },
                        [customConfirmText.content || $t(this, 'risk_info_confirm_content')]
                      )
                    ]
                  )
                  : h(
                    'div',
                    {
                      staticClass: 'd-flex flex-column align-center'
                    },
                    [
                      h(
                        'div',
                        {
                          staticClass: classes('highlight', 'pa-4')
                        },
                        [
                          h(
                            'h3',
                            {
                              staticClass: classes('highlight-text', 'f-title-3')
                            },
                            customContinueText.highlights?.[0] ?? 'Price impact reached'
                          ),
                          h(
                            'h3',
                            {
                              staticClass: classes('highlight-impact')
                            },
                            this.impact || '%'
                          ),
                          h(
                            'h4',
                            {
                              staticClass: classes('highlight-text', 'f-title-3')
                            },
                            customContinueText.highlights?.[1] ?? 'It may cause a serious result.'
                          )
                        ]
                      ),
                      this.hasAssets ? h(
                        'div',
                        {
                          staticClass: classes('assets', 'd-flex justify-space-between mt-6')
                        },
                        [
                          h(
                            'div',
                            {
                              staticClass: classes('assets-left', 'd-inline-flex flex-column justify-left')
                            },
                            [
                              h(
                                'span',
                                {
                                  staticClass: classes('assets-left-symbol', 'f-greyscale-1 f-body-2')
                                },
                                [this.assetLeft.symbol]
                              ),
                              h(
                                'span',
                                {
                                  staticClass: classes('assets-left-amount', 'f-greyscale-3 f-caption text-truncate')
                                },
                                [this.assetLeft.amount]
                              )
                            ]
                          ),
                          h(
                            'div',
                            {
                              staticClass: classes('assets-right', 'd-inline-flex flex-column justify-center')
                            },
                            [
                              h(
                                'span',
                                {
                                  staticClass: classes('assets-right-symbol', 'f-greyscale-1 f-body-2')
                                },
                                [this.assetRight.symbol]
                              ),
                              h(
                                'span',
                                {
                                  staticClass: classes('assets-right-amount', 'f-greyscale-3 f-caption text-truncate')
                                },
                                [this.assetRight.amount]
                              )
                            ]
                          )
                        ]
                      ) : null
                    ]
                  )
              ]
            ),
            h(
              VCardActions,
              {
                staticClass: 'mt-6 pa-0 align-center justify-center'
              },
              [
                this.isContinue
                  ? h(
                    'div',
                    {
                      staticClass: 'd-flex align-center'
                    },
                    [
                      h(
                        FButton,
                        {
                          staticClass: classes('action-confirm-btn-cancel', 'pt-6 pb-8'),
                          props: {
                            type: 'text',
                            color: 'f-greyscale-6'
                          },
                          on: {
                            click: () => {
                              this.isShow = false;
                              this.$emit('change', false);
                              this.$emit('cancel:confirm');
                              setTimeout(() => (this.isContinue = false), 500);
                            }
                          }
                        },
                        customConfirmText?.btn_cancel || $t(this, 'cancel')
                      ),
                      h(
                        FButton,
                        {
                          staticClass: classes('action-confirm-btn-confirm', 'pt-6 pb-8'),
                          props: {
                            type: 'text',
                            color: 'error'
                          },
                          on: {
                            click: () => {
                              this.isShow = false;
                              this.$emit('change', false);
                              this.$emit('confirm');
                              setTimeout(() => (this.isContinue = false), 500);
                            }
                          }
                        },
                        customConfirmText?.btn_confirm || $t(this, 'confirm')
                      )
                    ]
                  )
                  : h(
                    'div',
                    {
                      staticClass: 'd-flex flex-column align-center justify-center'
                    },
                    [
                      h(
                        FButton,
                        {
                          staticClass: classes('action-continue-btn-cancel', 'f-greyscale-6'),
                          props: {
                            color: 'pink'
                          },
                          on: {
                            click: () => {
                              this.isShow = false;
                              this.$emit('change', false);
                              this.$emit('cancel:continue');
                            }
                          }
                        },
                        customContinueText?.btn_cancel || $t(this, 'cancel')
                      ),
                      h(
                        FButton,
                        {
                          staticClass: classes('action-continue-btn-continue', 'py-8'),
                          attrs: {
                            disabled: this._countdown > 0
                          },
                          props: {
                            type: 'text',
                            color: 'f-greyscale-1'
                          },
                          on: {
                            click: () => {
                              this.isContinue = true;
                              this.$emit('continue');
                            }
                          }
                        },
                        `${customContinueText?.btn_continue || $t(this, 'continue')}${this._countdown > 0 ? `(${this._countdown}s)` : ''}`.trim()
                      )
                    ]
                  )
              ]
            )
          ]
        )
      ]
    );
  }
}

export default RiskInfo;