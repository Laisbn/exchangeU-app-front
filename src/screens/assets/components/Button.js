/* eslint-disable prettier/prettier */
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const Button = (props) => {
    const filledBgColor = props.color || '#E7BE29';
    const outlinedColor = '#2264C7';
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? '#2264C7' : '#E7BE29';

    
    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor },
                ...props.style,
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 20, fontWeight: 700, ... { color: textColor } }}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default Button;
