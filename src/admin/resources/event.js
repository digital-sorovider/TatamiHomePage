//event.js
import * as React from "react";
import { List, Datagrid, TextField, EditButton, DateField, Toolbar, CreateButton, ExportButton, TopToolbar, NumberInput, DateInput, DateTimeInput, Link } from 'react-admin';
import { Edit, SimpleForm, TextInput, Create, ReferenceInput, AutocompleteInput } from 'react-admin';
import CustomRichTextInput from '../components/CustomRichTextInput';
import CustomImageInput from "@admin/components/CustomImageInput";
import CustomToolbar from "@admin/components/CustomToolbar";
import CustomFormActions from "@admin/components/CustomFormActions";
import { Button } from "@mui/material";


const EventListActions = props => (
    <TopToolbar>
        <Link to='/event/sort' variant="outlined">並び順変更</Link>
        <CreateButton />
        <ExportButton />
    </TopToolbar>
)

export const EventList = props => (
    <List {...props} perPage={50} actions={<EventListActions/>}>
        <Datagrid rowClick="edit" optimized>
            <TextField source="title" label="タイトル" />
            <TextField source="eventType.shortTitle" label="イベント種別" />
            <DateField source='publishAt' label='公開日時' showTime />
            <DateField source='updatedAt' label='更新日時' showTime />
            <EditButton />
        </Datagrid>
    </List>
);

const EditForm = ({toolbar}) => (
    <SimpleForm toolbar={toolbar}>
        <ReferenceInput 
            source="eventTypeRef"
            reference="eventType"
            sort={{ field: 'sortNum', order: 'ASC' }}
            perPage={100}
        >
            <AutocompleteInput label="イベント種別" fullWidth />
        </ReferenceInput>
        <TextInput fullWidth required source="title" label="タイトル" />
        <TextInput fullWidth source="url" label="URL" placeholder="本文を入力せず、特定のページに飛ばしたいときのみ入力" />
        <TextInput fullWidth source="description" label="説明" placeholder="サムネイル下の説明文" multiline rows={3} />
        <CustomImageInput />
        <NumberInput hidden fullWidth required source="sortNum" label="並び順" defaultValue={0} />
        <CustomRichTextInput label="本文" source="body" resource="event" />
        <DateTimeInput source='publishAt' required label="公開日時" defaultValue={new Date()} />
    </SimpleForm>
)

export const EventEdit = props => (
    <Edit {...props} actions={<CustomToolbar />}>
        <EditForm toolbar={<CustomFormActions />} />
    </Edit>
);

export const EventCreate = props => (
    <Create {...props}>
        <EditForm toolbar={<Toolbar />} />
    </Create>
);