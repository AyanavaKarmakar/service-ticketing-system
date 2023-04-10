import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";

export const AdminDashboardContainer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-3 items-center justify-center">
      <div className="text-center pt-6 pb-4 lg:pt-10 lg:pb-5 text-3xl lg:text-5xl text-black font-bold">
        Admin Dashboard
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

      {/** Put tasks table here */}
    </div>
  );
};
