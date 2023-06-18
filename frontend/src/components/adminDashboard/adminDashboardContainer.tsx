import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AdminDashboardContainer = () => {
  const navigate = useNavigate();

  const getMyTasks = useQuery({
    queryKey: ["userTasks"],

    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/mytasks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("User tasks fetched successfully!");
      } else {
        toast.error("User tasks fetch failed!");
      }

      const data = await response.json();

      const formData = data.tasks;

      // only keep the required fields
      const filteredArray = formData.map((obj: any) => {
        return {
          id: obj._id,
          customer: obj.customer.username,
          productType: obj.productType,
          issueType: obj.issueType,
          status: obj.status,
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
          obj.status &&
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
    <div className="flex flex-col items-center justify-center">
      <div className="text-center pt-6 pb-2 lg:pt-10 lg:pb-5 text-4xl lg:text-6xl text-black font-bold">
        Admin Dashboard
      </div>

      <div className="text-center pb-4 lg:pt-10 lg:pb-5 text-2xl lg:text-4xl text-black font-bold">
        Service Requests
      </div>

      <div className="flex flex-row gap-x-5">
        <button
          onClick={() => navigate("/dashboard/admin/unallocated")}
          className={clsx(
            "py-2.5 px-3 lg:px-5 bg-gray-900 text-md lg:text-xl text-white font-semibold rounded-md",
            "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75"
          )}
        >
          Unallocated Tasks
        </button>

        <button
          onClick={() => navigate("/dashboard/admin/allocated")}
          className={clsx(
            "py-2.5 px-3 lg:px-5 bg-gray-900 text-md lg:text-xl text-white font-semibold rounded-md",
            "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75"
          )}
        >
          Allocated Tasks
        </button>
      </div>

      <div className="text-center pt-6 pb-4 lg:pt-10 lg:pb-5 text-2xl lg:text-4xl text-black font-bold">
        My Tasks
      </div>

      <div className="pb-1 text-md lg:text-xl font-semibold text-center mx-3">
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
                Status
              </th>
              <th className="font-bold p-1 lg:p-2 border-b border-l text-left border-gray-700 bg-gray-700 text-white">
                Date of Submission
              </th>
            </tr>
          </thead>

          <tbody>
            {getMyTasks.data?.map((data: any, index: any) => (
              <tr
                onClick={() =>
                  navigate("/dashboard/admin/mytasks", {
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
    </div>
  );
};
