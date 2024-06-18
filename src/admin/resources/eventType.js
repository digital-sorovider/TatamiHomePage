//event.js
import CustomFormActions from "@admin/components/CustomFormActions";
import CustomToolbar from "@admin/components/CustomToolbar";
import * as React from "react";
import { List, Datagrid, TextField, EditButton, DateField, NumberField, NumberInput, Toolbar } from 'react-admin';
import { Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const EventTypeList = props => (
    <List {...props} sort={{ field: 'sortNum', order: 'asc' }} perPage={50}>
        <Datagrid rowClick="edit" optimized>
            <TextField source="title" label="イベント名（フル）" />
            <TextField source="shortTitle" label="イベント名（ショート）" />
            <NumberField source="sortNum" label="並び順" />
            <DateField source='updatedAt' label='更新日時' showTime />
            <EditButton />
        </Datagrid>
    </List>
);

const EditForm = ({toolbar}) => (
    <SimpleForm toolbar={toolbar}>
        <TextInput fullWidth required source="title" label="イベント名（フル）" placeholder="常時イベント(24時間イベントサーバー)" />
        <TextInput fullWidth required source="shortTitle" label="イベント名（ショート）" placeholder="常時" />
        <NumberInput fullWidth required source="sortNum" label="並び順" />
    </SimpleForm>
)

export const EventTypeEdit = props => (
    <Edit {...props} actions={<CustomToolbar />}>
        <EditForm toolbar={<CustomFormActions />} />
    </Edit>
);

export const EventTypeCreate = props => (
    <Create {...props}>
        <EditForm toolbar={<Toolbar />} />
    </Create>
);