import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import { $t } from '@utils/t';
/* import types */
import type { CreateElement, VNode } from 'vue';
import type { Channel } from './CheckOut';

@Component
export class ChannelItem extends Vue {
  @Prop({ type: Object, default: () => ({}) }) private channel!: Channel;

  private loading = false;

  private get disabled() {
    return this.loading;
  }

  public render(h: CreateElement): VNode {
    return h(
      'v-list-item',
      {
        props: {
          ripple: false
        },
        on: {
          click: () => this.$emit('select', this.channel)
        }
      },
      [
        h(
          'v-list-item-avatar',
          {
            props: {
              size: '28'
            }
          },
          [
            h(
              'v-img',
              {
                props: {
                  // src: 
                }
              }
            )
          ]
        )
      ]
    );
  }
}

export default ChannelItem;