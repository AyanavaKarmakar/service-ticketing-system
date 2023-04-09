import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

export const RequestFormDetails = () => {
  const navigate = useNavigate();
  const { requestFormId } = useLocation().state;

  const getFormDetails = useQuery({
    queryKey: ["requestForm"],

    enabled: true,

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
        toast.success("Requested form fetched successfully!");
      } else {
        toast.error("Requested form fetch failed!");
      }

      const data = await response.json();
      return data.requestForm;
    },

    onError: () => {
      toast.error("Interval server error. Please try again!");
    },
  });

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] items-center justify-center">
      <div className="text-xl lg:text-3xl underline font-bold text-gray-900 p-5">
        Request Form Details
      </div>

      <div className="flex p-5 lg:p-3 flex-col text-lg lg:text-xl text-left gap-y-1">
        <div>
          <span className="text-xl lg:text-2xl font-semibold">
            {"Product Type: "}
          </span>
          {getFormDetails.data?.productType}
        </div>

        <>
          <span className="text-xl lg:text-2xl font-semibold">
            {"Issue Type: "}
          </span>
          {getFormDetails.data?.issueType.join(", ")}
        </>

        <>
          <span className="text-xl lg:text-2xl font-semibold">
            {"Issue Description: "}
          </span>
          {getFormDetails.data?.issueDescription ?? "Description not provided"}
        </>

        <>
          <span className="text-xl lg:text-2xl font-semibold">
            {"Policy Upload: "}
          </span>
          {getFormDetails.data?.policyUpload}
        </>

        <>
          <span className="font-semibold text-xl lg:text-2xl">
            {"State of Submission: "}
          </span>
          {new Date(getFormDetails.data?.dateOfSubmission).toLocaleDateString()}
        </>

        <>
          <span className="text-xl lg:text-2xl font-semibold">
            {"Status: "}
          </span>
          {getFormDetails.data?.status}
        </>
      </div>

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
