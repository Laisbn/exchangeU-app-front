/* eslint-disable prettier/prettier */
import { View, Text, Image, Pressable, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, FlatList } from 'react-native';
import React, { useState } from 'react';
import users from '../../../data/users'

export default props => {

    const [isPressed, setIsPressed] = useState(false);
    const [isPressed1, setIsPressed1] = useState(false);

    const handleButtonPress = () => {
        setIsPressed(!isPressed); // Alterna o estado entre true e false
    };
    const handleButtonPress1 = () => {
        setIsPressed1(!isPressed1); // Alterna o estado entre true e false
    };

    function getUserItem({ item: user }) {


    }

    return (

        <View>
            
            <View style={{ flexDirection: 'row', width: 'auto', height: 100, alignItems: 'center' }}>
                <Image
                    source={require('../../assets/imgPlaceHolder.png')}
                    style={{
                        height: 60,
                        width: 64,
                        margin: 20
                    }}
                />
                <View style={{ flexDirection: 'column' }}>
                    <Text keyExtractor={user => user.id.toString()}
                data={users} style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }} key={id}>{user.name}</Text>
                    <Text style={{ color: 'black' }}>Lorem Ipsum has been the industry's {"\n"}standard dummy text Lorem ipsum dolor {"\n"}sit amet, consectetur nostrud</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: -10 }}>
                        <TouchableOpacity onPress={handleButtonPress}>
                            <Image
                                source={isPressed ? require('../../assets/like.png') : require('../../assets/whiteHeart.png')}
                                style={{
                                    height: 22,
                                    width: 22,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonPress1}>
                            <Image
                                source={isPressed1 ? require('../../assets/atention.png') : require('../../assets/whiteAtention.png')}
                                style={{
                                    height: 22,
                                    width: 22,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

           
        </View>

    );
};

