import { Node, mergeAttributes } from '@tiptap/core';

const Iframe = Node.create({
    name: 'iframe',
    group: 'block',
    atom: true,
    draggable: true,
    inline: false,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            width: {
                default: 600,
            },
            height: {
                default: 400,
            }
        };
    },

    parseHTML() {
        return [
            {
                tag: 'iframe',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['iframe', mergeAttributes(HTMLAttributes)];
    },

    addCommands() {
        return {
            setIframe: attributes => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: attributes,
                });
            },
        };
    },
});

export default Iframe