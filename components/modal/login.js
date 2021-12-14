import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "next-i18next";
import axios from "axios";
import styles from "./modal.module.css";

const LoginModal = ({ onClose, children, title })=>{
    const [isBrowser, setIsBrowser] = useState(false);

    // create ref for the StyledModalWrapper component
    const modalWrapperRef = React.useRef();

    // check if the user has clickedinside or outside the modal
    const backDropHandler = e => {
      if (!modalWrapperRef?.current?.contains(e.target)) {
          onClose();
      }
    }
  
    useEffect(() => {
      setIsBrowser(true);

     // attach event listener to the whole windor with our handler
      window.addEventListener('click', backDropHandler);

      // remove the event listener when the modal is closed
      return () => window.removeEventListener('click', backDropHandler);
    }, []);
  
    React.useLayoutEffect(() => {
        console.log('here')
    }, []);

    const handleCloseClick = (e) => {
      e.preventDefault();
      onClose();
    };
  
    const modalContent = (
      <StyledModalOverlay>
        {/* Wrap the whole Modal inside the newly created StyledModalWrapper 
            and use the ref
        */}
        <StyledModalWrapper ref={modalWrapperRef}>
            <StyledModal>
            <StyledModalHeader>
                <a href="#" onClick={handleCloseClick}>
                x
                </a>
            </StyledModalHeader>
            {title && <StyledModalTitle>{title}</StyledModalTitle>}
            <StyledModalBody>{children}</StyledModalBody>
            </StyledModal>
        </StyledModalWrapper>
      </StyledModalOverlay>
    );
  
    if (isBrowser) {
      return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
      );
    } else {
      return null;
    }
};
  
  const StyledModalBody = styled.div`
    padding-top: 10px;
  `;
  
  const StyledModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 25px;
  `;
  
  // the wrapper component
  const StyledModalWrapper = styled.div`
    width: 500px;
    height: 600px;
    `;
  
  const StyledModal = styled.div`
    background: white;
    height:100%;
    width:100%;
    border-radius: 15px;
    padding: 15px;
  `;

  const StyledModalOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  `;
  
}
// const LoginModal = (props) => {
//   const { t } = useTranslation("login");
//   const modalEl = useRef();

//   const handleClickOutside = useCallback(
//     ({ target }) => {
//       if (!modalEl.current.contains(target)) {
//         props.close();
//       }
//     },
//     [props]
//   );

//   const tokenCheck = useCallback(() => {
//     let userInfo;
//     try {
//       userInfo = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));
//     } catch {
//       localStorage.clear();
//       return;
//     }

//     switch (userInfo.status) {
//       case "google_set":
//         setStep(<Step2 />);
//         break;
//       case "notion_set":
//         setStep(<Step3 />);
//         break;
//       case "database_created":
//         setStep(<Step4 />);
//         break;
//       case "finish":
//         props.history.push("/dashboard");
//         break;
//       default:
//         toast.error("Error connect_not_status");
//         break;
//     }
//   }, [props.history]);

//   function Step1() {
//     const onLoginGoogle = async (result) => {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_SERVER}/auth/google`,
//         {
//           code: result.code,
//         }
//       );
//       localStorage.setItem("token", res.data.token);
//       tokenCheck();
//     };

//     const GoogleLoginBtn = (props) => {
//       return (
//         <GoogleLogin
//           clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
//           render={(props) => (
//             <div className="btn" onClick={props.onClick}>
//               <GoogleLogo />
//               <div>{t("connect_1_google_btn")}</div>
//             </div>
//           )}
//           onSuccess={(result) => onLoginGoogle(result)}
//           onFailure={(result) => console.log(result)}
//           cookiePolicy={"single_host_origin"}
//           redirectUri="/connect"
//           scope={"profile email https://www.googleapis.com/auth/calendar"}
//           accessType={"offline"}
//           approvalPrompt={"force"}
//           prompt={"consent"}
//           responseType={"code"}
//         />
//       );
//     };

