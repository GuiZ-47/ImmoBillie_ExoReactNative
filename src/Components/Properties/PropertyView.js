import React from "react";
import { useState } from "react";
import { Linking } from "react-native";
import { UseSelector, useSelector } from "react-redux";
import {
    Box,
    Button,
    HStack,
    VStack,
    AspectRatio,
    Text,
    Image,
    ScrollView,
} from "native-base";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GLOBALS from "../Common/Globals";

// -----------TRADUCTION-------------
// import "intl";
// import "intl/locale-data/jsonp/en"; les fichiers de trad 

export function PropertyView({ route }) {
    const [propertyDB, setPropertyDB] = useState({});
    const [isOpen, setOpen] = useState(false);
    const openGallery = () => setOpen(true);
    const closeGallery = () => setOpen(false);
    const navigation = useNavigation();

    const dollarUSLocal = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    });

    const { id } = route.params;
    const { list } = useSelector((state) => state.properties);
    const property = list.find((x) => x.id === id); // en symfony ça serait un truc comme : select * from properties where id = id

    const imageURLs = property.images.map((image, index) => {
        return {
            id: index.toString(),
            thumbnail: image,
            url: image.url,
            description: 'description',
        };
    });

    const mapLatitude = parseFloat(property.lat, 10);
    const mapLongitude = parseFloat(property.lng, 10);

    const openMap = () => {
        let url = "https://www.google.com/maps/search/?api=1&query=${mapLatitude},${mapLongitude}";

        Linking.openURL(url)
            .then((data) => {
                console.log(data)
            })
            .catch(() => {
                console.log("erreur lors de l'ouverture de la carte")
            })
    }

    return (
        <Box border="1" borderRadius="md">
            <ScrollView>
                <VStack space="4">
                    <Box>
                        <ImageCarousel data={imageURLs} openGallery={openGallery} />
                    </Box>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 24,
                                paddingTop: 10,
                            }}
                        >
                            {dollarUSLocale.format(property.price)}
                        </Text>
                        <Text
                            style={{
                                textAlign: "right",
                                marginRight: 10,
                            }}
                        >
                            {property.bedrooms} Beds / {property.bathrooms} Baths
                        </Text>
                    </HStack>
                    <HStack
                        alignItems="center"
                        space={4}
                        justifyContent="space-between"
                        mt="-4"
                        p="0"
                    >
                        <Text
                            style={{
                                color: "grey",
                                marginLeft: 10,
                            }}
                        >
                            {property.address}
                        </Text>
                    </HStack>
                    <HStack alignItems="center" space={1} justifyContent="space-between">
                        <Button
                            variant="outline"
                            title="View Map"
                            onPress={() =>
                                navigation.navigate("Property Map", {
                                    latitude: mapLatitude,
                                    longitude: mapLongitude,
                                })
                            }
                            style={{
                                marginLeft: 10,
                                flex: 1,
                            }}
                            leftIcon={
                                <MaterialCommunityIcons
                                    name="map-marker-radius"
                                    size={24}
                                    color="black"
                                />
                            }
                        >
                            View Map
                        </Button>
                        <Button
                            variant="outline"
                            title="Get Directions"
                            onPress={() => handleGetDirections()}
                            style={{
                                flex: 1,
                            }}
                            leftIcon={
                                <FontAwesome5 name="directions" size={24} color="black" />
                            }
                        >
                            Get Directions
                        </Button>
                        <Button
                            variant="outline"
                            title="Uber"
                            onPress={() => initiateUber()}
                            style={{
                                marginRight: 10,
                                flex: 1,
                            }}
                            leftIcon={<FontAwesome5 name="uber" size={24} color="black" />}
                        >
                            Uber
                        </Button>
                    </HStack>
                    <HStack alignItems="center" space={1} justifyContent="space-between">
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 20,
                            }}
                        >
                            Key Details
                        </Text>
                    </HStack>
                    <HStack
                        justifyContent="space-between"
                        m="0"
                        p="0"
                        style={{ marginLeft: 10, marginRight: 10 }}
                    >
                        <Text>Property Status</Text>
                        <Text>{property.property_status}</Text>
                    </HStack>
                    <HStack
                        justifyContent="space-between"
                        mt="-3"
                        p="0"
                        style={{ marginLeft: 10, marginRight: 10 }}
                    >
                        <Text>Property Type</Text>
                        <Text>{property.property_type}</Text>
                    </HStack>
                    <HStack
                        justifyContent="space-between"
                        mt="-3"
                        p="0"
                        style={{ marginLeft: 10, marginRight: 10 }}
                    >
                        <Text>Land Area</Text>
                        <Text>{property.land_area}</Text>
                    </HStack>
                    <HStack
                        justifyContent="space-between"
                        mt="-3"
                        p="0"
                        style={{ marginLeft: 10, marginRight: 10 }}
                    >
                        <Text>Build Size</Text>
                        <Text>{property.build_size}</Text>
                    </HStack>
                    <HStack alignItems="center" space={1} justifyContent="space-between">
                        <Text
                            style={{
                                flex: 1,
                                marginLeft: 10,
                                fontSize: 20,
                            }}
                        >
                            About this home
                        </Text>
                    </HStack>
                    <HStack alignItems="center" space={1} justifyContent="space-between">
                        <Text
                            style={{
                                marginLeft: 10,
                            }}
                        >
                            {property.description}
                        </Text>
                    </HStack>
                    <HStack alignItems="center" space={1} justifyContent="space-between">
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 20,
                            }}
                        >
                            Contact Agent - {property.user.fname} {property.user.lname}
                        </Text>
                    </HStack>

                    <HStack alignItems="center" space={1} justifyContent="space-between">
                        <AspectRatio w="100%" ratio={16 / 14}>
                            <Image
                                style={{ paddingTop: "25px", marginTop: "25px" }}
                                source={{
                                    uri: `${GLOBALS.TEMP_IMAGE_PATH}${property.user.picture}`,
                                }}
                                alt="image"
                            />
                        </AspectRatio>
                    </HStack>

                    <HStack alignItems="center" space={1} justifyContent="space-between">
                        <Button
                            title="Send Agent Message"
                            style={{
                                flex: 1,
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 100,
                            }}
                        >
                            Send Message
                        </Button>
                    </HStack>
                </VStack>
                <ImageGallery close={closeGallery} isOpen={isOpen} images={imageURLs} />
            </ScrollView>
        </Box>
    );
};
