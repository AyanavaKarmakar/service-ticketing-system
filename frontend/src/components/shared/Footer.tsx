import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";

export const Footer = () => {
  const { username } = useSelector((state: RootState) => state.userData);

  return (
    <>
      {username !== "" && (
        <footer>
          <p className="text-center text-base text-black font-medium">
            Logged in as {username}
          </p>
        </footer>
      )}
    </>
  );
};
