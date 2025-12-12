import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "./Screens/Home/Home"
import { default_navigator_options } from "./tools/default_navigator_options"
import { OrderFormScreen } from "./Screens/OrderFormScreen/OrderFormScreen"
import { NavigationProp } from "@react-navigation/native"

interface RoutesProps {}

export type ScreenNames = ["Home", "OrderForm"]
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                ...default_navigator_options,
                // headerTitle: ios ? undefined : () => <Header />,
                // header: ios ? () => <HeaderIos /> : undefined,
            }}
        >
            <Stack.Screen name="Home" component={Home} options={{ title: "Pedidos e Orçamentos" }} />
            <Stack.Screen name="OrderForm" component={OrderFormScreen} options={{ title: "Formulário de Pedido" }} />
        </Stack.Navigator>
    )
}
