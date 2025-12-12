import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "./Screens/Home/Home"
import { default_navigator_options } from "./tools/default_navigator_options"
import { OrderFormScreen } from "./Screens/OrderFormScreen/OrderFormScreen"
import { NavigationProp, RouteProp } from "@react-navigation/native"
import { ProductsScreen } from "./Screens/Products/ProductsScreen"
import { Order } from "./types/server/class/Order"
import { ProductFormScreen } from "./Screens/Products/ProductFormScreen"

interface RoutesProps {}

export type RoutePaylod = { id?: string; order?: Order } | undefined
export type ScreenNames = ["Home", "OrderForm", "Products", "ProductForm"]
export type RootStackParamList = Record<ScreenNames[number], RoutePaylod>
export type StackNavigation = NavigationProp<RootStackParamList>
export type StackRoute = RouteProp<RootStackParamList, ScreenNames[number]>

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
            <Stack.Screen name="Products" component={ProductsScreen} options={{ title: "Produtos do Pedido" }} />
            <Stack.Screen name="ProductForm" component={ProductFormScreen} options={{ title: "Adicionar Produto" }} />
        </Stack.Navigator>
    )
}
