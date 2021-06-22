import {
  Component,
  Vue,
  Prop
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
  name?: string;
  symbol: string;
  amount?: string;
  price: string;
}

@Component
export class RiskInfo extends Vue {
  @Prop({ type: String, default: '' }) private className!: string;
  @Prop({ type: String, default: '?%' }) private impact!: string;
  @Prop({ type: Object, default: () => ({}) }) private assetLeft!: ASSET;
  @Prop({ type: Object, default: () => ({}) }) private assetRight!: ASSET;
  @Prop({ type: Number, default: 300 }) private countdown!: number;
  @Prop({ type: Object, default: () => ({ continue: {}, confirm: {} }) }) private customText!: CUSTOM_TEXT;

  private isContinue = false;

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
                staticClass: 'justify-center',
              },
              [
                h(
                  'div',
                  {
                    staticClass: `${classes('title')} f-greyscale-1 f-title-1`
                  },
                  [customContinueText.title || $t(this, 'warning')]
                )
              ]
            ),
            h(
              VCardText,
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
                          staticClass: classes('highlight')
                        },
                        [
                          h(
                            'h3',
                            customContinueText.highlights?.[0] ?? 'Price impact reached'
                          ),
                          h(
                            'h3',
                            this.impact || '%'
                          ),
                          h(
                            'h4',
                            customContinueText.highlights?.[1] ?? 'It may cause a serious result.'
                          )
                        ]
                      ),
                      h(
                        'div',
                        {
                          staticClass: classes('assets')
                        },
                        [
                          h(
                            'div',
                            {
                              staticClass: classes('assets-left')
                            },
                            [
                              h(
                                'span',
                                {
                                  staticClass: classes('assets-left-symbol')
                                },
                                [this.assetLeft.symbol]
                              ),
                              h(
                                'span',
                                {
                                  staticClass: classes('assets-left-price')
                                },
                                [this.assetLeft.price]
                              )
                            ]
                          ),
                          h(
                            'div',
                            {
                              staticClass: classes('assets-right')
                            },
                            [
                              h(
                                'span',
                                {
                                  staticClass: classes('assets-right-symbol')
                                },
                                [this.assetRight.symbol]
                              ),
                              h(
                                'span',
                                {
                                  staticClass: classes('assets-right-price')
                                },
                                [this.assetRight.price]
                              )
                            ]
                          )
                        ]
                      )
                    ]
                  )
              ]
            ),
            h(
              VCardActions,
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
                          props: {
                            type: 'text',
                            color: 'f-greyscale-6'
                          },
                          on: {
                            click: () => {
                              this.isContinue = false;
                              this.$emit('cancel');
                            }
                          }
                        },
                        this.customText?.confirm?.btn_cancel || $t(this, 'cancel')
                      ),
                      h(
                        FButton,
                        {
                          props: {
                            type: 'text',
                            color: 'error'
                          },
                          on: {
                            click: () => {
                              this.isContinue = false;
                              this.$emit('confirm');
                            }
                          }
                        },
                        this.customText?.confirm?.btn_confirm || $t(this, 'confirm')
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
                        FButton,
                        {
                          staticClass: 'f-greyscale-6',
                          props: {
                            color: 'pink'
                          },
                          on: {
                            click: () => this.$emit('cancel')
                          }
                        },
                        this.customText?.continue?.btn_cancel || $t(this, 'cancel')
                      ),
                      h(
                        FButton,
                        {
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
                        this.customText?.continue?.btn_continue || $t(this, 'continue')
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