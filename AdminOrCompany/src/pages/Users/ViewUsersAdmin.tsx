import { Link } from "react-router-dom";
import {
  useDeleteCompanyMutation,
  useDeleteCourseMutation,
  useDeleteUsersMutation,
  useGetAllCompanyQuery,
  useGetAllCoursesQuery,
  useGetAllUsersQuery,
  useGetEveryUpTripQuery,
} from "../../app/courses/courseApiSlice";
import Breadcrumb from "../../components/Breadcrumb";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { PiBooksFill } from "react-icons/pi";
import { baseUrl } from "@/app/api/apiSlice";
import CookieHelper from "@/helpers/CookieHelper";
import { useEffect, useState } from "react";

export default function ViewUsersAdmin() {
  //   const { data: upcommingTrips } = useGetEveryUpTripQuery(null);
  //   const [company, setCompany] = useState<any>();

  const [deleteUser, { isLoading: isCourseDelete }] = useDeleteUsersMutation();

  const { data: company, isLoading: isCompanyL } = useGetAllUsersQuery(null);
  console.log("upcommingTrips", company);
  //   useEffect(() => {
  //     fetch(`${baseUrl}/company`)
  //       .then((res) => res.json())
  //       .then((data) => setCompany(data));
  //   }, []);

  const handleDelete = (companyId: string | undefined) => {
    // fetch(`${baseUrl}/company`, {
    //   method: "DELETE",
    //   body: JSON.stringify({ id: companyId }),
    //   headers: {
    //     Authorization: `Bearer ${CookieHelper.getCookie("token")}`,
    //     "Content-Type": "application/json",
    //   },
    // })
    deleteUser({ busId: companyId || "ifNoId" })
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.success) {
          toast.success("Succesfully deleted.", {
            position: "top-right",
          });
          return;
        }
        toast.error(`Error: ${res?.msg}`);
      })
      .catch((err) => {
        toast.error(`Error: ${err?.data?.msg}`);
      });
  };

  return (
    <>
      <Breadcrumb pageName="View Users" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-4  rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                ID
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            {/* <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Location
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Contact
              </h5>
            </div> */}
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                email
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>
          {company?.map((company: any) => (
            <div
              key={company._id}
              className="grid grid-cols-4 border-b border-stroke dark:border-strokedark sm:grid-cols-4"
            >
              <div className="flex items-center justify-center p-2.5 xl:p-5 overflow-hidden truncate">
                <p className="text-black dark:text-white ">{company._id}</p>
              </div>
              <div className="flex items-center  p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{company.username}</p>
              </div>{" "}
              {/* <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {company.location}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{company?.contact}</p>
              </div> */}
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{company.email}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 gap-2">
                {/* <Link
                  to={`/course-edit/${company._id}`}
                  className="h-10 w-10  bg-meta-5 text-white flex justify-center items-center"
                >
                  <FaPen />
                </Link> */}
                {/* <Link
                  to={`/course-content/${company._id}`}
                  className="h-10 w-10 text-2xl  bg-meta-5 text-white flex justify-center items-center"
                >
                  <PiBooksFill />
                </Link> */}
                <button
                  onClick={() => handleDelete(company._id)}
                  className="h-10 w-10 bg-red-600 text-white flex justify-center items-center text-lg"
                  value={company._id}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
