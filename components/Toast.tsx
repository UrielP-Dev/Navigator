import React from 'react';
import { ToastAndroid, ToastAndroidStatic } from 'react-native';

/**
 * A reusable Toast component for Android
 */
const Toast: {
    show: (message: string, duration?: ToastAndroidStatic['SHORT'] | ToastAndroidStatic['LONG']) => void;
    showWithGravity: (
        message: string,
        duration?: ToastAndroidStatic['SHORT'] | ToastAndroidStatic['LONG'],
        gravity?: number
    ) => void;
    showWithGravityAndOffset: (
        message: string,
        duration?: ToastAndroidStatic['SHORT'] | ToastAndroidStatic['LONG'],
        gravity?: number,
        xOffset?: number,
        yOffset?: number
    ) => void;
} = {
    show: (message, duration = ToastAndroid.SHORT) => {
        ToastAndroid.show(message, duration);
    },

    showWithGravity: (message, duration = ToastAndroid.SHORT, gravity = ToastAndroid.CENTER) => {
        ToastAndroid.showWithGravity(message, duration, gravity);
    },

    showWithGravityAndOffset: (
        message,
        duration = ToastAndroid.SHORT,
        gravity = ToastAndroid.BOTTOM,
        xOffset = 0,
        yOffset = 0
    ) => {
        ToastAndroid.showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset);
    },
};

export default Toast;
