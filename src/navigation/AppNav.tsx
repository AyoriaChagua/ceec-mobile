import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { LoadIndicator } from '../components';
import AdminDrawer from './AdminDrawer';
import StudentDrawer from './StudentDrawer';

export default function AppNav() {
    const { userToken, isLoading, userInfo } = useAuth();
    let role = 'visitor'
    if (userInfo) {
        const user = userInfo as {
            id: number,
            role: number,
            email: string
        }
        switch (user.role) {
            case 1:
                role = 'student'
                break;
            case 2:
                role = 'admin'
                break;
            default:
                break;
        }
    }
    if (isLoading) {
        return <LoadIndicator animating size='large' />;
    }

    let drawerComponent;

    if (userToken !== null) {
        drawerComponent = role === 'admin' ? <AdminDrawer /> : <StudentDrawer />;
    } else {
        drawerComponent = <AuthStack />;
    }

    return (
        <NavigationContainer>
            {drawerComponent}
        </NavigationContainer>
    );
}
