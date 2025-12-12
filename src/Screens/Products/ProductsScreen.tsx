import React, { useCallback } from "react"
import { FlatList, View } from "react-native"
import { StackNavigation, StackRoute } from "../../Routes"
import { useQuery } from "@tanstack/react-query"
import { api } from "../../backend/api"
import { Order } from "../../types/server/class/Order"
import { ProductItem } from "./ProductItem"
import { FAB, Text } from "react-native-paper"
import { useFocusEffect } from "@react-navigation/native"


interface ProductsScreenProps {
    navigation: StackNavigation
    route: StackRoute
}

export const ProductsScreen: React.FC<ProductsScreenProps> = (props) => {
    const {
        data: order,
        refetch,
        isFetching,
    } = useQuery<Order>({
        queryKey: ["orderDetails"],
        queryFn: async () => (await api.get(`/order`, { params: { order_id: props.route.params?.order?.id } })).data,
        initialData: props.route.params?.order as Order,
    })

    useFocusEffect(
        useCallback(() => {
            refetch()
        }, [])
    )

    return (
        <View style={[{ flex: 1 }]}>
            <FlatList
                data={order.items}
                renderItem={({ item }) => <ProductItem product={item} onDelete={refetch} order={order} />}
                ListEmptyComponent={
                    <View>
                        <Text>Nenhum produto para mostrar</Text>
                    </View>
                }
                contentContainerStyle={{ gap: 20, padding: 20 }}
                refreshing={isFetching}
                onRefresh={refetch}
                keyExtractor={(item) => item.id}
            />

            <FAB
                style={[
                    {
                        position: "absolute",
                        right: 15,
                        bottom: 15,
                        borderRadius: 100,
                    },
                ]}
                icon="plus"
                onPress={() => props.navigation.navigate("ProductForm", { order: order })}
            />
        </View>
    )
}
