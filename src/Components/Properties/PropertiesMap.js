import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";


// -----------TRADUCTION-------------
// import "intl";
// import "intl/locale-data/jsonp/en"; les fichiers de trad 

export function PropertiesMap() {
    const { listFiltered, propertiesUSRealEstate } = useSelector(
        (state) => state.properties
    );

    const dollarUSLocal = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    });

    const navigation = useNavigation();

    if (Array.isArray(listFiltered) && listFiltered.length > 0) {
        var { lat, lng } = listFiltered[0];
    } else {
        var lat = 0;
        var lng = 0;
    }

    return (
        <MapView
            style={{ minHeight: '100%', minWidth: '100%' }}
            initialRegion={{
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),
                latitudeDelta: 0.7,
                longitudeDelta: 0.7,
            }}
        // onRegionChangeComplete={(region) => setregion(region)}
        >
            {/* on doit créer plusieurs séries de <Marker> de même index qui vont se superposerpour pour insérer différnts infos sur ces marker, si on avait voulu mettre une phot il aurait fallu recfaire une autre boucles de marker  */}
            {listFiltered.length > 0 &&
                listFiltered.map((marker, index) => {
                    if (marker?.lat && marker?.lng) {
                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: parseFloat(marker.lat),
                                    longitude: parseFloat(marker.lng),
                                }}
                                title={dollarUSLocal.format(marker.price)}
                                onCalloutPress={() => {
                                    navigation.navigate('property info', {
                                        id: marker.id
                                    })
                                }}
                            />
                        );
                    }
                })
            }
            {propertiesUSRealEstate.length > 0 &&
                propertiesUSRealEstate.map((marker, index) => {
                    if (marker?.adresse?.coordinate?.lat &&
                        marker?.adresse?.coordinate?.lng) {
                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: parseFloat(marker.address.coordinate.lat),
                                    longitude: parseFloat(marker.address.coordinate.lng),
                                }}
                                title={dollarUSLocal.format(marker.price)}
                                onCalloutPress={() => {
                                    navigation.navigate('property info', {
                                        id: marker.id
                                    });
                                }}
                            />
                        );
                    }
                })
            }
        </MapView>
    );
}


