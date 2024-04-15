import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GLOBALS from '../Common/Globals';
import { NavBarSearch } from "../Common/NavBarSearch";
import { NavBarTabs } from "../Common/Tabs";
import { PropertiesMap } from "./PropertiesMap";


const PropertiesStack = createNativeStackNavigator();

export function Properties() {

    return (
        <PropertiesStack.Navigator>
            <PropertiesStack.Screen
                name='Properties Main'
                component={NavBarTabs}
                options={{
                    headerTitle: (props) => <NavBarSearch {...props} />,
                    headerStyle: {
                        backgroundColor: GLOBALS.HEADER_COLOR,
                    },
                    headerTintColor: GLOBALS.HEADER_TINT_COLOR,
                    headerTitleStyle: {
                        fontWeight: GLOBALS.HEADER_TITLE_FONTWEIGHT,
                    },
                }
                }
            />
            <PropertiesStack.Screen
                name='Properties Map'
                title='Properties Map'
                component={PropertiesMap}
                options={{
                    headerStyle: {
                        backgroundColor: GLOBALS.HEADER_COLOR,
                    },
                    headerTintColor: GLOBALS.HEADER_TINT_COLOR,
                    headerTitleStyle: {
                        fontWeight: GLOBALS.HEADER_TITLE_FONTWEIGHT,
                    },
                }
                }
            />
            {/* A faire a semaine prochaine */}
            {/* <Property Map /> */}

            <PropertiesStack.Screen
                name="Property Info"
                title="Property"
                component={PropertyView}
                options={{
                    headerStyle: {
                        backgroundColor: GLOBALS.HEADER_COLOR,
                    },
                    headerTintColor: GLOBALS.HEADER_TINT_COLOR,
                    headerTitleStyle: {
                        fontWeight: GLOBALS.HEADER_TITLE_FONTWEIGHT,
                    },
                }}
            />   

        </PropertiesStack.Navigator>
    );

}