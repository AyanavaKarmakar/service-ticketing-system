import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";

export const AllocatedTasks = () => {
  const navigate = useNavigate();

  return (
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
  );
};
