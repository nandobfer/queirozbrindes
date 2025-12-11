import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "./Screens/Home/Home"
import { default_navigator_options } from "./tools/default_navigator_options"

interface RoutesProps {}

export type HomeStackParams = {
    home: undefined
    signup: undefined
    mainscreen: undefined
    chat: undefined
    lesson: undefined
}

const Stack = createNativeStackNavigator<HomeStackParams>()

export const Routes: React.FC<RoutesProps> = ({}) => {

    return (
        <Stack.Navigator
            screenOptions={{
                ...default_navigator_options,
                // headerTitle: ios ? undefined : () => <Header />,
                // header: ios ? () => <HeaderIos /> : undefined,
            }}
        >
            <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
    )
}
