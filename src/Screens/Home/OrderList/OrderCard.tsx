import React from 'react'
import {View} from 'react-native'
import { Order } from '../../../types/server/class/Order'
import { Surface, Text } from 'react-native-paper'

interface OrderCardProps {
    order: Order
}

export const OrderCard:React.FC<OrderCardProps> = (props) => {
    
    return (
        <Surface>
            <Text>Order ID: {props.order.number}</Text>
        </Surface>
    )
}