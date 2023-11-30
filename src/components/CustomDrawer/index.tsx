import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-paper';
import { styles } from './styles';
import { useAuth } from '../../context/AuthContext';
import Account from '../../../assets/images/account.svg';
export default function CustomDrawer(props: any) {
    const { onLogout } = useAuth();
    return (
        <View style={styles.container}>
            <DrawerContentScrollView
                contentContainerStyle={{ backgroundColor: '#2B32CE' }}
                {...props}>
                <View style={styles.header}>
                    <Account width={80} height={80} />
                    <Text style={styles.textTitle}>f</Text>
                    <Text style={styles.text}>f</Text>
                </View>

                <View style={styles.body}>
                    <DrawerItemList
                        {...props}
                    />
                </View>
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={onLogout}>
                    <View style={styles.button}>
                        <Icon source={'logout'} size={22} />
                        <Text style={{ marginLeft: 30 }}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 12 }}>v. 1.0.0</Text>
            </View>
        </View>
    )
}

