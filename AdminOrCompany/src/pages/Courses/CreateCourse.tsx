import { useForm } from "react-hook-form";
import Breadcrumb from "../../components/Breadcrumb";
import { useCreateCourseMutation } from "../../app/courses/courseApiSlice";
import uploadImage from "../../helpers/uploadImage";
import Loader from "../../common/Loader";
import toast, { Toaster } from "react-hot-toast";
import { baseUrl } from "@/app/api/apiSlice";
import CookieHelper from "@/helpers/CookieHelper";

// import { useCreateCourseMutation } from "@/app/courses/courseApiSlice";

const CreateCourse = () => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>();

  const [postCourse, { isLoading: isCourseSubmit }] = useCreateCourseMutation();

  function courseSubmit(data: any) {
    // postCourse(data)
    //   .unwrap()
    //   .then((res) => {
    //     console.log("res", res);
    //     toast.success("Course Submitted Successfully.", {
    //       position: "top-right",
    //     });
    //   })
    //   .catch((err) => toast.error(`Error: ${err.data.error}`));
    data = { ...data, price: parseInt(data.price) };
    console.log("JSON.stringify(data)", JSON.stringify(data));
    fetch(`${baseUrl}/upcommingTrip`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${CookieHelper.getCookie("token")}`,
        "Content-Type": "application/json",
      },
    });
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
            {/* <div className="flex flex-col gap-5.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Company ID:
                </label>
                <input
                  type="text"
                  placeholder="title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("companyId", { required: "companyId requried" })}
                />
                <span className="text-[#ff0000]  text-xs">
                  {errors?.companyId?.message}
                </span>
              </div>
            </div> */}
            {/* <div className="flex flex-col gap-5.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Driver ID:
                </label>
                <input
                  type="text"
                  placeholder="title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("driverId", { required: "driverId requried" })}
                />
                <span className="text-[#ff0000]  text-xs">
                  {errors?.driverId?.message}
                </span>
              </div>
            </div> */}
            <div className="flex flex-col gap-5.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Pick Up Point:
                </label>
                <input
                  type="text"
                  placeholder="title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("pickUpPoint", {
                    required: "pickUpPoint requried",
                  })}
                />
                <span className="text-[#ff0000]  text-xs">
                  {errors?.pickUpPoint?.message}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Destination:
                </label>
                <input
                  type="text"
                  placeholder="title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("destination", {
                    required: "destination requried",
                  })}
                />
                <span className="text-[#ff0000]  text-xs">
                  {errors?.destination?.message}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5.5">
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
            </div>
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

export default CreateCourse;
