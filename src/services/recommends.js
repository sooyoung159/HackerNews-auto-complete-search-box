import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// base URL과 엔드포인트들로 서비스 정의
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

// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const { useGetRecommendQuery } = recommendsApi;
