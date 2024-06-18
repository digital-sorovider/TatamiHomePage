import { CustomMenu } from '@admin/components/CustomMenu';
import { Layout, Menu } from 'react-admin';

export const CustomLayout = (props) => (
    <Layout {...props} menu={CustomMenu} />
)