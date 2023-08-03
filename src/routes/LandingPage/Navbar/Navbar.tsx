import AuthContext from "@context/AuthContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import i18n from "@utils/i18next";
import { paths } from "@utils/paths";
import { ReactElement, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Buttons,
  Logo,
  NavButtons,
  NavList,
  NavListMobile,
  NavWrapper,
} from "./Navbar.styled";
import { useAuth } from "@hooks/useAuth";

export const Navbar = (): ReactElement => {
  const { t } = useTranslation("common", { keyPrefix: "Navbar" });

  const { currentLanguage, setCurrentLanguage } = useContext(AuthContext);

  const { sessionState } = useAuth();

  const [isMenuVisible, setIsMenuVisible] = useState({
    mobile: false,
    language: false,
  });

  const navigate = useNavigate();

  const handleLanguageChange = () => {
    if (currentLanguage === "en") {
      setCurrentLanguage("ru");
      i18n.changeLanguage("ru");
      localStorage.setItem("language", "ru");
    } else {
      setCurrentLanguage("en");
      i18n.changeLanguage("en");
      localStorage.setItem("language", "en");
    }
    setIsMenuVisible({ ...isMenuVisible, language: false });
  };

  const handleChat = () => {
    if (sessionState.status !== "auth") {
      navigate(paths.chat);
    }else{
      navigate(paths.register);
    }
  }

  const handleCourses = () => {
    if (sessionState.status !== "auth") {
      navigate(paths.app);
    }else{
      navigate(paths.register);
    }
  }

  return (
    <NavWrapper>
      <Logo>
        <h1>Clutch-Learnify</h1>
      </Logo>
      <NavList>
        <li>
          <a href="#about" onClick={() => navigate('/')}>{t("about")}</a>
        </li>
        <li>
          <a href="#benefits" onClick={() => navigate('/')}>{t("benefits")}</a>
        </li>
        <li>
          <a onClick={handleChat}>{t("activities")}</a>
        </li>
        <li>
          <a onClick={handleCourses} >{t("games")}</a>
        </li>
      </NavList>
      <div>
        <Buttons isVisible={isMenuVisible.language}>
          <NavButtons style={{display: sessionState.status==='auth' ? 'flex' : 'none'}}>
            <button onClick={() => navigate(paths.login)}>{t("logIn")}</button>
            <button onClick={() => navigate(paths.register)}>
              {t("register")}
            </button>
          </NavButtons>
          <div style={{display: window.location.pathname!=='/' ? "none" : "block"}}>
            <button
              onClick={() =>
                setIsMenuVisible({
                  ...isMenuVisible,
                  language: !isMenuVisible.language,
                })
              }
            >
              {currentLanguage} <KeyboardArrowDownIcon />
            </button>
            <div style={{display: window.location.pathname!=='/' ? "none" : "block"}}>
              <button onClick={handleLanguageChange}>
                {currentLanguage==="en" ? "ru" : "en"}
              </button>
            </div>
          </div>
        </Buttons>

        <NavListMobile isVisible={isMenuVisible.mobile}>
          <button
            onClick={() =>
              setIsMenuVisible({
                ...isMenuVisible,
                mobile: !isMenuVisible.mobile,
              })
            }
          />
          <ul>
            <li>
              <a href="#about">{t("about")}</a>
            </li>
            <li>
              <a href="#reasons">{t("benefits")}</a>
            </li>
            <li>
              <a href="#activities" onClick={handleChat}>{t("activities")}</a>
            </li>
            <li>
              <a href="#games" onClick={handleCourses} >{t("games")}</a>
            </li>
          </ul>
        </NavListMobile>
      </div>
    </NavWrapper>
  );
};
