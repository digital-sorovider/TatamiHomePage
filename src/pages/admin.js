import dynamic from "next/dynamic";
const AdminApp = dynamic(() => import("@admin/App"), { ssr: false });

const Admin = () => <AdminApp />;

export default Admin;