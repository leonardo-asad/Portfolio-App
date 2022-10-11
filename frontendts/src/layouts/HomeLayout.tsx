import { Navigate, useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../features/user/userSlice";

export const HomeLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const outlet = useOutlet();

  if (isLoggedIn) {
    return <Navigate to="/portfolio/holdings" replace />;
  }

  return (
    <>
      {outlet}
    </>
  );
};
