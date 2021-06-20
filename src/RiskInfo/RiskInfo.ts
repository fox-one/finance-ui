import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import { $t } from '@utils/t';
/* import types */
import type { CreateElement, VNode } from 'vue';

@Component
export class RiskInfo extends Vue {
  @Prop({ type: String, default: '' }) private className!: string;
  @Prop({ type: String, default: '' }) private title!: string;
  @Prop({ type: Object, default: () => ({}) }) private content!: { title?: string; extent: string; subtitle?: string };

  public render(h: CreateElement): VNode {
    const activator = this.$scopedSlots.activator;

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
              [this.title || $t(this, 'warning')]
            ),
            h(
              'v-card-text',
              [
                h(
                  'h3',
                  this.content.title || 'Price impact reached'
                ),
                h(
                  'h3',
                  this.content.extent || '266.08%'
                ),
                h(
                  'h4',
                  this.content.subtitle || 'It may cause a serious result.'
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