//     return (
//       <>
//         <div className="title">
//           {t("connect_title_1")}
//           <br />
//           <span className="underscore">{t("connect_title_2")}</span>
//         </div>
//         <div className="subtitle">{t("connect_1_subtitle")}</div>
//         <div className="desc">
//           {t("connect_1_desc_1")}
//           <br />
//           {t("connect_1_desc_2")}
//         </div>
//         <GoogleLoginBtn />
//         <div className="btn-desc">
//           {t("connect_1_google_btn_desc_1")}
//           <a href={t("privacy_policy")}>{t("connect_1_google_btn_desc_2")}</a>
//           {t("connect_1_google_btn_desc_3")}
//           <br />
//           <a href={t("tos")}>{t("connect_1_google_btn_desc_4")}</a>
//           {t("connect_1_google_btn_desc_5")}
//         </div>
//       </>
//     );
//   }

//   function Step2() {
//     const userInfo = JSON.parse(
//       atob(localStorage.getItem("token").split(".")[1])
//     );
//     const notion_auth_url = `https://api.notion.com/v1/oauth/authorize?client_id=${process.env.REACT_APP_NOTION_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NOTION_CALLBACK}&response_type=code&owner=user`;

//     const continueOtherAccount = () => {
//       localStorage.clear();
//       window.removeEventListener("click", handleClickOutside);
//       props.close(false);
//     };

//     return (
//       <>
//         <div className="title">
//           {t("connect_title_1")}
//           <br />
//           <span className="underscore">{t("connect_title_2")}</span>
//         </div>
//         <div className="subtitle">{t("connect_2_subtitle")}</div>
//         <div className="desc">{t("connect_2_desc_1")}</div>
//         <a className="btn" href={notion_auth_url}>
//           <NotionLogo />
//           <div>{t("connect_2_notion_btn")}</div>
//         </a>
//         <div className="btn-desc">
//           {t("connect_2_notion_btn_desc_1", { email: userInfo.email })}
//           <br />
//           <span className="link" onClick={continueOtherAccount}>
//             {t("connect_2_notion_btn_desc_2")}
//           </span>
//         </div>
//       </>
//     );
//   }

//   function Step3() {
//     const userInfo = JSON.parse(
//       atob(localStorage.getItem("token").split(".")[1])
//     );

//     const [inputValue, setInputValue] = useState("");
//     const [isInputAble, setInputAble] = useState(false);

//     const continueOtherAccount = () => {
//       localStorage.clear();
//       window.removeEventListener("click", handleClickOutside);
//       props.close(false);
//     };

//     const onInputChange = (value) => {
//       setInputValue(value);
//       let url_uuid = value.split("/")[value.split("/").length - 1];
//       url_uuid = url_uuid.split("-")[url_uuid.split("-").length - 1];
//       if (url_uuid.length === 32) {
//         setInputAble(true);
//       } else {
//         setInputAble(false);
//       }

//       if (url_uuid.split("=")[1] && url_uuid.split("=")[1]?.length === 32) {
//         toast.info(t("connect_3_toast_1"));
//       }
//     };

//     const onSetNotionDatabase = async () => {
//       if (!isInputAble) return;
//       toast.info(t("connect_3_toast_2"));
//       setInputAble(false);

//       let url_uuid = inputValue.split("/")[inputValue.split("/").length - 1];
//       url_uuid = url_uuid.split("-")[url_uuid.split("-").length - 1];

//       let res;
//       try {
//         res = await axios.post(
//           `${process.env.REACT_APP_API_SERVER}/connect/notion/database`,
//           {
//             token: localStorage.getItem("token"),
//             pageId: url_uuid,
//           }
//         );
//         localStorage.setItem("token", res.data.token);
//         setStep(<Step4 />);
//         toast.info(t("connect_3_toast_3"));
//       } catch (err) {
//         console.error(err);
//         if (err.response) {
//           if (err.response.data.code === "notion_unauthorized") {
//             localStorage.clear();
//             window.location.replace("/");
//             toast.error(t("connect_3_toast_5"));
//             return;
//           }
//         }
//         setInputAble(true);
//         toast.error(t("connect_3_toast_4"));
//       }
//     };

