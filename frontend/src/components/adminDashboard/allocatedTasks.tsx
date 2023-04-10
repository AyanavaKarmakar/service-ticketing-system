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
        toast.success("allocated tasks fetched successfully!");
      } else {
        toast.error("allocated tasks fetch failed!");
      }

      const data = await response.json();

      const formData = data.allocatedTasks;

      // only keep the required fields
      const filteredArray = formData.map((obj: any) => {
        return {
          id: obj._id,
          customer: obj.customer.username,
          productType: obj.productType,
          issueType: obj.issueType,
          dateOfSubmission: new Date(obj.dateOfSubmission).toLocaleDateString(),
        };
      });

      const finalArray = filteredArray.filter((obj: any) => {
        return (
          obj.id &&
          obj.customer &&
          obj.productType &&
          obj.issueType &&
          obj.issueType.length > 0 &&
          obj.dateOfSubmission
        );
      });

      return finalArray;
    },

    enabled: true,

    onError: () => {
      toast.error("Interval server error. Please try again!");
    },
  });

  return (
    <div className="flex flex-col items-center justify-center p-6 lg:text-xl text-xs">
      <div className="text-center pt-6 pb-4 lg:pt-10 lg:pb-5 text-3xl lg:text-5xl text-black font-bold">
        Allocated Tasks
      </div>

      <div className="pb-1 text-md lg:text-xl font-semibold text-center">
        Click on a row to view the details of the request form.
      </div>

      <div className="lg:w-auto lg:overflow-hidden overflow-scroll w-full">
        <table className="table-auto border-x border-b">
          <thead>
            <tr>
              <th className="font-bold p-1 lg:p-2 border-b border-l border-gray-700 text-left bg-gray-700 text-white">
                Customer
              </th>
              <th className="font-bold p-1 lg:p-2 border-b border-l border-gray-700 text-left bg-gray-700 text-white">
                Product Type
              </th>
              <th className="font-bold p-1 lg:p-2 border-b border-l text-left border-gray-700 bg-gray-700 text-white">
                Issue Type
              </th>
              <th className="font-bold p-1 lg:p-2 border-b border-l text-left border-gray-700 bg-gray-700 text-white">
                Date of Submission
              </th>
            </tr>
          </thead>

          <tbody>
            {getTasks.data?.map((data: any, index: any) => (
              <tr
                onClick={() =>
                  navigate("/dashboard/admin/taskdetails", {
                    state: {
                      requestFormId: data.id,
                    },
                  })
                }
                key={index}
                className="odd:bg-gray-100 hover:!bg-stone-200 cursor-pointer"
              >
                {Object.keys(data)
                  .filter((key) => key !== "id")
                  .map((key) => (
                    <td
                      key={key}
                      className={clsx(
                        "p-1 lg:p-2 border-b border-l text-left",
                        key === "issueType" && "whitespace-nowrap"
                      )}
                    >
                      {key === "issueType" ? data[key].join(", ") : data[key]}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={() => navigate("/dashboard/admin")}
        className={clsx(
          "flex items-center justify-center py-2.5 px-5 mt-10 mb-5 bg-gray-900 text-xl text-white font-semibold rounded-md",
          "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75"
        )}
      >
        Go Back
      </button>
    </div>
  );
};
