import * as React from "react";
import { List, Datagrid, TextField, Button, FunctionField, DateField, BooleanField, TopToolbar, ExportButton, useRefresh, useNotify } from 'react-admin';
import dataProvider from "../providers/firestoreDataProvider";
import { IconButton } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const AdminList = props => {
    const notify = useNotify()
    const refresh = useRefresh();

    const copyRegisterUrl = async () => {
        global.navigator.clipboard.writeText(`${window.origin}/admin/#/register`)
        notify("登録URLをクリップボードにコピーしました", { type: 'success' })
    }
    
    const AdminListActions = props => (
    
        <TopToolbar>
            <IconButton onClick={copyRegisterUrl} variant="outlined">
                <PersonAddIcon />
            </IconButton>
            <ExportButton />
        </TopToolbar>
    )
    
    const ApproveButton = (record) => {
    
        if(record.status)  return
        const approve = async () => {
            await dataProvider.update('admin', { 
                id: record.id, 
                data: { status: true } 
            })
    
            refresh()
            notify("承認完了", { type: 'success' })
        }
        return (
            <Button
                variant="contained"
                color="success"
                size="medium"
                sx={{
                    '.MuiButton-startIcon': {
                        margin: 0,
                    }
                }}
                onClick={approve}
            >
                承認
            </Button>
        )
    }

    const ApproveField = props => {
        return <FunctionField {...props} render={ApproveButton} />
    }

    return (
        <List {...props} sort={ { field: 'status', order: 'asc' }} perPage={50} actions={<AdminListActions/>}>
            <Datagrid bulkActionButtons={false}>
                <ApproveField />
                <TextField source="email" label="メールアドレス" />
                <BooleanField source="status" label="承認ステータス" />
                <DateField source='createdAt' label='作成日時' showTime />
                <DateField source='updatedAt' label='更新日時' showTime />
            </Datagrid>
        </List>
    )
};
