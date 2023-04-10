import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const RequestsTable = () => {
  const navigate = useNavigate();

  const GetRequestForms = useQuery({
    queryKey: ["requestForms"],

    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/customer/requestform`,
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
      const formData = data.requestForms;

      // only keep the required fields
      const filteredArray = formData.map((obj: any) => {
        return {
          id: obj._id,
          productType: obj.productType,
          issueType: obj.issueType,
          status: obj.status,
          dateOfSubmission: new Date(obj.dateOfSubmission).toLocaleDateString(),
        };
      });

      const finalArray = filteredArray.filter((obj: any) => {
        return (
          obj.id &&
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
    <div className="p-6 lg:text-xl text-xs overflow-x-auto">
      <div className="pb-1 text-xl font-semibold text-center">
        Click on a row to view the details of the request form.
      </div>

      <table className="table-auto border-x border-b">
        <thead>
          <tr>
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
          {GetRequestForms?.data?.map((data: any, index: any) => (
            <tr
              onClick={() =>
                navigate("/dashboard/customer/formdetails", {
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
  );
};
