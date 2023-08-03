import { useAuth } from "@AuthContext";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { AboutSection } from "./AboutSection/AboutSection";
import { ActivitiesSection } from "./ActivitiesSection/ActivitiesSection";
import { BenefitsSection } from "./BenefitsSection/BenefitsSection";
import { Footer } from "./Footer/Footer";
import { HeroSection } from "./HeroSection/HeroSection";
import { Wrapper } from "./LandingPage.styled";
import { Navbar } from "./Navbar/Navbar";

const LandingPage = (): ReactElement => {
  // const { sessionState } = useAuth();

  // if (sessionState.status === "auth") {
  //   return <Navigate replace to={paths.app} />;
  // }

  const { user, loading, logout } = useAuth();
  if(loading){
    return <p>Loading....</p>
  }

  return (
    <Wrapper>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <ActivitiesSection />
      <Footer />
    </Wrapper>
  );
};

export default LandingPage;
