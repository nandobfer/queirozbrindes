import React, { useCallback, useEffect } from "react"
import { FlatList, View } from "react-native"
import { StackNavigation, StackRoute } from "../../Routes"
import { useQuery } from "@tanstack/react-query"
import { api } from "../../backend/api"
import { Order } from "../../types/server/class/Order"
import { ProductItem } from "./ProductItem"
import { Divider, FAB, Text } from "react-native-paper"
import { useFocusEffect } from "@react-navigation/native"
import { IconedText } from "../../components/IconedText"
import { estados } from "../../tools/estadosBrasil"
import { currencyMask } from "../../tools/currencyMask"

interface OrderScreenProps {
    navigation: StackNavigation
    route: StackRoute
}

export const OrderScreen: React.FC<OrderScreenProps> = (props) => {
    const {
        data: order,
        refetch,
        isFetching,
    } = useQuery<Order>({
        queryKey: ["orderDetails"],
        queryFn: async () => (await api.get(`/order`, { params: { order_id: props.route.params?.order?.id } })).data,
        initialData: props.route.params?.order as Order,
    })

    const stateName = estados.find((item) => item.value === order.customer.state)
    const totalValue = order.items.reduce((acc, item) => acc + item.quantity * item.unit_price, 0)

    useFocusEffect(
        useCallback(() => {
            refetch()
        }, [])
    )

    useEffect(() => {
        props.navigation.setOptions({ title: `${order.type === "budget" ? "Orçamento" : "Pedido"} #${order.number}` })
    }, [props.navigation])

    return (
        <View style={[{ flex: 1, padding: 20, gap: 10 }]}>
            <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
                <IconedText variant="titleLarge" icon={"card-account-details"}>
                    {order.customer.name}
                </IconedText>

                <IconedText variant="titleSmall" icon="calendar">
                    {new Date(order.order_date).toLocaleDateString("pt-br")}
                </IconedText>
            </View>

            <Text variant="titleMedium">{order.customer.company_name}</Text>

            <IconedText variant="titleMedium" icon={"domain"}>
                {order.customer.cnpj}
            </IconedText>

            <IconedText variant="titleMedium" icon={"phone"}>
                {order.customer.phone}
            </IconedText>

            <Text variant="titleMedium">Insc. Estadual: {order.customer.state_registration}</Text>

            <Divider />

            <IconedText variant="titleSmall" icon="map-marker">
                {order.customer.street}
            </IconedText>
            <Text variant="titleSmall"> {[order.customer.neighborhood, order.customer.city, stateName?.label].join(", ")} </Text>

            <Divider />

            <IconedText icon="cash" variant="titleLarge">
                {currencyMask(totalValue)}
            </IconedText>
            <Text variant="titleSmall">Condições de pagamento: {order.payment_terms}</Text>

            <Divider />

            <IconedText icon="truck-delivery" variant="titleLarge">
                Entrega{" "}
            </IconedText>
            {order.delivery_date?.from && <Text variant="titleMedium">A partir de: {new Date(order.delivery_date.from).toLocaleDateString("pt-br")}</Text>}
            {order.delivery_date?.to && <Text variant="titleMedium">Até: {new Date(order.delivery_date.to).toLocaleDateString("pt-br")}</Text>}

            <Divider />

            <IconedText icon="receipt" variant="titleLarge">Produtos</IconedText>
            <FlatList
                data={order.items}
                renderItem={({ item }) => <ProductItem product={item} onDelete={refetch} order={order} />}
                ListEmptyComponent={
                    <View>
                        <Text>Nenhum produto para mostrar</Text>
                    </View>
                }
                style={[{ margin: -20 }]}
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
