import { api } from "../api/apiSclice";
const reviewApi = api.injectEndpoints({
    endpoints:(builder)=>({
        postComments:builder.mutation({
            query:({id,data})=>({
                url:(`/review/comment/${id}`),
                method:"POST",
                body:data,
            }),
            invalidatesTags: ['comments'],
            
        }),
        getCommments:builder.query({
            query:(id)=>({
                url:(`/review/comment/${id}`),
            }),
            providesTags:['comments']
        }),
    }),
});


export const { usePostCommentsMutation, useGetCommmentsQuery } = reviewApi;