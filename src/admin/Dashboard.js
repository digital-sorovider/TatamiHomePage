import React from 'react';
import { Title, CardContentInner } from 'react-admin';

const Dashboard = () => {
    return (
        <>
            <Title title="管理画面へようこそ" />
            <CardContentInner>
                <h3>ダッシュボード画面です</h3>
                <p>左のサイドメニューから編集したい項目を選択してください</p>
            </CardContentInner>
        </>

    )
}

export default Dashboard