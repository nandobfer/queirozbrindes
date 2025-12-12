import React from "react"
import { FlatList, View } from "react-native"
import { Order } from "../../../types/server/class/Order"
import { OrderCard } from "./OrderCard"
import { Text } from "react-native-paper"

interface OrderListProps {
    orders: Order[]
}

export const OrderList: React.FC<OrderListProps> = (props) => {
    return (
        <FlatList
            data={props.orders}
            renderItem={({ item }) => <OrderCard order={item} />}
            ListEmptyComponent={
                <View>
                    <Text>Nenhum pedido para mostrar</Text>
                </View>
            }
            style={{ padding: 20 }}
        />
    )
}
