//history.js
import * as React from "react";
import { List, Datagrid, TextField, EditButton, DeleteButton, DateField, DateInput, NumberInput, NumberField, SelectInput, Toolbar } from 'react-admin';
import { Edit, SimpleForm, TextInput, Create } from 'react-admin';
import CustomImageInput from "@admin/components/CustomImageInput";
import { nowMonth, months, nowYear, years } from "@util/DateFormatter";
import CustomFormActions from "@admin/components/CustomFormActions";
import CustomToolbar from "@admin/components/CustomToolbar";

export const HistoryList = props => (
    <List {...props} perPage={50}>
        <Datagrid rowClick="edit" optimized>
            <TextField source="title" label="タイトル" />
            <TextField source="year" label="年" />
            <NumberField source="month" label="月" />
            <DateField source='updatedAt' label='更新日時' showTime />
            <EditButton />
        </Datagrid>
    </List>
);

const EditForm = ({toolbar}) => (
    <SimpleForm toolbar={toolbar}>
        <TextInput fullWidth required source="title" label="タイトル" />
        <TextInput fullWidth required source="description" label="説明" multiline rows={5} />
        <SelectInput required source="year" label="年" choices={years} defaultValue={nowYear} />
        <SelectInput required source="month" label="月" choices={months} defaultValue={nowMonth} />
        <CustomImageInput source="images" multiple={true} />
    </SimpleForm>
)

export const HistoryEdit = props => (
    <Edit {...props} actions={<CustomToolbar />}>
        <EditForm toolbar={<CustomFormActions />} />
    </Edit>
);

export const HistoryCreate = props => (
    <Create {...props}>
        <EditForm toolbar={<Toolbar />} />
    </Create>
);
