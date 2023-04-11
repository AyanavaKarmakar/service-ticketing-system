import { useLocation, useNavigate } from "react-router-dom";
import { clsx } from "clsx";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

export const MyTasks = () => {
  const navigate = useNavigate();
  const { requestFormId } = useLocation().state;
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("Set Status");

  const assignStatus = useMutation({
    mutationKey: ["setStatus"],

    mutationFn: async () => {
      setIsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${requestFormId}/changestatus`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (response.status === 200) {
        toast.success("Status updated successfully!");
        navigate("/dashboard/employee");
      } else {
        toast.error("Status update failed!");
      }
    },

    onError: () => {
      toast.error("Interval server error. Please try again!");
    },

    onSettled: () => {
      setIsLoading(false);
    },
  });

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
        setIsLoading(false);
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
          {getTaskDetails?.data?.customer?.username}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Product Type: "}
          </div>
          {getTaskDetails?.data?.productType}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Issue Type: "}
          </div>
          {getTaskDetails?.data?.issueType.join(", ")}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Issue Description: "}
          </div>
          {getTaskDetails?.data?.issueDescription ?? "Description not provided"}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">
            {"Policy Upload: "}
          </div>

          {/** For docx/doc files */}
          {(getTaskDetails?.data?.policyUpload
            .toLowerCase()
            .endsWith(".docx") ||
            getTaskDetails?.data?.policyUpload
              .toLowerCase()
              .endsWith(".doc")) && (
            <iframe
              src={`https://docs.google.com/gview?url=${getTaskDetails?.data?.policyUpload}&embedded=true`}
              width="100%"
              height="100%"
            />
          )}

          {/** For pdf files */}
          {getTaskDetails?.data?.policyUpload
            .toLowerCase()
            .endsWith(".pdf") && (
            <embed
              src={getTaskDetails?.data?.policyUpload}
              type="application/pdf"
              width="100%"
              height="100%"
            />
          )}

          {/** For image files */}
          {(getTaskDetails?.data?.policyUpload.toLowerCase().endsWith(".png") ||
            getTaskDetails?.data?.policyUpload
              .toLowerCase()
              .endsWith(".jpg")) && (
            <img
              src={getTaskDetails?.data?.policyUpload}
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
          {new Date(
            getTaskDetails?.data?.dateOfSubmission
          ).toLocaleDateString()}
        </>

        <>
          <div className="text-xl lg:text-2xl font-semibold">{"Status: "}</div>
          {getTaskDetails?.data?.status}
        </>
      </div>

      <div className="flex flex-col gap-y-3">
        <SelectPrimitive.Root
          defaultValue={"Set Status"}
          onValueChange={(value) => setStatus(value)}
        >
          <SelectPrimitive.Trigger
            asChild
            aria-label="Current Status"
            className="mt-5"
          >
            <button
              type="button"
              className="border border-gray-300 rounded-md p-3 text-base flex items-center justify-between"
            >
              <SelectPrimitive.Value />
              <SelectPrimitive.Icon className="ml-2">
                <ChevronDownIcon />
              </SelectPrimitive.Icon>
            </button>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Content>
            <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700">
              <ChevronUpIcon />
            </SelectPrimitive.ScrollUpButton>

            <SelectPrimitive.Viewport className="bg-white p-2  rounded-lg shadow-lg">
              <SelectPrimitive.Group>
                {["Set Status", "On Hold", "Completed"].map((status, index) => (
                  <SelectPrimitive.Item
                    value={status}
                    key={`${status}-${index}`}
                    disabled={status === "Set Status"}
                    className={clsx(
                      "relative flex items-center px-6 py-2 rounded-md text-sm text-gray-700 font-medium focus:bg-gray-100",
                      "radix-disabled:opacity-50",
                      "focus:outline-none select-none cursor-pointer"
                    )}
                  >
                    <SelectPrimitive.ItemText>
                      {status}
                    </SelectPrimitive.ItemText>

                    <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <CheckIcon />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Group>
            </SelectPrimitive.Viewport>

            <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700">
              <ChevronDownIcon />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>

        <button
          type="button"
          disabled={status === "Set Status"}
          onClick={() => assignStatus.mutate()}
          className={clsx(
            "py-2.5 px-5 bg-teal-900 text-xl text-white font-semibold rounded-md",
            "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75",
            status === "Set Status" && "cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <SymbolIcon className="w-8 h-6 animate-spin" />
          ) : (
            "Confirm"
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard/employee")}
          className={clsx(
            "py-2.5 px-5 mb-5 bg-gray-900 text-xl text-white font-semibold rounded-md",
            "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75"
          )}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
