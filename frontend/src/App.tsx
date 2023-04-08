import { Navbar, AuthForm } from "./components";

const App = () => {
  console.log(
    localStorage.getItem("token"),
    localStorage.getItem("username"),
    localStorage.getItem("userType")
  );

  return (
    <>
      <Navbar />
      <AuthForm />
    </>
  );
};

export default App;
