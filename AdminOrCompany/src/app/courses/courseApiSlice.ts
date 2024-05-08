import { apiSlice } from "../api/apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation<any, Course>({
      query: (courseData: Course) => ({
        url: "/course",
        body: { ...courseData },
        method: "POST",
      }),
      invalidatesTags: ["Courses"],
    }),
    updateCourse: builder.mutation<any, Course>({
      query: (data) => ({
        url: `/course/${data.id}`,
        body: { ...data },
        method: "PUT",
      }),
      invalidatesTags: ["Courses"],
    }),
    updateCourseContent: builder.mutation<
      any,
      { id: string; payload: ContentPayload }
    >({
      query: (data) => ({
        url: `/course/${data.id}`,
        body: data?.payload,
        method: "PUT",
      }),
      invalidatesTags: ["Courses"],
    }),
    getAllCourses: builder.query<any[], null>({
      query: () => ({
        url: "/upcommingTrip",
        method: "GET",
      }),
      providesTags: ["Courses"],
    }),
    // getEveryUpTrip: builder.query<any[], null>({
    //   query: () => ({
    //     url: "/company",
    //     method: "GET",
    //   }),
    //   providesTags: ["Upcomming"],
    // }),
    getCourseById: builder.query<{ foundCourse: Course }, { id: string }>({
      query: (data) => ({
        url: `/course/${data.id}`,
        method: "GET",
      }),
      providesTags: ["Courses"],
    }),
    deleteCourse: builder.mutation<any, { tripID: string }>({
      query: (data) => ({
        url: `/upcommingTrip`,
        body: { id: data.tripID },
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),
    deleteCompany: builder.mutation<any, { companyId: string }>({
      query: (data) => ({
        url: `/company`,
        body: { id: data.companyId },
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
    getAllCompany: builder.query<any, null>({
      query: () => ({
        url: `/company`,
        method: "GET",
      }),
      providesTags: ["company"],
    }),
  }),
});
export const {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useUpdateCourseContentMutation,
  useGetEveryUpTripQuery,
  useDeleteCompanyMutation,
  useGetAllCompanyQuery,
} = courseApiSlice;
