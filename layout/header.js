import styles from "./layout.module.css";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const { t, i18n } = useTranslation("index");

  return (
    <div className={styles.header}>
      <a href="#default" className={styles.logo}>
        CompanyLogo
      </a>
      <div className={styles.headerRight}>
        <Link href="/" locale="ko">
          <a className={i18n.language == "ko" ? styles.active : ""}>KOR</a>
        </Link>
        <Link href="/" locale="en">
          <a className={i18n.language == "en" ? styles.active : ""}>ENG</a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
