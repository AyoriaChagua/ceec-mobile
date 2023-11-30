import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        position: 'relative', 
        
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
        rowGap: 30
    },
    text: {
        fontSize: 15,
        fontWeight: '400',
        color: "#8689CD",
        textAlign: 'center', 
    },
    h1: {
        fontSize: 25,
        fontWeight: '600',
        color: "#4951FF",
        marginVertical: 15,
        textAlign: 'center', 
    },
    form: {
        marginVertical: 20,
        rowGap: 20
    },
    ebook: {
        top: 0, 
        right: 0, 
    },
});