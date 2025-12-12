import React, { useState } from "react"
import { Pressable, ScrollView, View } from "react-native"
import { SelectComponent } from "../../components/SelectComponent"
import { useFormik } from "formik"
import { DeliveryDate, OrderForm, OrderType } from "../../types/server/class/Order"
import { useQuery } from "@tanstack/react-query"
import { api } from "../../backend/api"
import { FormText } from "../../components/FormText"
import { Button, Text, TextInput } from "react-native-paper"
import DatePicker from "react-native-date-picker"
import { estados } from "../../tools/estadosBrasil"
import { StackNavigation } from "../../Routes"

interface OrderFormScreenProps {
    navigation: StackNavigation
}

const orderTypes: { value: OrderType; label: string }[] = [
    { label: "Orçamento", value: "budget" },
    { label: "Pedido", value: "order" },
]

export const OrderFormScreen: React.FC<OrderFormScreenProps> = ({navigation}) => {
    const [selectDate, setSelectDate] = useState<"order_date" | "delivery_date_from" | "delivery_date_to" | null>(null)
    const [deliveryDate, setDeliveryDate] = useState<DeliveryDate>({ from: 0, to: 0 })
    const [posting, setPosting] = useState(false)


    const { data: nextAvailableNumber, isFetching } = useQuery<number>({
        initialData: 0,
        queryKey: ["nextNumber"],
        queryFn: async () => (await api.get("/order/next-available-number")).data,
        refetchOnWindowFocus: true,
    })

    const formik = useFormik<OrderForm>({
        initialValues: {
            type: "budget",
            number: nextAvailableNumber.toString(),
            items: [],
            customer: { id: "", name: "" },
            order_date: Date.now(),
        },
        async onSubmit(values, formikHelpers) {
            if (posting) return
            setPosting(true)
            try {
                const response = await api.post("/order", values)
                navigation.navigate('123')
            } catch (error) {
                console.log(error)
            } finally {
                setPosting(false)
            }
        },
    })

    return (
        <ScrollView style={[{ flex: 1 }]} contentContainerStyle={[{ padding: 20, gap: 10 }]} keyboardShouldPersistTaps="handled">
            <Text variant="titleLarge">Orçamento #{nextAvailableNumber}</Text>
            <View style={[{ flexDirection: "row", gap: 10 }]}>
                <SelectComponent label="Tipo" flex={1} data={orderTypes} formik={formik} name="type" />
                <Pressable onPress={() => setSelectDate("order_date")} style={{ flex: 1 }}>
                    <FormText
                        label={"Data do pedido"}
                        name="order_date"
                        formik={formik}
                        readOnly
                        flex={1}
                        right={<TextInput.Icon icon={"calendar-range"} pointerEvents="none" />}
                        value={formik.values.order_date ? new Date(Number(formik.values.order_date)).toLocaleDateString("pt-br") : ""}
                    />
                </Pressable>
            </View>

            <FormText label="Nome fantasia" formik={formik} name="customer.name" />
            <FormText label="Razão social" formik={formik} name="customer.company_name" />

            <View style={[{ flexDirection: "row", gap: 10 }]}>
                <FormText label={"CNPJ"} name="customer.cnpj" formik={formik} flex={1} mask="99.999.999/9999-99" keyboardType="numeric" />
                <FormText label={"Inscrição estadual"} name="customer.state_registration" formik={formik} flex={1} keyboardType="numeric" />
            </View>

            <FormText label="Endereço" formik={formik} name="customer.address" />
            <FormText label="Bairro" formik={formik} name="customer.neighborhood" />

            <View style={[{ flexDirection: "row", gap: 10 }]}>
                <FormText label={"Cidade"} name="customer.city" formik={formik} flex={1} />
                <SelectComponent
                    label="Estado"
                    flex={1}
                    data={estados}
                    formik={formik}
                    name="customer.state"
                    search
                    searchPlaceholder="Digite para filtrar"
                    placeholder="Selecione"
                />
            </View>

            <FormText label="Telefone" formik={formik} name="customer.phone" mask="(99) 9 9999-9999" keyboardType="phone-pad" />
            <FormText label="Condições de pagamento" formik={formik} name="payment_terms" />

            <View style={[{ flexDirection: "row", gap: 10 }]}>
                <Pressable onPress={() => setSelectDate("delivery_date_from")} style={{ flex: 1 }}>
                    <FormText
                        label={"Entrega a partir de"}
                        name="delivery_date.from"
                        formik={formik}
                        readOnly
                        flex={1}
                        right={<TextInput.Icon icon={"calendar-range"} pointerEvents="none" />}
                        value={formik.values.delivery_date?.from ? new Date(formik.values.delivery_date.from).toLocaleDateString("pt-br") : ""}
                    />
                </Pressable>
                <Pressable onPress={() => setSelectDate("delivery_date_to")} style={{ flex: 1 }}>
                    <FormText
                        label={"Entrega até"}
                        name="delivery_date.to"
                        formik={formik}
                        readOnly
                        flex={1}
                        right={<TextInput.Icon icon={"calendar-range"} pointerEvents="none" />}
                        value={formik.values.delivery_date?.to ? new Date(formik.values.delivery_date.to).toLocaleDateString("pt-br") : ""}
                    />
                </Pressable>
            </View>

            <Button mode="contained" onPress={() => formik.handleSubmit()} loading={posting} disabled={isFetching || posting} style={{ marginTop: 20 }}>
                Continuar
            </Button>

            <DatePicker
                modal
                open={!!selectDate}
                date={
                    selectDate === "order_date"
                        ? new Date(formik.values.order_date)
                        : selectDate === "delivery_date_from"
                        ? new Date(deliveryDate.from || Date.now())
                        : new Date(deliveryDate.to || Date.now())
                }
                onConfirm={(date) => {
                    formik.setFieldValue(
                        selectDate === "delivery_date_from"
                            ? "delivery_date.from"
                            : selectDate === "delivery_date_to"
                            ? "delivery_date.to"
                            : "order_date",
                        date.getTime()
                    )
                    setSelectDate(null)
                }}
                onCancel={() => setSelectDate(null)}
                mode="date"
                locale="pt-BR"
                title={"Data do pedido"}
                cancelText="Cancelar"
                confirmText="Confirmar"
                theme="light"
            />
        </ScrollView>
    )
}
