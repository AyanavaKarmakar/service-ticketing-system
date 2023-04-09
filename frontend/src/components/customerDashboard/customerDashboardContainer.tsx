import { useNavigate } from "react-router-dom";

export const CustomerDashboardContainer = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Dashboard</h1>

      <br />

      <button onClick={() => navigate("/dashboard/customer/requestForm")}>
        go to form
      </button>
    </>
  );
};
