import clsx from "clsx";

type RequestForm = {
  productType: string;
  issueType: string[];
  dateOfSubmission: string;
  status: string;
  details: string;
  [key: string]: string | string[];
};

const dummyData: RequestForm[] = [
  {
    productType: "Car",
    issueType: ["Claim", "Policy"],
    dateOfSubmission: "2021-01-01",
    status: "Open",
    details: "View Details",
  },
  {
    productType: "Home",
    issueType: ["Claim", "Policy", "Test"],
    dateOfSubmission: "2021-01-01",
    status: "In Progress",
    details: "View Details",
  },
];

export const RequestsTable = () => {
  return (
    <div className="p-6 lg:text-xl text-sm">
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
              Date of Submission
            </th>
            <th className="font-bold p-1 lg:p-2 border-b border-l text-left border-gray-700 bg-gray-700 text-white">
              Status
            </th>
            <th className="font-bold p-1 lg:p-2 border-b border-l text-left border-gray-700 bg-gray-700 text-white">
              Details
            </th>
          </tr>
        </thead>

        <tbody>
          {dummyData.map((data, index) => (
            <tr
              key={index}
              className="odd:bg-gray-100 hover:!bg-stone-200 cursor-pointer"
            >
              {Object.keys(data).map((key) => (
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
