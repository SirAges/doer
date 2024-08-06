import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentSession } from "@/redux/auth/authSlice";
import { persistor } from "./store";
const Index = () => {
    const session = useSelector(selectCurrentSession);

    return (
        <View className="flex-1 items-center justify-center bg-black">
            <Image
                className="object-center h-full w-full opacity-40"
                style={{ resizeMode: "cover" }}
                source={require("@/assets/images/ts15.jpg")}
            />

            <View className="absolute w-full items-center justify-center">
                <Text
                    onPress={async () => await persistor.purge()}
                    className="text-white font-bold  text-3xl"
                >
                    JEE Fashion
                </Text>

                <Link
                    replace
                    href={session ? "tab" : "sign-in"}
                    className="w-1/2 text-center bg-green-700  px-3 py-5 text-white font-bold rounded-sm"
                >
                    Shop Now
                </Link>

                <Text className="text-white font-medium  text-md pt-5">
                    Your best fashion store
                </Text>
            </View>
        </View>
    );
};

export default Index;
