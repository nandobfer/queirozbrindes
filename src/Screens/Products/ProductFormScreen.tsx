import React, { useEffect } from "react"
import { ScrollView, View } from "react-native"
import { StackNavigation, StackRoute } from "../../Routes"
import { Button, Text } from "react-native-paper"
import { useFormik, yupToFormErrors } from "formik"
import { Item } from "../../types/server/class/Item"
import { FormText } from "../../components/FormText"
import * as Yup from "yup"
import { currencyMask } from "../../tools/currencyMask"
import { uniqueId } from "lodash"
import { api } from "../../backend/api"
import { Order } from "../../types/server/class/Order"

interface ProductFormScreenProps {
    navigation: StackNavigation
    route: StackRoute
}

const validation = Yup.object().shape({
    description: Yup.string().required("A discriminação é obrigatória"),
    quantity: Yup.number().min(1, "A quantidade mínima é 1").required("A quantidade é obrigatória").typeError("A quantidade deve ser um número"),
    unit_price: Yup.number().min(0, "O preço mínimo é 0").required("O preço unitário é obrigatório").typeError("O preço unitário deve ser um número"),
})

export const ProductFormScreen: React.FC<ProductFormScreenProps> = (props) => {
    const order_id = props.route.params?.order?.id as string
    const formik = useFormik<Item>({
        initialValues: { description: "", quantity: 0, unit_price: 0, id: "" },
        async onSubmit(values, formikHelpers) {
            const productToAdd: Item = {
                ...values,
                id: uniqueId(),
            }
            try {
                const response = await api.post<Order>("/order/item", productToAdd, { params: { order_id } })
                console.log(response.data)
                props.navigation.goBack()
            } catch (error) {
                console.log(error)
            }
        },
        validationSchema: validation,
    })

    useEffect(() => {
        props.navigation.setOptions({ title: `Pedido #${props.route.params?.order?.number}` })
    }, [props.navigation])

    return (
        <ScrollView style={[{ flex: 1 }]} contentContainerStyle={[{ padding: 20, gap: 10 }]} keyboardShouldPersistTaps="handled">
            <Text variant="titleLarge">Adicionar produto</Text>

            <FormText label="Discriminação" formik={formik} name="description" />

            <View style={[{ flexDirection: "row", gap: 10 }]}>
                <FormText label={"Quantidade"} name="quantity" formik={formik} flex={1} keyboardType="numeric" />
                <FormText label={"Preço unitário"} name="unit_price" formik={formik} flex={1} keyboardType="numeric" />
            </View>

            <Text style={[{ alignSelf: "flex-end" }]}>Subtotal: {currencyMask(formik.values.quantity * formik.values.unit_price)}</Text>
            <Button mode="contained" onPress={() => formik.handleSubmit()} loading={formik.isSubmitting} disabled={formik.isSubmitting}>
                Adicionar Produto
            </Button>
        </ScrollView>
    )
}
