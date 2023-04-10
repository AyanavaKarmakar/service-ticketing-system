import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export const TaskDetails = () => {
  const navigate = useNavigate();
  const { requestFormId } = useLocation().state;

  const getTaskDetails = useQuery({
    queryKey: ["requestForm"],

    enabled: true,

    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${requestFormId}/details`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Requested task fetched successfully!");
      } else {
        toast.error("Requested task fetch failed!");
      }

      const data = await response.json();
      return data.task;
    },

    onError: () => {
      toast.error("Interval server error. Please try again!");
    },
  });

  console.log(getTaskDetails.data);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="mt-3 text-4xl text-black font-bold p-5">
        Task Form Details
      </div>

      <button
        type="button"
        onClick={() => navigate("/dashboard/admin")}
        className={clsx(
          "py-2.5 px-5 mb-5 bg-gray-900 text-xl text-white font-semibold rounded-md",
          "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75"
        )}
      >
        Go Back
      </button>
    </div>
  );
};
