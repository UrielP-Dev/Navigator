import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Pressable } from 'react-native';
import './global.css';
import InitialScreen from './screens/InitialScreen';

type RootStackParamList = {
    Welcome: undefined;
    Home: undefined;
    InitialScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const WelcomeScreen = ({ navigation }: any) => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-3xl font-bold mb-8 text-gray-800">
                ¡Bienvenido a mi App!
            </Text>
            <Pressable
                onPress={() => navigation.navigate('Home')}
                className="bg-blue-500 px-6 py-3 rounded-lg active:bg-blue-600"
            >
                <Text className="text-white font-semibold text-lg">
                    Comenzar
                </Text>
            </Pressable>
        </View>
    );
};

const HomeScreen = () => {
    return (
        <>
            <InitialScreen />
        </>
    );
};

// Componente principal App
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
