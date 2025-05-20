import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);
    const [cityAddress, setCityAddress] = useState(null);
    const [loading, setLoading] = useState(true);

    const askForPermission = async () => {
        setErrorMsg("");
        setLoading(true);

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            setErrorMsg("Permiso de ubicación no concedido");
            setLoading(false);
            return false;
        }

        let coordsData = await Location.getLastKnownPositionAsync();

        if (!coordsData) {
            coordsData = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.lowest,
            });
        }


        if (coordsData?.coords) {
            const { latitude, longitude } = coordsData.coords;
            setLatitude(latitude);
            setLongitude(longitude);

            try {
                const address = await Location.reverseGeocodeAsync({ latitude, longitude });
                if (address.length > 0) {
                    setLocationInfo(address[0]);
                    setCityAddress(address[0].city);
                }
            } catch (err) {
                setErrorMsg("Error al obtener la dirección");
            }
        }

        setLoading(false);
        return true;
    };

    useEffect(() => {
        askForPermission();
    }, []);

    return {
        latitude,
        longitude,
        errorMsg,
        locationInfo,
        cityAddress,
        loading,
        retry: askForPermission,
    };
};

export default useLocation;
