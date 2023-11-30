import { useEffect, useState } from 'react';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { LoadIndicator } from '../components';
import AdminDrawer from './AdminDrawer';
import StudentDrawer from './StudentDrawer';

export default function AppNav() {
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const { userToken, isLoading, role, isLoggedIn } = useAuth();
  
    useEffect(() => {
      const loadUser = async () => {
        try {
          await isLoggedIn!();
          setIsUserLoaded(true);
        } catch (error) {
          console.error(error);
          setIsUserLoaded(true);
        }
      };
      if (!isUserLoaded) {
        loadUser();
      }
    }, [isLoggedIn, isUserLoaded]);
  
    if (!isUserLoaded || isLoading || !isLoggedIn || userToken === null) {
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