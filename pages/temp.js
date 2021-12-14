import { useState, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Home = () => {
  const { t, i18n } = useTranslation("index");
  const [isConnectOpen, setConnectOpen] = useState(false);
  const [userInfo, setUserInfo] = useState("000");
  const [userCount, setUserCount] = useState("000");
  const [review, setReview] = useState([
    {
      id: 0,
      emoji: "🧔",
      review: "...",
      author: "...",
    },
    {
      id: 0,
      emoji: "🧔",
      review: "...",
      author: "...",
    },
    {
      id: 0,
      emoji: "🧔",
      review: "...",
      author: "...",
    },
  ]);
  // const dateTimeString = () => {
  //   let date = new Date();
  //   let year = date.getFullYear();
  //   let month = ("0" + (date.getMonth() + 1)).slice(-2);
  //   let day = ("0" + date.getDate()).slice(-2);
  //   let hours = ("0" + date.getHours()).slice(-2);
  //   let minutes = ("0" + date.getMinutes()).slice(-2);
  //   let seconds = ("0" + date.getSeconds()).slice(-2);

  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // };

  return (
    <div id="index">
      <div className="titles">
        {/* <div className="opize-projects">Opize Project #1</div> */}
        <h1>
          {t("index_title_1")}
          <span className="underscore">{t("index_title_2")}</span>
          {t("index_title_3")}
          <br />
          {t("index_title_4")}
        </h1>
        <div className="btn-connect" onClick={() => setConnectOpen(true)}>
          {userInfo?.status === "finish"
            ? t("index_title_btn_2")
            : t("index_title_btn_1")}
          {/* <CaretRight /> */}
        </div>
      </div>
      <div className="blocks-1">
        <div className="block block-left">
          <h2>
            {t("index_block_1_block_1_title_1")}
            <br />
            {/* {t("index_block_1_block_1_title_2")} */}
          </h2>
          <p>
            {t("index_block_1_block_1_desc_1")}
            <br />
            {/* {t("index_block_1_block_1_desc_2")} */}
          </p>
          <a
            className="btn"
            href={t("index_block_1_block_1_btn_link")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("index_block_1_block_1_btn")}
            {/* <CaretRight /> */}
          </a>
          <div className="img">
            {/* <img src="/Calendar_perspective_matte_s.png" alt="calendar icon" /> */}
          </div>
        </div>
        <div className="block-right">
          <div className="block block-right-1">
            <h3>
              {t("index_block_1_block_2_title_1")}
              <br />
              {/* {t("index_block_1_block_2_title_2")} */}
            </h3>
            <p>
              {t("index_block_1_block_2_desc_1")}
              <br />
              {/* {t("index_block_1_block_2_desc_2")} */}
            </p>
          </div>
          <div className="block block-right-2">
            <h3>
              {t("index_block_1_block_3_title_1")}
              <br />
              <span>
                123
                {/* {t("index_block_1_block_3_title_2")} */}
              </span>
              <br />
              {/* {t("index_block_1_block_3_title_3")} */}
            </h3>
            <p>
              {/* {t("index_block_1_block_3_last_update")} */}
              {/* {dateTimeString()} */}
            </p>
          </div>
        </div>
      </div>

      <div className="blocks-2">
        <div className="title">{t("index_block_2_title")}</div>

        <div className="block block-1">
          <div className="block-left">
            <div className="subtitle">
              {t("index_block_2_block_1_subtitle")}
            </div>
            <h3>
              {t("index_block_2_block_1_title_1")}
              <br />
              {/* {t("index_block_2_block_1_title_2")} */}
            </h3>
            <p>
              {t("index_block_2_block_1_desc_1")}
              <br />
              {/* {t("index_block_2_block_1_desc_2")} */}
            </p>
          </div>
          <div className="block-right">
            {/* <img src="/Clock_perspective_matte_s.png" alt="clock icon" /> */}
          </div>
        </div>

        <div className="block block-2">
          <div className="block-left">
            <div className="subtitle">
              {t("index_block_2_block_2_subtitle")}
            </div>
            <h3>
              {t("index_block_2_block_2_title_1")}
              <br />
              {/* {t("index_block_2_block_2_title_2")} */}
            </h3>
            <p>
              {t("index_block_2_block_2_desc_1")}
              <br />
              {/* {t("index_block_2_block_2_desc_2")} */}
            </p>
          </div>
          <div className="block-right">
            {/* <img src="/Calendar_perspective_matte_s.png" alt="calendar icon" /> */}
          </div>
        </div>

        <div className="block block-3">
          <div className="block-left">
            <div className="subtitle">
              {t("index_block_2_block_3_subtitle")}
            </div>
            <h3>
              {t("index_block_2_block_3_title_1")}
              <br />
              {/* {t("index_block_2_block_3_title_2")} */}
            </h3>
            <p>
              {t("index_block_2_block_3_desc_1")}
              <br />
              {/* {t("index_block_2_block_3_desc_2")} */}
            </p>
          </div>
          <div className="block-right">
            {/* <img src="/Notebook_perspective_matte_s.png" alt="note icon" /> */}
          </div>
        </div>
      </div>

      <div className="blocks-3">
        <div className="title">{t("index_block_3_title")}</div>
        <div className="reviews">
          <div className="review">
            <div className="review-emoji">{review[0].emoji}</div>
            <div className="review-content">{review[0].review}</div>
            <div className="review-author">
              - {review[0].author}
              {t("index_block_3_review_author")}
            </div>
          </div>

          <div className="review">
            <div className="review-emoji">{review[1].emoji}</div>
            <div className="review-content">{review[1].review}</div>
            <div className="review-author">
              - {review[1].author}
              {t("index_block_3_review_author")}
            </div>
          </div>
          <div className="review">
            <div className="review-emoji">{review[2].emoji}</div>
            <div className="review-content">{review[2].review}</div>
            <div className="review-author">
              - {review[2].author}
              {t("index_block_3_review_author")}
            </div>
          </div>
        </div>
        <div className="desc">{t("index_block_3_desc")}</div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["index"])),
  },
});
