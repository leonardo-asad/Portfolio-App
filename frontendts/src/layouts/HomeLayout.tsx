import { useOutlet } from "react-router-dom";

export const HomeLayout = () => {
  const outlet = useOutlet();

  return (
    <>
      {outlet}
    </>
  );
};
