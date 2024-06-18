import { Admin, CustomRoutes, Resource, defaultDarkTheme, defaultTheme } from 'react-admin';
import { Route } from 'react-router-dom';

import dataProvider from './providers/firestoreDataProvider';
import authProvider from './providers/firebaseAuthProvider';
import Dashboard from './Dashboard';
import Login from './pages/Login';
import RegisterPage from './pages/Register';
import styles from "@admin/styles/Admin.module.scss"
import { CustomLayout } from './layout/CustomLayout';


import PeopleIcon from '@mui/icons-material/People';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import LayersIcon from '@mui/icons-material/Layers';
import MapIcon from '@mui/icons-material/Map';
import HikingIcon from '@mui/icons-material/Hiking';

import { NoticeList, NoticeEdit, NoticeCreate } from './resources/notice';
import { AdminList } from './resources/admin';
import { EventList, EventEdit, EventCreate } from './resources/event';
import { EventTypeList, EventTypeEdit, EventTypeCreate } from './resources/eventType';
import { HistoryCreate, HistoryEdit, HistoryList } from './resources/history';
import TopImageEdit from './pages/TopImageEdit';
import { MapTypeCreate, MapTypeEdit, MapTypeList } from './resources/mapType';
import { MapCreate, MapEdit, MapList } from './resources/map';
import EventSort from './pages/EventSort';
import { LifeCreate, LifeEdit, LifeList } from './resources/life';
import LifeSort from './pages/LifeSort';

const App = () => {
    
    return (
        <div className={styles.admin}>
            <Admin 
                dashboard={Dashboard}
                authProvider={authProvider} 
                loginPage={Login}
                dataProvider={dataProvider} 
                theme={defaultTheme}
                darkTheme={defaultDarkTheme}
                layout={CustomLayout}
                basename='/admin'
            >

                <Resource 
                    name="top"
                    icon={PersonalVideoIcon}
                    options={{
                        label: 'トップ画像',
                        to: '/top/image'
                    }}
                >
                    <Route path="image" element={<TopImageEdit />} />
                </Resource>

                <Resource 
                    name="notice"
                    icon={NotificationsActiveIcon}
                    list={NoticeList}
                    edit={NoticeEdit}
                    create={NoticeCreate}
                    options={{
                        label: 'お知らせ',
                    }}
                />

                <Resource 
                    name="event"
                    icon={CalendarTodayIcon}
                    list={EventList}
                    edit={EventEdit}
                    create={EventCreate}
                    options={{
                        label: 'イベント',
                    }}
                >
                    <Route path="sort" element={<EventSort />} />
                </Resource>

                <Resource 
                    name="eventType"
                    icon={InsertInvitationIcon}
                    list={EventTypeList}
                    edit={EventTypeEdit}
                    create={EventTypeCreate}
                    recordRepresentation="title"
                    options={{
                        label: 'イベント種別',
                    }}
                />

                <Resource 
                    name="life"
                    icon={HikingIcon}
                    list={LifeList}
                    edit={LifeEdit}
                    create={LifeCreate}
                    options={{
                        label: '生活サーバー',
                    }}
                >
                    <Route path="sort" element={<LifeSort />} />
                </Resource>


                <Resource 
                    name="map"
                    icon={MapIcon}
                    list={MapList}
                    edit={MapEdit}
                    create={MapCreate}
                    options={{
                        label: '配布マップ等',
                    }}
                />

                <Resource 
                    name="mapType"
                    icon={LayersIcon}
                    list={MapTypeList}
                    edit={MapTypeEdit}
                    create={MapTypeCreate}
                    recordRepresentation="title"
                    options={{
                        label: '配布マップ種別',
                    }}
                />

                <Resource 
                    name="history"
                    icon={HistoryIcon}
                    list={HistoryList}
                    edit={HistoryEdit}
                    create={HistoryCreate}
                    options={{
                        label: '歴史',
                    }}
                />

                <Resource 
                    name="admin"
                    icon={PeopleIcon}
                    list={AdminList}
                    options={{
                        label: '管理アカウント',
                    }}
                />

                <CustomRoutes noLayout>
                    <Route path="/register" element={<RegisterPage />} />
                </CustomRoutes>
            </Admin>            
        </div>
    )
};

export default App;
