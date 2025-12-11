import { useFocusEffect } from "@react-navigation/native"
import React, { useCallback, useRef } from "react"
import { Logo } from "../../components/Logo"
import { BackHandler, LayoutAnimation, ScrollView } from "react-native"
import { ExternalRoute } from "../../types/ExternalRoute"

interface HomeProps {
    navigation: any
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
    const externalRoute = useRef<ExternalRoute>()

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                return true
            }
            const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress)

            return () => {
                backHandler.remove()
            }
        }, [])
    )

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={"handled"}
            contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
                paddingHorizontal: 60,
            }}
        >
            <Logo />
        </ScrollView>
    )
}
