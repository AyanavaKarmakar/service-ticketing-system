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

      <div className="flex p-5 lg:p-3 flex-col text-lg lg:text-xl text-left gap-y-2">
        <>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Customer: "}
          </div>
          {getTaskDetails.data?.customer?.username}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Product Type: "}
          </div>
          {getTaskDetails.data?.productType}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Issue Type: "}
          </div>
          {getTaskDetails.data?.issueType.join(", ")}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Issue Description: "}
          </div>
          {getTaskDetails.data?.issueDescription ?? "Description not provided"}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Policy Upload: "}
          </div>

          {/** For docx/doc files */}
          {(getTaskDetails.data?.policyUpload.toLowerCase().endsWith(".docx") ||
            getTaskDetails.data?.policyUpload
              .toLowerCase()
              .endsWith(".doc")) && (
            <iframe
              src={`https://docs.google.com/gview?url=${
                import.meta.env.VITE_API_URL
              }/${getTaskDetails.data?.policyUpload}&embedded=true`}
              width="100%"
              height="100%"
            />
          )}

          {/** For pdf files */}
          {getTaskDetails.data?.policyUpload.toLowerCase().endsWith(".pdf") && (
            <embed
              src={`${import.meta.env.VITE_API_URL}/${
                getTaskDetails.data?.policyUpload
              }`}
              type="application/pdf"
              width="100%"
              height="100%"
            />
          )}

          {/** For image files */}
          {(getTaskDetails.data?.policyUpload.toLowerCase().endsWith(".png") ||
            getTaskDetails.data?.policyUpload
              .toLowerCase()
              .endsWith(".jpg")) && (
            <img
              src={`${import.meta.env.VITE_API_URL}/${
                getTaskDetails.data?.policyUpload
              }`}
              alt="Policy Upload"
              width="75%"
              height="75%"
            />
          )}
        </>

        <>
          <div className="font-semibold text-xl lg:text-2xl">
            {"Date of Submission: "}
          </div>
          {new Date(getTaskDetails.data?.dateOfSubmission).toLocaleDateString()}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">{"Status: "}</div>
          {getTaskDetails.data?.status}
        </>
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
