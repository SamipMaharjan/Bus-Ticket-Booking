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
        url: `/upcommingTrip/${data.id}`,
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
    getAllBus: builder.query<any, null>({
      query: () => ({
        url: `/bus`,
        method: "GET",
      }),
      providesTags: ["bus"],
    }),
    deleteBus: builder.mutation<any, { busId: string }>({
      query: (data) => ({
        url: `/bus`,
        body: { id: data.busId },
        method: "DELETE",
      }),
      invalidatesTags: ["bus"],
    }),
    updateUpcommingTrips: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `/upcommingTrip/${data._id}`,
        body: { ...data },
        method: "PUT",
      }),
      invalidatesTags: ["Courses"],
    }),
    getAllUsers: builder.query<any, null>({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    deleteUsers: builder.mutation<any, { busId: string }>({
      query: (data) => ({
        url: `/users`,
        body: { id: data.busId },
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    getOwnTrips: builder.query<any[], { id: string }>({
      query: (data) => ({
        url: "/company/upcommingTrips/" + data.id,
        method: "GET",
      }),
      providesTags: ["Courses"],
    }),
  }),
});
export const {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useUpdateUpcommingTripsMutation,
  useGetAllBusQuery,
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useUpdateCourseContentMutation,
  useGetEveryUpTripQuery,
  useDeleteBusMutation,
  useDeleteCompanyMutation,
  useGetAllCompanyQuery,
  useGetAllUsersQuery,
  useDeleteUsersMutation,
  useGetOwnTripsQuery,
} = courseApiSlice;
