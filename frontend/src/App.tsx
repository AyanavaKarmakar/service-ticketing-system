import { Navbar, AuthForm } from "./components";
import { useSelector } from "react-redux";
import { type RootState } from "./redux/store";

const App = () => {
  const { username } = useSelector((state: RootState) => state.userData);

  return (
    <main>
      <nav>
        <Navbar />
      </nav>
      <AuthForm />

      {username !== "" && (
        <footer>
          <p className="text-center text-base text-black font-medium">
            Logged in as {username}
          </p>
        </footer>
      )}
    </main>
  );
};

export default App;
