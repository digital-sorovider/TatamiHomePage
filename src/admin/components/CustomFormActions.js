import { SaveButton, Toolbar, DeleteWithConfirmButton } from "react-admin"

const CustomFormActions = () => (
    <Toolbar sx={[{ justifyContent: 'space-between' }]}>
        <SaveButton label="保存" />
        <DeleteWithConfirmButton 
            label="削除"
            mutationMode="pessimistic"
            confirmTitle='削除'
            confirmContent='本当に削除しますか？'
        />
    </Toolbar>
)
export default CustomFormActions