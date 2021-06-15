import React from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/RingLoader";
import styles from './Loading.module.css'
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

const Loading = ({ loading }) => {
  return (
    <div className={styles.loadingWrap}>
      <ClipLoader color={"rgb(207,184,124)"} loading={loading} css={override} size={250} />
    </div>
  );
}

export default Loading;