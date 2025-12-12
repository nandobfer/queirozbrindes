import React from 'react'
import {View} from 'react-native'
import { Order } from '../../../types/server/class/Order'
import { Button, Surface, Text } from "react-native-paper"
import { currencyMask } from "../../../tools/currencyMask"
import { useNavigation } from "@react-navigation/native"
import { StackNavigation } from "../../../Routes"

interface OrderCardProps {
    order: Order
}

export const OrderCard: React.FC<OrderCardProps> = (props) => {
    const totalValue = props.order.items.reduce((acc, item) => acc + item.quantity * item.unit_price, 0)
    const navigation = useNavigation<StackNavigation>()

    return (
        <Surface style={[{ padding: 20, borderRadius: 8, gap: 10 }]}>
            <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
                <Text variant="titleLarge"># {props.order.number}</Text>
                <Text variant="titleSmall">{new Date(props.order.order_date).toLocaleDateString("pt-br")}</Text>
            </View>

            <Text variant="titleMedium">{props.order.customer.name}</Text>
            <Text variant="titleMedium">{props.order.customer.cnpj}</Text>

            <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }]}>
                <Button mode="contained" onPress={() => navigation.navigate("Products", { order: props.order })}>
                    Produtos
                </Button>
                <Text variant="titleLarge">Total: {currencyMask(totalValue)}</Text>
            </View>
        </Surface>
    )
}