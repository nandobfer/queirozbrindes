import React, { useRef } from 'react'
import {View} from 'react-native'
import { StackNavigation, StackRoute } from '../../../Routes'
import ViewShot, { captureRef } from "react-native-view-shot"

interface DrawProps {
    navigation: StackNavigation
    route: StackRoute
}

export const DrawScreen: React.FC<DrawProps> = (props) => {
    const order = props.route.params?.order!
    const shotRef = useRef(null)
    
    return (
        <View style={[{flex: 1}]}>
            <ViewShot ref={shotRef} style={{ backgroundColor: "white" }}>
                {/* <CanvasContainer
                    navigation={navigation}
                    image={baseImage}
                    shouldUndo={shouldUndo}
                    setShouldUndo={setShouldUndo}
                    updateColor={updateColor}
                    stroke={stroke}
                /> */}
            </ViewShot>
        </View>
    )
}