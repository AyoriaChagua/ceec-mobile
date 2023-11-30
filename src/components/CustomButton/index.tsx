import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'

interface Props {
    readonly text: string,
    readonly onPress: () => void,
    readonly disabled: boolean
}

export default function CustomButton({ text, onPress, disabled }: Props) {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={{
                    backgroundColor: "#2B32CE",
                    padding: 17,
                    borderRadius: 10,
                    marginBottom: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",

                }}
                disabled={disabled}
            >
                <Text style={{
                    textAlign: 'center',
                    color: "#fff",
                    fontSize: 17,
                    fontWeight: '700'
                }}
                >
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})