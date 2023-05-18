import NavbarPage from "../navbar/NavbarPage";
import { UserWidget } from "../widgets/UserWidget";

export const HomePage = () => {
  return (
    <div>
      <NavbarPage />
      <UserWidget />
    </div>
  );
};

export default HomePage;
