import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import { $t } from '@utils/t';
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
@Component
export class RiskInfo extends Vue {
  @Prop({ type: String, default: '' }) private className!: string;
  @Prop({ type: String, default: '?%' }) private impact!: string;
  @Prop({ type: Number, default: 300 }) private countdown!: number;
  @Prop({ type: Object, default: () => ({ continue: {}, confirm: {} }) }) private customText!: CUSTOM_TEXT;

  public render(h: CreateElement): VNode {
    const activator = this.$scopedSlots.activator;
    const customContinueText = this.customText.continue ?? {};

    const classes = classnames('risk-info');
    return h(
      'v-dialog',
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
          'v-card',
          [
            h(
              'v-card-title',
              {
                staticClass: classes('title'),
              },
              [customContinueText.title || $t(this, 'warning')]
            ),
            h(
              'v-card-text',
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
            )
          ]
        )
      ]
    );
  }
}

export default RiskInfo;