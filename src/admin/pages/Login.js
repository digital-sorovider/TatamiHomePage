import { Login } from 'react-admin'
import { AuthRouteProvider } from '../providers/AuthRouteProvider'

const LoginPage = () => {
    return (
        <AuthRouteProvider>
            <Login />
        </AuthRouteProvider>
    )
}

export default LoginPage