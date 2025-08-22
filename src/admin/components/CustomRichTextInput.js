import React from 'react';
import {
    DefaultEditorOptions,
    RichTextInput,
    RichTextInputToolbar,
    LevelSelect,
    FormatButtons,
    AlignmentButtons,
    ListButtons,
    LinkButtons,
    QuoteButtons,
    ClearButtons,
    ColorButtons,
    ImageButtons,
    useTiptapEditor,
} from 'ra-input-rich-text';
import { IconButton, Select, MenuItem } from '@mui/material';
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import Style from '../../style/pages/EventDetail.module.scss'
import ImageExtension from '@tiptap/extension-image'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import GridOnIcon from '@mui/icons-material/GridOn';
import { uploadToStorage } from '@lib/firebase';
import Iframe from './Iframe';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import isUrl from 'is-url';
import convertToEmbedURL from '@util/convertToEmbedURL';
import Notice from './Notice';
import TextStyle from '@tiptap/extension-text-style';
import { Extension } from '@tiptap/core';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AiFillWarning, AiTwotoneExclamationCircle } from 'react-icons/ai';
import { BsExclamationCircle, BsFillExclamationCircleFill } from 'react-icons/bs';

// カスタム拡張: textStyle に font-size を結びつける
const FontSize = Extension.create({
    name: 'fontSize',
    addGlobalAttributes() {
        return [
            {
                types: ['textStyle'],
                attributes: {
                    fontSize: {
                        default: null,
                        renderHTML: attributes => {
                            if (!attributes.fontSize) return {};
                            return { style: `font-size: ${attributes.fontSize}` };
                        },
                        parseHTML: element => {
                            const v = element.style?.fontSize || '';
                            return v || null;
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize:
                size => ({ chain }) => {
                    return chain().setMark('textStyle', { fontSize: size }).run();
                },
            unsetFontSize:
                () => ({ chain }) => {
                    return chain().setMark('textStyle', { fontSize: null }).run();
                },
        };
    },
});


const CustomRichTextInput = ({ size, resource, ...props }) => {
    const CustomRichTextInputToolbar = ({ size, ...props }) => {

        const editor = useTiptapEditor();
    const [fontSize, setFontSize] = React.useState('');
        const fontSizeOptions = [12, 14, 16, 18, 20, 24, 28, 32];

        React.useEffect(() => {
            if (!editor) return;
            const updateFontSizeState = () => {
                const current = editor.getAttributes('textStyle')?.fontSize || '';
                // normalize like '16px' -> '16'
                const normalized = typeof current === 'string' ? current.replace('px', '') : '';
                setFontSize(normalized);
            };
            updateFontSizeState();
            editor.on('selectionUpdate', updateFontSizeState);
            editor.on('transaction', updateFontSizeState);
            return () => {
                editor.off('selectionUpdate', updateFontSizeState);
                editor.off('transaction', updateFontSizeState);
            };
        }, [editor]);

        // テーブルタグをエディタに挿入するハンドラー
        const handleInsertTable = () => {
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        };

        const handleUploadImage = async ({ target }) => {
            for await (const file of target.files) {
                const url = await uploadToStorage(resource, file)
                editor.chain().focus().setImage({ src: url }).run()
                editor.chain().focus('end').run()
            }

            target.value = ''
        }


        const handleInsertIframe = () => {
            const input = prompt('URLまたは埋め込みコードを入力してください:', '');
            if (isUrl(input)) {

                editor.chain().focus().setIframe({ src: convertToEmbedURL(input) }).run();
            }
            else {
                console.log('insert')
                editor.chain().focus().insertContent(input).run()
            }
        };

        const handleInsertNotice = (variant = 'info') => () => {
            editor.chain().focus().insertNotice({ variant }).run();
        }

        return (
            <RichTextInputToolbar {...props}>
                <LevelSelect size={size} />
                <FormatButtons size={size} />
                <ColorButtons size={size} />
                <AlignmentButtons size={size} />
                <ListButtons size={size} />
                <LinkButtons size={size} />
                <QuoteButtons size={size} />
                <ClearButtons size={size} />

                {/* フォントサイズ選択 */}
                <Select
                    value={fontSize}
                    displayEmpty
                    onChange={(e) => {
                        const v = e.target.value;
                        setFontSize(v);
                        const value = v ? `${v}px` : null;
                        const chain = editor.chain().focus();
                        if (value) {
                            chain.setFontSize(value).run();
                        } else {
                            chain.unsetFontSize().run();
                        }
                    }}
                    size="small"
                    title="文字サイズ"
                    sx={{
                        ml: 1,
                        '.MuiSelect-select': { minWidth: '84px', py: '5px' }
                    }}
                >
                    <MenuItem value="">標準</MenuItem>
                    {fontSizeOptions.map((n) => (
                        <MenuItem key={n} value={String(n)}>{`${n}px`}</MenuItem>
                    ))}
                </Select>

                <ImageButtons size={size} />
                {/* 画像アップロードボタン */}
                <label htmlFor="icon-button-file">
                    <input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }} onChange={handleUploadImage} multiple />
                    <IconButton aria-label="upload picture" component="span">
                        <AddPhotoAlternateIcon />
                    </IconButton>
                </label>

                {/* iframeを挿入するボタン */}
                <IconButton onClick={handleInsertIframe}>
                    <IntegrationInstructionsIcon />
                </IconButton>

                {/* テーブルタグを挿入するButton */}
                <IconButton onClick={handleInsertTable}>
                    <GridOnIcon />
                </IconButton>
                <Select
                    sx={{
                        marginLeft: '-13px',
                        outline: 'none',
                        '.MuiSelect-select': { maxWidth: '20px', outline: 'none', padding: '5px' }
                    }}
                >
                    <MenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>列の削除</MenuItem>
                    <MenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>列の追加</MenuItem>
                    <MenuItem onClick={() => editor.chain().focus().deleteRow().run()}>行の削除</MenuItem>
                    <MenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>行の追加</MenuItem>
                    <MenuItem onClick={() => editor.chain().focus().mergeCells().run()}>セルの結合</MenuItem>
                    <MenuItem onClick={() => editor.chain().focus().splitCell().run()}>セルの分割</MenuItem>
                    <MenuItem onClick={() => editor.chain().focus().deleteTable().run()}>テーブルの削除</MenuItem>
                </Select>

                {/* 注意文（ノーティス）を挿入するボタン */}
                <IconButton title="注意（警告）" onClick={handleInsertNotice('warning')}>
                    <BsExclamationCircle color="#f5a302" />
                </IconButton>
                <IconButton title="注意（成功）" onClick={handleInsertNotice('success')}>
                    <CheckCircleOutlineIcon sx={{ color: '#32B16C' }} />
                </IconButton>

            </RichTextInputToolbar>
        );
    };

    const CustomEditorOptions = {
        ...DefaultEditorOptions,
        extensions: [
            ...DefaultEditorOptions.extensions,
            TextStyle,
            FontSize,
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
            ImageExtension,
            Iframe,
            Notice
        ],
        editorProps: {
            handleDrop: async function (view, event, slice, moved) {
                if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) { // if dropping external files
                    const file = event.dataTransfer.files[0];
                    const imageReg = /image\/.*/
                    if (!imageReg.test(file.type)) return
                    // check the dimensions
                    let _URL = window.URL || window.webkitURL;
                    let img = new Image(); /* global Image */
                    img.src = _URL.createObjectURL(file);
                    img.onload = async function () {
                        const response = await uploadToStorage(resource, file)
                        const image = new Image();
                        image.src = response
                        image.onload = function () {
                            // place the now uploaded image in the editor where it was dropped
                            const { schema } = view.state;
                            const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
                            const node = schema.nodes.image.create({ src: response }); // creates the image element
                            const transaction = view.state.tr.insert(coordinates.pos, node); // places it in the correct position
                            return view.dispatch(transaction);
                        }
                        return true;
                    }
                    return false;
                }
            }
        }
    };


    return (
        <RichTextInput
            className={Style["event-body"]}
            editorOptions={CustomEditorOptions}
            toolbar={<CustomRichTextInputToolbar size={size} />}
            label="Body"
            source="body"
            {...props}
            fullWidth
            sx={{
                ' .ProseMirror': {
                    minHeight: '300px',
                    maxHeight: '90vh',
                    maxWidth: '1100px',
                    overflow: 'scroll',
                    backgroundColor: 'rgb(249,246,239) !important',
                    color: 'black',
                },
                ' .ProseMirror [data-type="notice"]': {
                    position: 'relative',
                    margin: '16px 0',
                    padding: '12px 16px 12px 44px',
                    borderRadius: '10px',
                    border: '1px solid rgba(245, 187, 7, 0.25)', // $primary-accent-color 相当
                    background: 'rgba(255, 235, 173, 0.4)',       // $secondary-accent-color 相当
                    color: 'rgb(13, 32, 13)'
                },
                ' .ProseMirror [data-type="notice"]::before': {
                    content: '"i"',
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 700,
                    background: '#F5BB07',
                    color: '#fff'
                },
                ' .ProseMirror [data-type="notice"].notice--warning': {
                    background: 'rgba(255, 196, 0, 0.22)',
                    borderColor: 'rgba(255, 196, 0, 0.4)'
                },
                ' .ProseMirror [data-type="notice"].notice--warning::before': {
                    content: '"!"',
                    background: '#f5a302'
                },
                ' .ProseMirror [data-type="notice"].notice--success': {
                    background: 'rgba(50, 177, 108, 0.18)',
                    borderColor: 'rgba(50, 177, 108, 0.35)'
                },
                ' .ProseMirror [data-type="notice"].notice--success::before': {
                    content: '"✓"',
                    background: '#32B16C'
                },
                '.resize-cursor': {
                    cursor: 'col-resize'
                },
                '.selectedCell': {
                    backgroundColor: '#3b83ff9d'
                },
                'img': {
                    width: '80%'
                }
            }}
        />
    )
};

export default CustomRichTextInput