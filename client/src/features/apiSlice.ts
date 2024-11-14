import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Posts {
  id: number;
  image: string;
  title: string;
  content: string;
  categories: string;
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/posts" }),
  endpoints: (builder) => ({
    getPosts: builder.query<Posts[], void>({
      query: () => "/get-all-posts",
    }),

    getSinglePost: builder.query<Posts, number>({
      query: (id) => `/get-single-post/${id}`,
    }),

    createNewPost: builder.mutation<Posts, Partial<Posts>>({
      query: (newPost) => ({
        url: "/create-post",
        method: "POST",
        body: newPost,
      }),
    }),

    updatePost: builder.mutation<
      Posts,
      { id: string; product: Partial<Posts> }
    >({
      query: ({ id, product }) => ({
        url: `/update-product/${id}`,
        method: "PUT",
        body: product,
      }),
    }),

    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete-post/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreateNewPostMutation,
  useGetSinglePostQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = apiSlice;
export default apiSlice;
