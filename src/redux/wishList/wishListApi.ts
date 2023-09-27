import { api } from "../api/apiSclice";

const wishlistApi = api.injectEndpoints({
    endpoints: (builder) => ({
      
      addToWishlist: builder.mutation({
        query: (data) => ({
          url: "/wishlist/create-wishlist",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Wishlist"],
      }),
      getWishlists: builder.query({
        query: () => `/wishlist`,
        providesTags: ["Wishlist"],
      }),
      removeFromWishlists: builder.mutation({
        query: (id) => ({
          url: `/wishlist/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Wishlist"],
      }),
    }),
  });
  
  export const {
    useAddToWishlistMutation,
    useGetWishlistsQuery,
    useRemoveFromWishlistsMutation,
  } = wishlistApi;