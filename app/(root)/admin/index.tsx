import UsersTable from "@/components/UsersTable";
import ReviewsTable from "@/components/ReviewsTable";
import ProductsTable from "@/components/ProductsTable";
import OrdersTable from "@/components/OrdersTable";
import AdminCard from "@/components/AdminCard";
import SelectDropdown from "react-native-select-dropdown";
import Search from "@/components/Search";
import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetCurrentQuery } from "@/redux/auth/authApiSlice";
import { useGetProductsQuery } from "@/redux/product/productApiSlice";
import { useGetReviewsQuery } from "@/redux/review/reviewApiSlice";
import { useGetOrdersQuery } from "@/redux/order/orderApiSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
const Index = () => {
    const { data: user } = useGetCurrentQuery();
    const {
        data: products,
        refetch: pRefetch,
        isFetching: pFetching
    } = useGetProductsQuery();
    const {
        data: orders,
        refetch: oRefetch,
        isFetching: oFetching
    } = useGetOrdersQuery();
    const {
        data: reviews,
        refetch: rRefetch,
        isFetching: rFetching
    } = useGetReviewsQuery();
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState("order");
    const [days, setDays] = useState("3 days");
    const options = [
        "3 days",
        "7 days",
        "1 month",
        "3 months",
        "6 months",
        "1 year"
    ];

    const filterDays = () => {};
    return (
        <View className="bg-white flex-1">
            <SafeAreaView className="">
                <View className="px-2">
                    <Text className="font-semibold capitalize text-dark-2">
                        Welcome
                    </Text>
                    <Text className="text-xl font-semibold capitalize">
                        {user?.name}
                    </Text>
                </View>
                <View className="px-2 py-2 bg-white shadow shadow-md shadow-black/40 rounded-md my-2 mx-2 w-48 ">
                    <View>
                        <SelectDropdown
                            dropdownStyle={{
                                backgroundColor: "#185132",
                                borderRadius: 5
                            }}
                            statusBarTranslucent
                            data={options}
                            onSelect={setDays}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View className="w-full">
                                        <Text className="font-semibold ">
                                            {selected}s from {days} ago
                                        </Text>
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View
                                        style={{
                                            backgroundColor: isSelected
                                                ? "#052f1841"
                                                : ""
                                        }}
                                    >
                                        <Text className="py-4 px-2 text-white bg-transparent capitalize">
                                            {item}
                                        </Text>
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View className="flex flex-row flex-wrap px-2">
                    <View className="w-1/2 h-24  bg-white p-1 ">
                        <AdminCard
                            color="#1eec2735"
                            total={orders?.total + 140}
                            current={
                                orders?.documents[orders?.total - 1]
                                    ?.totalAmount
                            }
                            previous={
                                orders?.documents[orders?.total - 2]
                                    ?.totalAmount || 1
                            }
                            setSelected={setSelected}
                            selected={selected}
                            setSelected={setSelected}
                            selected={selected}
                            name="order"
                            icon="sack-dollar"
                        />
                    </View>
                    <View className="w-1/2 h-24  bg-white p-1">
                        <AdminCard
                            color="#ecd61e35"
                            total={products?.total + 112}
                            current={
                                products?.documents[products?.total - 1]?.price
                            }
                            previous={
                                products?.documents[products?.total - 2]?.price
                            }
                            setSelected={setSelected}
                            selected={selected}
                            name="product"
                            icon="shop"
                        />
                    </View>
                    <View className="w-1/2 h-24  bg-white p-1">
                        <AdminCard
                            color="#1e34ec35"
                            total={reviews?.total + 57}
                            current={
                                reviews?.documents[reviews?.total - 1]?.rate
                            }
                            previous={
                                reviews?.documents[reviews?.total - 2]?.rate
                            }
                            setSelected={setSelected}
                            selected={selected}
                            name="review"
                            icon="star-half-alt"
                        />
                    </View>
                    <View className="w-1/2 h-24  bg-white p-1">
                        <AdminCard
                            color="#ec1e4035"
                            total={234}
                            current={24}
                            setSelected={setSelected}
                            selected={selected}
                            previous={33}
                            name="user"
                            icon="people-group"
                        />
                    </View>
                </View>
            </SafeAreaView>

            <View className="px-2 flex-1">
                {selected === "order" && (
                    <OrdersTable
                        days={days}
                        data={orders}
                        isFetching={oFetching}
                        refetch={oRefetch}
                        days={days}
                    />
                )}
                {selected === "product" && (
                    <ProductsTable
                        days={days}
                        data={products}
                        isFetching={pFetching}
                        refetch={pRefetch}
                    />
                )}

                {selected === "user" && (
                    <UsersTable
                        days={days}
                        data={products}
                        isFetching={pFetching}
                        refetch={pFetching}
                    />
                )}

                {selected === "review" && (
                    <ReviewsTable
                        days={days}
                        data={reviews}
                        isFetching={rFetching}
                        refetch={rRefetch}
                        days={days}
                    />
                )}
            </View>
        </View>
    );
};

export default Index;
