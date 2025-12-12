import { useState } from "react"
import { Order } from "../types/server/class/Order"
import { api } from "../backend/api"

export const useOrder = (order: Order) => {
    const [deleting, setDeleting] = useState(false)

    const deleteOrder = async () => {
        setDeleting(true)
        try {
            await api.delete(`/order`, { params: { order_id: order.id } })
        } catch (error) {
            console.log("Error deleting order:", error)
        } finally {
            setDeleting(false)
        }
    }

    return { deleting, deleteOrder }
}
