// En el archivo App.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/auth/student/HomeScreen';

const Drawer = createDrawerNavigator();

export default function StudentDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Login">
            <Drawer.Screen name="Dashboard" component={HomeScreen} />
        </Drawer.Navigator>
    );
}
