import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

export const RequestFormDetails = () => {
  const navigate = useNavigate();
  const { requestFormId } = useLocation().state;

  const getFormDetails = useQuery({
    queryKey: ["requestForm"],

    enabled: requestFormId !== undefined,

    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/customer/requestform/${requestFormId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Request forms fetched successfully!");
      } else {
        toast.error("Request forms fetch failed!");
      }

      const data = await response.json();
      return data.requestForm;
    },

    onError: () => {
      toast.error("Interval server error. Please try again!");
    },
  });

  console.log(getFormDetails.data);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl underline font-bold text-gray-900 p-5">
        Request Form Details
      </h1>

      <button
        type="button"
        onClick={() => navigate("/dashboard/customer")}
        className={clsx(
          "py-2.5 px-5 m-3 bg-gray-900 text-xl text-white font-semibold rounded-md",
          "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75"
        )}
      >
        Go Back
      </button>
    </div>
  );
};
