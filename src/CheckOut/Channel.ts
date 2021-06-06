import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import checkIcon from '@assets/images/common/check.svg';
/* import types */
import type { CreateElement, VNode } from 'vue';
import type { ChannelType } from './CheckOut';

@Component
export class Channel extends Vue {
  @Prop({ type: Object, default: () => ({}) }) private channel!: ChannelType;
  @Prop({ type: Boolean, default: false }) private selected!: boolean;

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
                  src: this.channel.channel_icon || this.channel.asset_icon
                }
              }
            )
          ]
        ),
        h(
          'v-list-item-content',
          this.channel.channel_name
        ),
        this.selected ? h(
          'v-list-item-icon',
          [
            h(
              'v-img',
              {
                props: {
                  small: true,
                  color: 'primary',
                  src: checkIcon
                }
              }
            )
          ]
        ) : null
      ]
    );
  }
}

export default Channel;