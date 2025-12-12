import React from "react"
import { FlatList, View } from "react-native"
import { Order } from "../../../types/server/class/Order"
import { OrderCard } from "./OrderCard"
import { Text } from "react-native-paper"

interface OrderListProps {
    orders: Order[]
    isFetching: boolean
    refetch: () => void
}

export const OrderList: React.FC<OrderListProps> = (props) => {
    return (
        <FlatList
            data={props.orders.sort((a, b) => b.order_date - a.order_date)}
            renderItem={({ item }) => <OrderCard order={item} />}
            ListEmptyComponent={
                <View>
                    <Text>Nenhum pedido para mostrar</Text>
                </View>
            }
            contentContainerStyle={{ padding: 20 }}
            refreshing={props.isFetching}
            onRefresh={props.refetch}
        />
    )
}
