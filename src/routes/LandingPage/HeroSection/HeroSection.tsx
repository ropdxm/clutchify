import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { HeroImg, HeroInfo, HeroWrapper } from "./HeroSection.styled";
import uniJPEG from '../../../../public/assets/Webp.net-compress-image.jpg';

export const HeroSection = (): ReactElement => {
  const { t } = useTranslation("common", { keyPrefix: "HeroSection" });

  return (
    <HeroWrapper>
      <HeroInfo>
        <h1>
          {t("headerPartOne")}
          <span>{t("easy")}</span>
          {t("headerPartTwo")}
          <span>{t("enjoyable")}</span>
        </h1>
        <p>{t("desc")}</p>
        <a href="#about">Read more</a>
      </HeroInfo>
      <HeroImg>
        <img alt="hero" src={uniJPEG} />
      </HeroImg>
    </HeroWrapper>
  );
};
