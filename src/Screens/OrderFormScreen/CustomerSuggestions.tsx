import React from "react"
import { View } from "react-native"
import { ProgressBar, Surface, Text, TouchableRipple, useTheme } from "react-native-paper"
import { Customer } from "../../types/server/class/Customer"

interface CustomerSuggestionsProps {
    customers: Customer[]
    loading: boolean
    onSelect: (customer: Customer) => void
}

export const CustomerSuggestions: React.FC<CustomerSuggestionsProps> = (props) => {
    const theme = useTheme()

    return (
        <Surface
            style={{
                position: "absolute",
                top: 70,
                width: "100%",
                backgroundColor: theme.colors.elevation.level5,
                borderRadius: 8,
                paddingVertical: 10,
                zIndex: 90,
            }}
        >
            <View
                style={{
                    borderTopWidth: 0,
                    width: 0,
                    height: 0,
                    position: "absolute",
                    left: 15,
                    top: -10,
                    borderBottomColor: theme.colors.elevation.level5,
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderBottomWidth: 10,
                    borderRightWidth: 10,
                    borderLeftWidth: 10,
                }}
            />
            {!props.loading && props.customers.length === 0 && (
                <Text style={[{ paddingHorizontal: 10, paddingVertical: 5 }]}>Digite para buscar</Text>
            )}
            {props.loading && <ProgressBar indeterminate color={theme.colors.primary} />}
            {props.customers.map((item, index) => (
                <TouchableRipple
                    key={item.id}
                    onPress={() => props.onSelect(item)}
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        gap: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderTopWidth: index === 0 ? undefined : 1,
                            borderTopColor: theme.colors.outline,
                            paddingTop: index === 0 ? undefined : 5,
                        }}
                    >
                        <Text variant="titleLarge">{item.name}</Text>
                        <Text variant="titleSmall">{item.cnpj}</Text>
                    </View>
                </TouchableRipple>
            ))}
        </Surface>
    )
}
