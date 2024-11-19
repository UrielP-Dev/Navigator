import React, { useState } from 'react';
import {View, Text, TextInput, Pressable, ScrollView,  ToastAndroid} from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../Utils/Firebase';
import Toast from "./Toast";
import {Calendar} from 'react-native-calendars';



interface Day {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp?: number;

}

const Forms = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        position: '',
        department: '',
        phone: '',
        startDate: new Date().toISOString().split('T')[0]
    });

    const handleDateChange = (day: Day) => {
        setFormData({ ...formData, startDate: day.dateString  });
    };

    const handleSubmit = async () => {
        try {
            const docRef = await addDoc(collection(db, "Employees"), formData);
            console.log("Employee registered with ID: ", docRef.id);
            Toast.show('Employee successfully registered!', ToastAndroid.LONG);
            setFormData({
                fullName: '',
                email: '',
                position: '',
                department: '',
                phone: '',
                startDate: new Date().toISOString().split('T')[0]
            });
        } catch (error) {
            console.error("Error adding document: ", error);
            Toast.showWithGravity(
                'Failed to register employee. Please try again.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER)
        }
    };


    return (
        <ScrollView className="flex-1 bg-main px-6 py-8 mt-8">
            <View className="mb-8">
                <Text className="text-3xl font-bold text-black">
                    Employee Registration
                </Text>
                <Text className="text-black/80 mt-2">
                    Please fill in all fields to register the new employee
                </Text>
            </View>

            <View className="gap-y-6">
                <View>
                    <Text className="text-black text-base font-bold mb-1">
                        Full Name
                    </Text>
                    <TextInput
                        className="w-full bg-secondary/50 border border-secondary rounded-lg px-4 py-3 text-black"
                        placeholder="Ex: John Smith"
                        value={formData.fullName}
                        placeholderTextColor="#857e8e80"
                        onChangeText={(text) => setFormData({...formData, fullName: text})}
                    />
                </View>

                <View>
                    <Text className="text-black text-base font-bold mb-1">
                        Email Address
                    </Text>
                    <TextInput
                        className="w-full bg-secondary/50 border border-secondary rounded-lg px-4 py-3 text-black"
                        placeholder="email@company.com"
                        keyboardType="email-address"
                        placeholderTextColor="#857e8e80"
                        value={formData.email}
                        onChangeText={(text) => setFormData({...formData, email: text})}
                    />
                </View>

                {/* Position */}
                <View>
                    <Text className="text-black text-base font-bold mb-1">
                        Position
                    </Text>
                    <TextInput
                        className="w-full bg-secondary/50 border border-secondary rounded-lg px-4 py-3 text-black"
                        placeholder="Ex: Senior Developer"
                        placeholderTextColor="#857e8e80"
                        value={formData.position}
                        onChangeText={(text) => setFormData({...formData, position: text})}
                    />
                </View>

                <View>
                    <Text className="text-black text-base font-bold mb-1">
                        Department
                    </Text>
                    <TextInput
                        className="w-full bg-secondary/50 border border-secondary rounded-lg px-4 py-3 text-black"
                        placeholder="Ex: Technology"
                        placeholderTextColor="#857e8e80"
                        value={formData.department}
                        onChangeText={(text) => setFormData({...formData, department: text})}
                    />
                </View>

                <View>
                    <Text className="text-black text-base font-bold mb-1">
                        Phone Number
                    </Text>
                    <TextInput
                        className="w-full bg-secondary/50 border border-secondary rounded-lg px-4 py-3 text-black"
                        placeholder="Ex: +1 123 456 7890"
                        keyboardType="phone-pad"
                        placeholderTextColor="#857e8e80"
                        value={formData.phone}
                        onChangeText={(text) => setFormData({...formData, phone: text})}
                    />
                </View>

                <View>
                    <Text className="text-black text-base font-bold mb-1">
                        Start Date
                    </Text>
                    <Calendar
                        onDayPress={(day: Day) => handleDateChange(day)}
                        markedDates={{
                            [formData.startDate]: { selected: true, selectedColor: 'blue' },
                        }}
                        className='h-3'
                    />
                </View>

                <Pressable
                    onPress={handleSubmit}
                    className="w-full bg-Skyblue py-4 rounded-lg mb-16 active:bg-Skyblue/80">
                    <Text className="text-white text-center font-semibold text-lg">
                        Register Employee
                    </Text>
                </Pressable>
            </View>

        </ScrollView>


    );
};

export default Forms;