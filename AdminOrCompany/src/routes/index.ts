import CreateBus from "@/pages/Bus/CreateBus";
import ViewBus from "@/pages/Bus/ViewBus";
import CreateCompany from "@/pages/Company/CreateCompany";
import ViewCompany from "@/pages/Company/ViewCompany";
import Profile from "@/pages/profile/Profile";
import { lazy } from "react";
const CreateCourse = lazy(() => import("../pages/Courses/CreateCourse"));
const CourseMedia = lazy(() => import("../pages/Courses/CourseMedia"));
const CourseCurriculum = lazy(() => import("../pages/Courses/ViewCourse"));
const EditCourse = lazy(() => import("../pages/Courses/EditCourse"));
const EditCourseContent = lazy(
  () => import("../pages/Courses/Contents/EditCourseContent")
);
const Teachers = lazy(() => import("@/pages/Teachers"));
const Students = lazy(() => import("@/pages/Students"));

const coreRoutes = [
  {
    path: "/create-course",
    title: "CreateCourse",
    component: CreateCourse,
  },
  {
    path: "/course-media",
    title: "CourseMedia",
    component: CourseMedia,
  },
  {
    path: "/course-view",
    title: "CourseCurriculum",
    component: CourseCurriculum,
  },
  {
    path: "/course-edit/:courseId",
    title: "EditCourse",
    component: EditCourse,
  },
  {
    path: "/course-content/:courseId",
    title: "EditCourseContent",
    component: EditCourseContent,
  },
  {
    path: "/profile",
    title: "Profile",
    component: Profile,
  },
  {
    path: "/bus/create",
    title: "Create Bus",
    component: CreateBus,
  },
  {
    path: "/bus/view",
    title: "View Bus",
    component: ViewBus,
  },
];

const superAdminRoutes = [
  {
    path: "/superadmin/teachers",
    title: "CreateCourse",
    component: Teachers,
  },
  {
    path: "/superadmin/students",
    title: "CourseMedia",
    component: Students,
  },
  {
    path: "/superadmin/course-view",
    title: "CourseCurriculum",
    component: CourseCurriculum,
  },
  {
    path: "/superadmin/course-edit/:courseId",
    title: "EditCourse",
    component: EditCourse,
  },
  {
    path: "/superadmin/course-content/:courseId",
    title: "EditCourseContent",
    component: EditCourseContent,
  },
  {
    path: "/superadmin/company/create-company",
    title: "EditCourseContent",
    component: CreateCompany,
  },
  {
    path: "/superadmin/company/view-company",
    title: "EditCourseContent",
    component: ViewCompany,
  },
];

const routes = [...coreRoutes];
export { routes, superAdminRoutes };
