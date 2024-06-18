import CustomImageInput from "@admin/components/CustomImageInput"
import { SimpleForm, Edit, Toolbar, SaveButton } from "react-admin"

const TopImageEditActions = () => {
    return ( 
        <Toolbar>
            <SaveButton />
        </Toolbar>
    )
}

const TopImageEdit = () => {
    return  (
        <Edit id='image' redirect="/top/image">
            <SimpleForm toolbar={<TopImageEditActions />}>
                <CustomImageInput source='img'  multiple={true}/>
            </SimpleForm>
        </Edit>
    )
}

export default TopImageEdit