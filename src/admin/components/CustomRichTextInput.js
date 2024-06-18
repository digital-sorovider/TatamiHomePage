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


const CustomRichTextInput = ({ size, resource, ...props }) => {
    const CustomRichTextInputToolbar = ({ size, ...props }) => {

        const editor = useTiptapEditor();
    
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
            if(isUrl(input)) {

                editor.chain().focus().setIframe({ src: convertToEmbedURL(input) }).run();
            }
            else {
                console.log('insert')
                editor.chain().focus().insertContent(input).run()
            }
        };
    
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
            </RichTextInputToolbar>
        );
    };
    
    const CustomEditorOptions = {
        ...DefaultEditorOptions,
        extensions: [
            ...DefaultEditorOptions.extensions,
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
            ImageExtension,
            Iframe
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