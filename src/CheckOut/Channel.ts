import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import checkIcon from '@assets/images/common/check.svg';
import { VListItem, VListItemAvatar, VListItemIcon, VListItemContent, VImg } from 'vuetify/lib';
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
      VListItem,
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
          VListItemAvatar,
          {
            props: {
              size: '28'
            }
          },
          [
            h(
              VImg,
              {
                props: {
                  src: this.channel.channel_icon || this.channel.asset_icon
                }
              }
            )
          ]
        ),
        h(
          VListItemContent,
          this.channel.channel_name
        ),
        this.selected ? h(
          VListItemIcon,
          [
            h(
              VImg,
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