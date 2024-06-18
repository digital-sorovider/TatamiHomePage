import { ImageInput, ImageField } from 'react-admin'

const CustomImageInput = ({ source, label, multiple, ...props }) => (
    <ImageInput
        source={ source || 'mainImg' } 
        label={ label || "メイン画像"} 
        accept="image/*" 
        multiple={ multiple || false } 
        placeholder={<p style={{padding: '20px'}}>ここに画像をドロップ or クリックして選択</p>}
        {...props} 
    >
        <ImageField 
            source="src"
            sx={{ '& img.RaImageField-image': { width: 400, height: 200 } }}
        />
    </ImageInput>
);

export default CustomImageInput