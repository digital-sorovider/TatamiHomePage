import { Node, mergeAttributes } from '@tiptap/core';

const Notice = Node.create({
  name: 'notice',
  group: 'block',
  content: 'block+',
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      variant: {
  default: 'warning', // デフォルトは警告に変更
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="notice"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { variant = 'warning' } = HTMLAttributes;
    return [
      'div',
      mergeAttributes(
        { 'data-type': 'notice', class: `notice notice--${variant}` },
        HTMLAttributes
      ),
      0,
    ];
  },

  addCommands() {
    return {
      insertNotice:
        (attrs = {}) =>
        ({ commands }) => {
          const variant = attrs.variant || 'warning';
          return commands.insertContent({
            type: this.name,
            attrs: { variant },
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: '畳サーバーへようこそ！\n初めて畳サーバーに参加される方向けのガイドです。畳サーバーではみんなで楽しく建築したり、冒険したりできます！' },
                ],
              },
            ],
          });
        },
      setNoticeVariant:
        (variant = 'warning') =>
        ({ state, dispatch, tr }) => {
          let updated = false;
          const { from, to } = state.selection;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name === this.name) {
              if (dispatch) {
                dispatch(tr.setNodeMarkup(pos, undefined, { ...node.attrs, variant }));
              }
              updated = true;
              return false;
            }
            return true;
          });
          return updated;
        },
    };
  },
});

export default Notice;
