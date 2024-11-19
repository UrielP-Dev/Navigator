import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Utils/Firebase';
import {useNavigation} from "@react-navigation/native";

interface Employee {
    id: string;
    fullName: string;
    position: string;
}

const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Employees"));
                const employeeList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    fullName: doc.data().fullName,
                    position: doc.data().position,
                }));
                setEmployees(employeeList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching employees: ", error);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-main">
                <ActivityIndicator size="large" color="#5eacf5" />
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-main px-8 w-full py-8 mt-8">
            <View className="mb-8">
                <Text className="text-3xl font-bold text-black">Employee List</Text>
                <Text className="text-black/80 mt-2">
                    {employees.length} registered employees
                </Text>
            </View>

            <View className="gap-y-4">
                {employees.map((employee) => (
                    <TouchableOpacity
                        key={employee.id}
                        onPress={() => navigation.navigate('EmployeeDetail', { employeeId: employee.id })}
                    >
                        <View
                            className="bg-secondary/50 border border-secondary rounded-lg p-4"
                        >
                            <Text className="text-black text-lg">
                                <Text className="font-bold">Name: </Text>{employee.fullName}
                            </Text>
                            <Text className="text-black text-lg">
                                <Text className="font-bold">Position:</Text> {employee.position}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

                {employees.length === 0 && (
                    <View className="items-center py-8">
                        <Text className="text-Gray text-lg">No employees registered yet</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default EmployeeList;
