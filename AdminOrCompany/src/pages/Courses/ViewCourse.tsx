import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
  useGetOwnTripsQuery,
} from "../../app/courses/courseApiSlice";
import Breadcrumb from "../../components/Breadcrumb";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

import { useContext } from "react";
import { GlobalContext } from "@/Context/GlobalContext";

export default function ViewCourse() {
  const navigate = useNavigate();
  const { profileData } = useContext(GlobalContext);
  const { data: upcommingTrips } = useGetOwnTripsQuery({ id: profileData._id });

  console.log("upcommingTrips", upcommingTrips);
  const [deleteCourse, { isLoading: isCourseDelete }] =
    useDeleteCourseMutation();

  const handleDelete = (tripID: string | undefined) => {
    // fetch(`${baseUrl}/upcommingTrip`, {
    //   method: "POST",
    //   body: JSON.stringify({ id: tripID }),
    //   headers: {
    //     Authorization: `Bearer ${CookieHelper.getCookie("token")}`,
    //     "Content-Type": "application/json",
    //   },
    // })
    deleteCourse({ tripID: tripID || "ifNoId" })
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

  return (
    <>
      <Breadcrumb pageName="View Upcomming Trips" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                ID
              </h5>
            </div>{" "}
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Pick Up Point
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Destination
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Price
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Date
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>
          {upcommingTrips?.map((trip) => (
            <div
              key={trip._id}
              className="grid grid-cols-6 border-b border-stroke dark:border-strokedark sm:grid-cols-6"
            >
              <div className="flex items-center justify-start   p-2.5 xl:p-5">
                <p className="text-black dark:text-white truncate">
                  {trip._id}
                </p>
              </div>{" "}
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{trip.pickUpPoint}</p>
              </div>{" "}
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {trip.destination}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">Rs. {trip?.price}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  {trip.departureTime}
                </p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 gap-2">
                <button
                  // to={`/course-edit/${trip._id}`}
                  onClick={() =>
                    navigate(`/course-edit/${trip._id}`, { state: trip })
                  }
                  className="h-10 w-10  bg-meta-5 text-white flex justify-center items-center"
                >
                  <FaPen />
                </button>
                {/* <Link
                  to={`/course-content/${trip._id}`}
                  className="h-10 w-10 text-2xl  bg-meta-5 text-white flex justify-center items-center"
                >
                  <PiBooksFill />
                </Link> */}
                <button
                  onClick={() => handleDelete(trip._id)}
                  className="h-10 w-10 bg-red-600 text-white flex justify-center items-center text-lg"
                  value={trip._id}
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
