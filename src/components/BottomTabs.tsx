import React from "react"
import { OrderList } from "../Screens/Home/OrderList/OrderList"
import { useQuery } from "@tanstack/react-query"
import { Order } from "../types/server/class/Order"
import { api } from "../backend/api"
import { BottomNavigation, Text } from "react-native-paper"

interface BottomTabsProps {}

export const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
    const [tabIndex, setTabIndex] = React.useState(0)
    const [routes] = React.useState([
        { key: "budgets", title: "Orçamentos", focusedIcon: "clipboard-list", unfocusedIcon: "clipboard-list-outline" },
        { key: "orders", title: "Pedidos", focusedIcon: "archive-check", unfocusedIcon: "archive-check-outline" },
    ])

    const { data, isFetching } = useQuery<Order[]>({
        initialData: [],
        queryKey: ["ordersData", tabIndex],
        queryFn: async () => (await api.get("/order")).data,
        refetchOnWindowFocus: true,
    })

    const Orders = () => <OrderList orders={data.filter((item) => item.type === "order")} />
    const Budgets = () => <OrderList orders={data.filter((item) => item.type === "budget")} />

    const renderScene = BottomNavigation.SceneMap({
        budgets: Budgets,
        orders: Orders,
    })

    return <BottomNavigation navigationState={{ index: tabIndex, routes }} onIndexChange={setTabIndex} renderScene={renderScene} />
}
