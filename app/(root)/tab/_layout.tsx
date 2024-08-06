import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { Tabs, router } from "expo-router";
import * as Progress from "react-native-progress";
import { useDispatch, useSelector } from "react-redux";

import {
    setLoading,
    selectCurrentLoading,
    
} from "@/redux/loading/loadingSlice";
import { selectCurrentSession ,selectCurrentAdmin,
    setAdmin} from "@/redux/auth/authSlice";
export default function TabLayout() {
    const admin = useSelector(selectCurrentAdmin);
    const session = useSelector(selectCurrentSession);
    const dispatch = useDispatch();
    const loading = useSelector(selectCurrentLoading);

    useEffect(() => {
        if (session) {
            if (admin) {
                router.replace("admin");
            } else {
                router.replace("tab");
            }
        } else {
            router.push("/sign-in");
        }
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
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#4ee17b"
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                size={20}
                                name={focused ? "home" : "home-outline"}
                                color={color}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="brands"
                    options={{
                        title: "Brands",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                size={20}
                                name={
                                    focused
                                        ? "shield-checkmark"
                                        : "shield-checkmark-outline"
                                }
                                color={color}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="order"
                    options={{
                        title: "Orders",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                size={20}
                                name={focused ? "cash" : "cash-outline"}
                                color={color}
                            />
                        )
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                size={20}
                                name={focused ? "person" : "person-outline"}
                                color={color}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="saved"
                    options={{
                        href: null,
                        title: "Saved"
                    }}
                />
                <Tabs.Screen
                    name="[productId]"
                    options={{
                        href: null,
                        title: "productId"
                    }}
                />
                <Tabs.Screen
                    name="shop"
                    options={{
                        href: null,
                        title: "Shop"
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        href: null,
                        title: "Search"
                    }}
                />
            </Tabs>
        </>
    );
}
