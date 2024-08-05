import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "@/app/api/apiSlice";
const {
    EXPO_PUBLIC_DATABASE_ID: DATABASE_ID,
    EXPO_PUBLIC_BRAND_COLLECTION_ID: BRAND_COLLECTION_ID
} = process.env;
const brandsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.$createdAt - a.$createdAt
});

const initialState = brandsAdapter.getInitialState();

export const brandsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBrands: builder.query({
            query: () => ({
                url: `/databases/${DATABASE_ID}/collections/${BRAND_COLLECTION_ID}/documents`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Brand", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Brand", id }))
                    ];
                } else return [{ type: "Brand", id: "LIST" }];
            }
        }),
        getBrand: builder.query({
            query: brandId => ({
                url: `/databases/${DATABASE_ID}/collections/${BRAND_COLLECTION_ID}/documents/${brandId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Brand", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Brand", id }))
                    ];
                } else return [{ type: "Brand", id: "LIST" }];
            }
        }),
        getUserBrand: builder.query({
            query: userId => ({
                url: `/databases/${DATABASE_ID}/collections/${BRAND_COLLECTION_ID}/documents`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Brand", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Brand", id }))
                    ];
                } else return [{ type: "Brand", id: "LIST" }];
            }
        }),

        updateBrand: builder.mutation({
            query: ({ brandId, value }) => ({
                url: `/databases/${DATABASE_ID}/collections/${BRAND_COLLECTION_ID}/documents/${brandId}`,
                method: "PATCH",
                body: value
                // responseHandler: "text"
            })
        }),
        addNewBrand: builder.mutation({
            query: value => ({
                url: `/databases/${DATABASE_ID}/collections/${BRAND_COLLECTION_ID}/documents`,
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Brand", id: arg.id }
            ]
        }),
        deleteBrand: builder.mutation({
            query: brandId => ({
                url: `/databases/${DATABASE_ID}/collections/${BRAND_COLLECTION_ID}/documents/${brandId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Brand", id: arg.id }
            ]
        })
    })
});

export const {
    useGetBrandsQuery,
    useGetBrandQuery,
    useGetUserBrandQuery,
    useAddNewBrandMutation,
    useUpdateBrandMutation,
    useDeleteBrandMutation
} = brandsApiSlice;

// returns the query result object
export const selectBrandsResult = brandsApiSlice.endpoints.getBrands.select();

// creates memoized selector
const selectBrandsData = createSelector(
    selectBrandsResult,
    brandsResult => brandsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllBrands,
    selectById: selectBrandById,
    selectIds: selectBrandIds
    // Pass in a selector that returns the brands slice of state
} = brandsAdapter.getSelectors(
    state => selectBrandsData(state) ?? initialState
);
