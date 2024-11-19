import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Utils/Firebase';

interface Employee {
    id: string;
    fullName: string;
    email: string;
    position: string;
    department: string;
    phone: string;
    startDate: string;
}

const EmployeeDetail = ({ route }: any) => {
    const { employeeId } = route.params;
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeDetail = async () => {
            try {
                const docRef = doc(db, "Employees", employeeId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setEmployee(docSnap.data() as Employee);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching employee detail: ", error);
            }
            setLoading(false);
        };

        fetchEmployeeDetail();
    }, [employeeId]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-main">
                <ActivityIndicator size="large" color="#5eacf5" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-main px-8 py-8">
            {employee ? (
                <>
                    <Text className="text-3xl font-bold text-black">{employee.fullName}</Text>
                    <Text className="text-black text-lg">
                        <Text className="font-bold">Email:</Text> {employee.email}
                    </Text>
                    <Text className="text-black text-lg">
                        <Text className="font-bold">Position:</Text> {employee.position}
                    </Text>
                    <Text className="text-black text-lg">
                        <Text className="font-bold">Department:</Text> {employee.department}
                    </Text>
                    <Text className="text-black text-lg">
                        <Text className="font-bold">Phone:</Text> {employee.phone}
                    </Text>
                    <Text className="text-black text-lg">
                        <Text className="font-bold">Start Date:</Text> {employee.startDate}
                    </Text>
                </>
            ) : (
                <Text className="text-black text-lg">Employee not found</Text>
            )}
        </View>
    );
};

export default EmployeeDetail;
