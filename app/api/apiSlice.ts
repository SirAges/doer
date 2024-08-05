import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Action } from "@reduxjs/toolkit";
import { setCredentials } from "@/redux/auth/authSlice";
import { REHYDRATE } from "redux-persist";

type RootState = any; // normally inferred from state

function isHydrateAction(action: Action): action is Action<typeof REHYDRATE> & {
    key: string;
    payload: RootState;
    err: unknown;
} {
    return action.type === REHYDRATE;
}
const {
    EXPO_PUBLIC_ENDPOINT: ENDPOINT,
    EXPO_PUBLIC_PROJECT_ID: PROJECT_ID,
    EXPO_PUBLIC_API_KEY: API_KEY
} = process.env;
const baseQuery = fetchBaseQuery({
    baseUrl: ENDPOINT,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const session = getState().auth.session;

        headers.set("Content-Type", "application/json");
        headers.set("X-Appwrite-Project", PROJECT_ID);
        //  headers.set("X-Appwrite-Key", API_KEY);

        return headers;
    }
});

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     // console.log(args) // request url, method, body
//     // console.log(api) // signal, dispatch, getState()
//     // console.log(extraOptions) //custom like {shout: true}

//     // Check if extraOptions is an object
//     if (typeof extraOptions === "object" && extraOptions !== null) {
//         // Check if extraOptions has the property you're trying to access
//         if (extraOptions.shout) {
//             console.log("shout is true");
//         }
//     }

//     let result = await baseQuery(args, api, extraOptions);

//     // If you want, handle other status codes, too
//     if (result?.error?.status === 403) {
//         console.log("sending refresh session");

//         // send refresh session to get new access session
//         const refreshResult = await baseQuery(
//             "/auth/refresh",
//             api,
//             extraOptions
//         );

//         if (refreshResult?.data) {
//             // store the new session

//             api.dispatch(setCredentials({ ...refreshResult.data }));

//             // retry original query with new access session
//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             if (refreshResult?.error?.status === 403) {
//                 refreshResult.error.data.message = "Your login has expired.";
//             }
//             return refreshResult;
//         }
//     }

//     return result;
// };

export const apiSlice = createApi({
    baseQuery: baseQuery,
    extractRehydrationInfo(action, { reducerPath }): any {
        if (isHydrateAction(action)) {
            // when persisting the api reducer
            if (action.key === "doerkey") {
                return action.payload;
            }

            // When persisting the root reducer
            return action?.payload? action.payload[apiSlice.reducerPath]:null
        }
    },
    tagTypes: ["Auth", "Order", "Product", "Review", "Order", "Hero", "User"],
    endpoints: builder => ({})
});
