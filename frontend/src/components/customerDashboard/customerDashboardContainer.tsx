import { useNavigate } from "react-router-dom";
import { RequestsTable } from "./RequestsTable";
import { clsx } from "clsx";

export const CustomerDashboardContainer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-3 items-center justify-center">
      <div className="text-center pt-10 pb-5 text-xl lg:text-5xl text-black font-bold">
        Customer Dashboard
      </div>

      <button
        className={clsx(
          "py-2.5 px-5 bg-gray-900 text-xl text-white font-semibold rounded-md",
          "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75"
        )}
        onClick={() => navigate("/dashboard/customer/requestForm")}
      >
        Create Request
      </button>

      <RequestsTable />
    </div>
  );
};
