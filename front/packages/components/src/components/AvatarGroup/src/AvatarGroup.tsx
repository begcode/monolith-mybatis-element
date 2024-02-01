import { ElAvatar, ElPopover } from 'element-plus';
import type { PropType, CSSProperties } from 'vue';
import { defineComponent, cloneVNode } from 'vue';

export const groupProps = () => ({
  prefixCls: String,
  maxCount: Number,
  maxStyle: { type: Object as PropType<CSSProperties>, default: undefined },
  maxPopoverPlacement: { type: String as PropType<'top' | 'bottom'>, default: 'top' },
  maxPopoverTrigger: String as PropType<'hover' | 'focus' | 'click'>,
  /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
  size: {
    type: [Number, String] as PropType<number | 'large' | 'default' | 'small'>,
    default: 'default',
  },
  shape: { type: String as PropType<'circle' | 'square'>, default: 'circle' },
});

const Group = defineComponent({
  name: 'AvatarGroup',
  inheritAttrs: false,
  props: groupProps(),
  setup(props, { slots, attrs }) {
    return () => {
      const { maxPopoverPlacement = 'top', maxCount, maxStyle, maxPopoverTrigger = 'hover', shape } = props;
      const getPropsSlot = (slots: any, props: any, prop = 'default') => {
        return props[prop] ?? slots[prop]?.();
      };
      const children = getPropsSlot(slots, props);
      const cloneElement = (vnode, nodeProps = {}, override = true, mergeRef = false) => {
        let ele = vnode;
        if (Array.isArray(vnode)) {
          ele = vnode[0];
        }
        if (!ele) {
          return null;
        }
        const node = cloneVNode(ele, nodeProps as any, mergeRef);

        // cloneVNode内部是合并属性，这里改成覆盖属性
        node.props = (override ? { ...node.props, ...nodeProps } : node.props) as any;
        return node;
      };
      const childrenWithProps = children.map((child, index) =>
        cloneElement(child, {
          key: `avatar-key-${index}`,
        }),
      );

      const numOfChildren = childrenWithProps.length;
      if (maxCount && maxCount < numOfChildren) {
        const childrenShow = childrenWithProps.slice(0, maxCount);
        const childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);

        childrenShow.push(
          <ElPopover key="avatar-popover-key" content={childrenHidden} trigger={maxPopoverTrigger} placement={maxPopoverPlacement}>
            <ElAvatar style={maxStyle} shape={shape}>{`+${numOfChildren - maxCount}`}</ElAvatar>
          </ElPopover>,
        );
        return (
          <div {...attrs} style={attrs.style as CSSProperties}>
            {childrenShow}
          </div>
        );
      }

      return (
        <div class="bc-avatar-group" {...attrs} style={attrs.style as CSSProperties}>
          {childrenWithProps}
        </div>
      );
    };
  },
});

export default Group;