//     return (
//       <>
//         <div className="title">
//           {t("connect_title_1")}
//           <br />
//           <span className="underscore">{t("connect_title_2")}</span>
//         </div>
//         <div className="subtitle">{t("connect_3_subtitle")}</div>
//         <div className="desc">
//           {t("connect_3_desc_1")}
//           <br />
//           {t("connect_3_desc_2")}
//         </div>
//         {/* <a className="btn" href={notion_auth_url}><NotionLogo /><div>{t("connect_2_notion_btn")}</div></a> */}
//         <div className="input">
//           <input
//             type="text"
//             placeholder="https://notion.so/xxxxxxxx"
//             value={inputValue}
//             onChange={(e) => onInputChange(e.target.value)}
//           />
//           <div
//             className={isInputAble ? "active" : "disabled"}
//             onClick={() => onSetNotionDatabase()}
//           >
//             <CheckIcon />
//           </div>
//         </div>

//         <div className="btn-desc">
//           {t("connect_3_btn_desc_1", { email: userInfo.email })}
//           <br />
//           <span className="link" onClick={continueOtherAccount}>
//             {t("connect_3_btn_desc_2")}
//           </span>
//         </div>
//       </>
//     );
//   }

//   function Step4() {
//     const finishConnect = async () => {
//       try {
//         const res = await axios.post(
//           `${process.env.REACT_APP_API_SERVER}/connect/calendar`,
//           {
//             token: localStorage.getItem("token"),
//           }
//         );
//         localStorage.setItem("token", res.data.token);
//         window.removeEventListener("click", handleClickOutside);
//         props.history.push("/dashboard");
//       } catch (err) {
//         if (err.response) {
//           if (err.response.status === 401) {
//             localStorage.clear();
//             toast.error(
//               "⚠️ 인증 토큰이 만료되었거나 올바르지 않아요. (err.401)"
//             );
//           } else {
//             toast.error(`⚠️ 문제가 생겼어요. - ${err.message}`);
//             console.error(err);
//           }
//         } else {
//           toast.error("⚠️ 서버에 연결할 수 없어요.");
//           console.error(err);
//         }
//       }
//     };

//     return (
//       <>
//         <div className="title">
//           {t("connect_title_1")}
//           <br />
//           <span className="underscore">{t("connect_title_2")}</span>
//         </div>
//         <div className="subtitle">{t("connect_4_subtitle")}</div>
//         <div className="desc">
//           {t("connect_4_desc_1")}
//           <br />
//           {t("connect_4_desc_2")}
//           <br />
//           {t("connect_4_desc_3")}
//         </div>
//         <a
//           target="_blank"
//           rel="noopener noreferrer"
//           href={t("connect_4_btn_1_link")}
//           className="btn btn-1"
//         >
//           <div>{t("connect_4_btn_1")}</div>
//         </a>
//         <div className="btn btn-2" onClick={finishConnect}>
//           <div>{t("connect_4_btn_2")}</div>
//         </div>
//         <div className="btn-desc">{t("connect_4_btn_desc_1")}</div>
//       </>
//     );
//   }

//   const [nowStep, setStep] = useState(<Step1 />);

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       tokenCheck();
//     }
//   }, [tokenCheck]);

//   useEffect(() => {
//     window.addEventListener("click", handleClickOutside);
//     return () => {
//       window.removeEventListener("click", handleClickOutside);
//     };
//   }, [handleClickOutside]);

//   useEffect(() => {
//     // 노션 토큰
//     (async () => {
//       const query = queryString.parse(props.location.search);
//       if (query.code) {
//         const notion_api_res = await axios.post(
//           `${process.env.REACT_APP_API_SERVER}/connect/notion`,
//           {
//             code: query.code,
//             token: localStorage.getItem("token"),
//           }
//         );
//         localStorage.setItem("token", notion_api_res.data.token);
//         props.history.replace("/connect");
//         setStep(<Step3 />);
//       }
//     })();
//   }, [props.location, props.history]);

//   return (
//     <>
//       <div className={modal_divver}>
//         <div id="modal" ref={modalEl}>
//           {nowStep}
//         </div>
//       </div>
//     </>
//   );
// };

export default LoginModal;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["login"])),
  },
});
