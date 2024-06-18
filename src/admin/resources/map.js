//map.js
import * as React from "react";
import { List, Datagrid, TextField, EditButton, DateField, Toolbar } from 'react-admin';
import { Edit, SimpleForm, TextInput, Create, ReferenceInput, AutocompleteInput } from 'react-admin';
import CustomImageInput from "@admin/components/CustomImageInput";
import CustomToolbar from "@admin/components/CustomToolbar";
import CustomFormActions from "@admin/components/CustomFormActions";

export const MapList = props => (
    <List {...props} perPage={50}>
        <Datagrid rowClick="edit" optimized>
            <TextField source="title" label="タイトル" />
            <TextField source="mapType.shortTitle" label="配布マップ種別" />
            <DateField source='updatedAt' label='更新日時' showTime />
            <EditButton />
        </Datagrid>
    </List>
);

const EditForm = ({toolbar}) => (
    <SimpleForm toolbar={toolbar}>
        <ReferenceInput 
            source="mapTypeRef"
            reference="mapType"
            sort={{ field: 'sortNum', order: 'ASC' }}
            perPage={100}
        >
            <AutocompleteInput label="配布マップ種別" fullWidth />
        </ReferenceInput>
        <TextInput fullWidth required source="title" label="タイトル" />
        <TextInput fullWidth source="description" label="説明" multiline rows={5} />
        <TextInput  fullWidth source="url" label="URL" />
        <CustomImageInput />
    </SimpleForm>
)

export const MapEdit = props => (
    <Edit {...props} actions={<CustomToolbar />}>
        <EditForm toolbar={<CustomFormActions />} />
    </Edit>
);

export const MapCreate = props => (
    <Create {...props}>
        <EditForm toolbar={<Toolbar />} />
    </Create>
);