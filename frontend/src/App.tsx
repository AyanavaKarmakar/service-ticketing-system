import { Navbar, AuthForm } from "./components";

const App = () => {
  console.log(localStorage.getItem("token"));

  return (
    <main>
      <nav>
        <Navbar />
      </nav>
      <AuthForm />

      <footer>
        <p className="text-center text-base text-black font-medium">
          Logged in as username
        </p>
      </footer>
    </main>
  );
};

export default App;
