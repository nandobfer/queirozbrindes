import React, { useRef } from "react"
import { View } from "react-native"
import { Order } from "../../../types/server/class/Order"
import { Button, Surface, Text } from "react-native-paper"
import { currencyMask } from "../../../tools/currencyMask"
import { useNavigation } from "@react-navigation/native"
import { StackNavigation } from "../../../Routes"
import { Swipeable } from "react-native-gesture-handler"
import { SwipedContainer } from "../../../components/SwipedContainer"
import { colors } from "../../../style/colors"
import { useOrder } from "../../../hooks/useOrder"

interface OrderCardProps {
    order: Order
    onDelete: () => void
}

export const OrderCard: React.FC<OrderCardProps> = (props) => {
    const swipeableRef = useRef<Swipeable>(null)
    const totalValue = props.order.items.reduce((acc, item) => acc + item.quantity * item.unit_price, 0)
    const navigation = useNavigation<StackNavigation>()
    const { deleteOrder, deleting } = useOrder(props.order)

    const handleSwipe = async (direction: "left" | "right") => {
        if (direction === "right") {
            await deleteOrder()
            props.onDelete()
        } else {
            // Handle edit action
            console.log("Edit order:", props.order.id)
        }
        swipeableRef.current?.close()
    }

    return (
        <Swipeable
            ref={swipeableRef}
            renderLeftActions={() => <SwipedContainer label="Editar" color={colors.info} direction="left" />}
            renderRightActions={() => <SwipedContainer label="Excluir" color={colors.error} direction="right" loading={deleting} />}
            onSwipeableOpen={handleSwipe}
            overshootRight={false}
            overshootLeft={false}
            friction={2}
            leftThreshold={50}
            rightThreshold={50}
            containerStyle={{ overflow: "visible" }}
        >
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
        </Swipeable>
    )
}
