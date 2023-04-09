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
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="mt-3 text-xl lg:text-4xl text-black font-bold p-5">
        Request Form Details
      </div>

      <div className="flex p-5 lg:p-3 flex-col text-lg lg:text-xl text-left gap-y-2">
        <div>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Product Type: "}
          </div>
          {getFormDetails.data?.productType}
        </div>

        <>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Issue Type: "}
          </div>
          {getFormDetails.data?.issueType.join(", ")}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Issue Description: "}
          </div>
          {getFormDetails.data?.issueDescription ?? "Description not provided"}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Policy Upload: "}
          </div>

          {/** For docx/doc files */}
          {(getFormDetails.data?.policyUpload.toLowerCase().endsWith(".docx") ||
            getFormDetails.data?.policyUpload
              .toLowerCase()
              .endsWith(".doc")) && <></>}

          {/** For pdf files */}
          {getFormDetails.data?.policyUpload.toLowerCase().endsWith(".pdf") && (
            <embed
              src={`${import.meta.env.VITE_API_URL}/${
                getFormDetails.data?.policyUpload
              }`}
              type="application/pdf"
              width="100%"
              height="100%"
            />
          )}

          {/** For image files */}
          {(getFormDetails.data?.policyUpload.toLowerCase().endsWith(".png") ||
            getFormDetails.data?.policyUpload
              .toLowerCase()
              .endsWith(".jpg")) && (
            <img
              src={`${import.meta.env.VITE_API_URL}/${
                getFormDetails.data?.policyUpload
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
          {new Date(getFormDetails.data?.dateOfSubmission).toLocaleDateString()}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">{"Status: "}</div>
          {getFormDetails.data?.status}
        </>
      </div>

      <button
        type="button"
        onClick={() => navigate("/dashboard/customer")}
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
