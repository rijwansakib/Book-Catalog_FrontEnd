import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// create api
export const api = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({baseUrl: "https://book-catalog-8j43.onrender.com/api/v1"}),
    tagTypes:['comments','book','Wishlist'],
    endpoints:()=>({}),
})