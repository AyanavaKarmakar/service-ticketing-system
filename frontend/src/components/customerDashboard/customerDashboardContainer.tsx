import { useNavigate } from "react-router-dom";
import { clsx } from "clsx";

export const CustomerDashboardContainer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <div className="text-center p-5 text-lg lg:text-3xl text-black font-bold underline">
        Customer Dashboard
      </div>

      <button
        className={clsx(
          "mb-3 py-2.5 px-5 bg-gray-900 text-xl text-white font-semibold rounded-md",
          "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75"
        )}
        onClick={() => navigate("/dashboard/customer/requestForm")}
      >
        Create Request
      </button>
    </div>
  );
};
