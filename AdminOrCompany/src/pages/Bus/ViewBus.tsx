import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteBusMutation,
  useDeleteCourseMutation,
  useGetAllBusQuery,
  useGetAllCoursesQuery,
} from "../../app/courses/courseApiSlice";
import Breadcrumb from "../../components/Breadcrumb";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { PiBooksFill } from "react-icons/pi";
import { baseUrl } from "@/app/api/apiSlice";
import CookieHelper from "@/helpers/CookieHelper";
import { useState } from "react";

export default function ViewBus() {
  const navigate = useNavigate();
  const { data: busData } = useGetAllBusQuery(null);
  // const [busRes, setBusRes] = useState<any>s();

  const [deleteBus, { isLoading: isCourseDelete }] = useDeleteBusMutation();

  const handleDelete = (busId: string | undefined) => {
    deleteBus({ busId: busId || "ifNoId" })
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.success) {
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
  console.log(busData);
  return (
    <>
      <Breadcrumb pageName="View Course" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Upcomming Trip ID
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Number
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>
          {busData?.map((bus: any) => (
            <div
              key={bus._id}
              className="grid grid-cols-4 border-b border-stroke dark:border-strokedark sm:grid-cols-4"
            >
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {bus.upcommingTripId}
                </p>
              </div>{" "}
              <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {bus.name}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3"> {bus?.number}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 gap-2">
                <button
                  onClick={() =>
                    navigate(`/bus/edit/${bus._id}`, { state: bus })
                  }
                  // to={`/bus/edit/${bus._id}`}
                  className="h-10 w-10  bg-meta-5 text-white flex justify-center items-center"
                >
                  <FaPen />
                </button>
                {/* <Link
                  to={`/course-content/${bus._id}`}
                  className="h-10 w-10 text-2xl  bg-meta-5 text-white flex justify-center items-center"
                >
                  <PiBooksFill />
                </Link> */}
                <button
                  onClick={() => handleDelete(bus._id)}
                  className="h-10 w-10 bg-red-600 text-white flex justify-center items-center text-lg"
                  value={bus._id}
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
