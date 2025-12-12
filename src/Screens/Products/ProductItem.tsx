import React from "react"
import { View } from "react-native"
import { Item } from "../../types/server/class/Item"
import { Surface, Text } from "react-native-paper"
import { currencyMask } from "../../tools/currencyMask"

interface ProductItemProps {
    product: Item
}

export const ProductItem: React.FC<ProductItemProps> = (props) => {
    return (
        <Surface style={[{ padding: 10, borderRadius: 8, gap: 10 }]}>
            <Text numberOfLines={3} variant="titleLarge">
                {props.product.description}
            </Text>
            <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
                <Text variant="titleMedium">
                    {props.product.quantity}x {currencyMask(props.product.unit_price)}
                </Text>
                <Text variant="titleMedium">
                    Subtotal: {currencyMask(props.product.quantity * props.product.unit_price)}
                </Text>
            </View>
        </Surface>
    )
}
