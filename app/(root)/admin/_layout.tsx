import { Slot, router } from "expo-router";
import * as Progress from "react-native-progress";
import { View } from "react-native";
import { useEffect } from "react";
import Toast from "react-native-simple-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, selectCurrentLoading } from "@/redux/loading/loadingSlice";
import { useGetCurrentQuery } from "@/redux/auth/authApiSlice";
import {
    selectCurrentSession,
    selectCurrentAdmin
} from "@/redux/auth/authSlice";
export default function AdminLayout() {
    const loading = useSelector(selectCurrentLoading);
    const admin = useSelector(selectCurrentAdmin);
    const session = useSelector(selectCurrentSession);
    const { data: user } = useGetCurrentQuery();
    const userIsAdmin = user?.labels.includes("admin");
    useEffect(() => {
        if (session && admin && userIsAdmin) {
            Toast.show("welcome admin");
        }
        return () => false;
    }, [session]);

    return (
        <>
            {loading && (
                <View className=" w-full items-center absolute z-50 top-0 py-10 h-full flex-1 bg-black/30">
                    <Progress.Circle
                        size={30}
                        indeterminate={true}
                        borderWidth={2}
                        showsText={true}
                        useNativeDriver={true}
                        color="#4ee17b"
                    />
                </View>
            )}
            <Slot />
        </>
    );
}
//
