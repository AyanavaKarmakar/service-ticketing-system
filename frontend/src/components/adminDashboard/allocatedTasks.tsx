import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AllocatedTasks = () => {
  const navigate = useNavigate();

  const getTasks = useQuery({
    queryKey: ["getAllocatedTasks"],

    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/allocated`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Allocated tasks fetched successfully!");
      } else {
        toast.error("Allocated tasks fetch failed!");
      }

      const data = await response.json();
      return data.allocatedTasks;
    },

    enabled: true,

    onError: () => {
      toast.error("Interval server error. Please try again!");
    },
  });

  console.log(getTasks.data);

  return (
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
  );
};
