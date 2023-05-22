import NavbarPage from "../navbar/NavbarPage";
import { UserWidget } from "../widgets/UserWidget";
import IsAuth from "../../components/IsAuth";

export const HomePage = () => {
  return (
    <div>
      <NavbarPage />
      <UserWidget />
      <IsAuth />
    </div>
  );
};

export default HomePage;
