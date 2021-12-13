import styles from "./layout.module.css";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const { t, i18n } = useTranslation("common");

  // // 라우터에서 언어 설정값 불러오기
	// const router = useRouter();
	// const { locale, locales, defaultLocale } = router;
	// // 현재 언어 설정 지정
	// const now_locale = locale || defaultLocale || locales[0];
	// // 현재 패스(위치) 알기
	// const { pathname } = router;

	// // 언어 설정 전환 이벤트
	// const onChangeLocale = useCallback((lang) => {
  //   router.push(pathname, pathname, { locale: lang });
  // }, []);

  return(
    <div className={styles.header}>
      <a href="#default" className={styles.logo}>CompanyLogo</a>
      <div className={styles.headerRight}>
      <Link href="/" locale="ko"><a className={i18n.language == "ko" ? styles.active : ""}>KOR</a></Link>
      <Link href="/" locale="en"><a className={i18n.language == "en" ? styles.active : ""}>ENG</a></Link>
      </div>
    </div>
  )
}

export default Header;