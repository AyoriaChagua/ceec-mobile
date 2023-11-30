import { View, Text, SafeAreaView } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../interfaces/NavigationInterfaces';
import { styles } from './styles';
import { Input, CustomButton } from '../../../components';
import Ebook from '../../../../assets/images/ebook.svg';
import Logo from '../../../../assets/images/logo.svg';
import { useAuth } from '../../../context/AuthContext';
import { LoginRequest } from '../../../interfaces/AuthInterfaces';

export type Props = {
    readonly navigation: NavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen = () => {
    const { control, handleSubmit } = useForm<LoginRequest>();
    const { onLogin, isLoading, error } = useAuth();
  
    const onLoginPressed: SubmitHandler<LoginRequest> = async (data) => {
      try {
        const dataForm = { email: data.email.toLowerCase(), password: data.password };
        await onLogin?.(dataForm.email, dataForm.password);
      } catch (error) {
        console.error('Error al procesar el inicio de sesión:', error);
        alert('Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Logo height={25} />
          <Ebook height={200} style={styles.ebook} />
        </View>
        <View>
          <Text style={styles.h1}>INICIA SESIÓN</Text>
          <Text style={styles.text}>Centro de Excelencia en Experiencia del Cliente</Text>
        </View>
        <View style={styles.form}>
          <Input label="Email" isEmail control={control} name="email" />
          <Input label="Password" isSecure control={control} name="password" />
          {error && <Text >{error}</Text>}
          <CustomButton
            text="Ingresar"
            onPress={handleSubmit(onLoginPressed)}
            disabled={isLoading!}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;