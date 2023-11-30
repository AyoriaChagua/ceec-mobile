
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboarScreen from '../screens/auth/admin/DashboardScreen';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={
                (props) => <CustomDrawer {...props}
                    email={'test'}
                    fullname={'test'}
                />}
            screenOptions={{
                drawerActiveBackgroundColor: '#2B32CE',
                drawerActiveTintColor: '#fff',
                headerTitleStyle: { fontSize: 18 }
            }}
        >
            <Drawer.Screen name="Dashboard" component={DashboarScreen} />
        </Drawer.Navigator>
    );
}
