import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recommendsApi = createApi({
  reducerPath: "recommendsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hn.algolia.com/api/v1/search",
  }),
  endpoints: (builder) => ({
    getRecommend: builder.query({
      query: (keyword) => `?query=${keyword}`,
    }),
  }),
});

export const { useGetRecommendQuery } = recommendsApi;
