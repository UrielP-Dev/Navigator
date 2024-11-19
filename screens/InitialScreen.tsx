import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from "./HomeScreen";
import EmployeeList from "./EmployeeList";

// Screens
function AddScreen() {
    return (
        <View style={styles.container}>
            <HomeScreen></HomeScreen>

        </View>
    );
}

function EmployeesScreen() {
    return (
        <View style={styles.container}>
           <EmployeeList></EmployeeList>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings Screen</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();
function InitialScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Add Employee') {
                        iconName = 'person-add';
                    } else if (route.name === 'Employees') {
                        iconName = 'person-search';
                    } else if (route.name === 'Settings') {
                        iconName = 'settings';
                    }
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#5EACF5',
                tabBarInactiveTintColor: '#857E8E',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Add Employee" component={AddScreen} />
            <Tab.Screen name="Employees" component={EmployeesScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default InitialScreen;
