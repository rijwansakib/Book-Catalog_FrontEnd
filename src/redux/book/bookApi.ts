import { api } from "../api/apiSclice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: '/books',
       providesTags: ["book"],
      }),
    }),
    getDetailsBooks: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
       providesTags: ["book"],
      }),
    }),
    postBook: builder.mutation({
      query: (data) => ({
        url: "/books/create-books",
        method: "POST",
        body: data,
       invalidatesTags: ["book"],
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
        invalidatesTags: ["book"],
      }),
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
       invalidatesTags: ["book"],
      }),
    }),


  }),
});

export const {
  useGetBooksQuery,
  useGetDetailsBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  usePostBookMutation
} = bookApi;
