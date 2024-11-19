import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './global.css';
import InitialScreen from './screens/InitialScreen';
import EmployeeList from './screens/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';

type RootStackParamList = {
    Welcome: undefined;
    Home: undefined;
    EmployeeList: undefined;
    EmployeeDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const WelcomeScreen = ({ navigation }: any) => {
    const [isMirrored, setIsMirrored] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsMirrored((prev) => !prev);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-3xl font-bold mb-8 text-gray-800">
                Welcome to SafeEmployee!
            </Text>


            <Image
                source={require('./assets/MainImage.jpg')}
                style={{
                    width: 200,
                    height: 200,
                    transform: [{ scaleX: isMirrored ? -1 : 1 }],
                }}
            />

            <Pressable
                onPress={() => navigation.navigate('Home')}
                className="bg-blue-500 px-6 py-3 rounded-lg active:bg-blue-600 mt-8"
            >
                <Text className="text-white font-semibold text-lg px-4">
                    Start
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
                <Stack.Screen
                    name="EmployeeList"
                    component={EmployeeList}
                    options={{ title: 'Employee List' }}
                />
                <Stack.Screen
                    name="EmployeeDetail"
                    component={EmployeeDetail}
                    options={{ title: 'Employee Details', headerShown: true }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
