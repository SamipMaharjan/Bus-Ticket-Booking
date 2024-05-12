import { useForm } from "react-hook-form";
import Breadcrumb from "../../components/Breadcrumb";
import { useCreateCourseMutation } from "../../app/courses/courseApiSlice";
import uploadImage from "../../helpers/uploadImage";
import Loader from "../../common/Loader";
import toast, { Toaster } from "react-hot-toast";
import { baseUrl } from "@/app/api/apiSlice";
import CookieHelper from "@/helpers/CookieHelper";
import { GlobalContext } from "@/Context/GlobalContext";
import { useContext } from "react";

// import { useCreateCourseMutation } from "@/app/courses/courseApiSlice";
interface Bus {
  upcommingTripId: string;
  companyId: string;
  name: string;
  number: string;
}
const CreateBus = () => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Bus>();

  const { profileData } = useContext(GlobalContext);

  const [postCourse, { isLoading: isCourseSubmit }] = useCreateCourseMutation();

  function courseSubmit(data: any) {
    data = {
      ...data,
      price: parseInt(data.price),
      companyId: profileData?._id,
    };
    console.log("JSON.stringify(data)", JSON.stringify(data));
    fetch(`${baseUrl}/bus`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${CookieHelper.getCookie("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success)
          toast.success(data.message || "Successsfully created Bus");
      })
      .catch((err) => toast.error("Something went wrong"));
    // console.log("data", data);
  }

  return (
    <>
      <Breadcrumb pageName="Create Upcomming-Trips" />
      <form
        className="grid grid-cols-1 gap-9"
        onSubmit={handleSubmit(courseSubmit)}
      >
        <div className="flex flex-col">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm flex flex-col gap-3 p-6.5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Upcoming trip ID:
                </label>
                <input
                  type="text"
                  placeholder="title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("upcommingTripId", {
                    required: "upcommingTripId requried",
                  })}
                />
                <span className="text-[#ff0000]  text-xs">
                  {errors?.upcommingTripId?.message}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Bus Name:
                </label>
                <input
                  type="text"
                  placeholder="title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("name", {
                    required: "name requried",
                  })}
                />
                <span className="text-[#ff0000]  text-xs">
                  {errors?.name?.message}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Bus number:
                </label>
                <input
                  type="text"
                  placeholder="title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("number", {
                    required: "number requried",
                  })}
                />
                <span className="text-[#ff0000]  text-xs">
                  {errors?.number?.message}
                </span>
              </div>
            </div>
            {/* <div className="flex flex-col gap-5.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Departure Time:
                </label>
                <input
                  type="text"
                  placeholder="title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("departureTime", {
                    required: "departureTime requried",
                  })}
                />
                <span className="text-[#ff0000]  text-xs">
                  {errors?.departureTime?.message}
                </span>
              </div>
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Price
              </label>
              <input
                type="text"
                // placeholder="Initial price"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                {...register("price", {
                  pattern: {
                    message: "Please enter number only",
                    value: /^[0-9]+$/,
                  },
                })}
              />
              <span className="text-[#ff0000] text-xs">
                {errors?.price?.message}
              </span>
            </div> */}
          </div>
        </div>

        <button className="py-3 font-semibold text-lg bg-primary text-white">
          {isCourseSubmit ? (
            <div className="flex h-full items-center justify-center bg-primary">
              <div className="h-7 w-7 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
};

export default CreateBus;
