import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import { faClosedCaptioning as regular } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { QuestionAtom, VideoAtom, VideoTimeCheckAtom } from "../atom";
import { useEffect, useRef, useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { AccessToken, STATICURL } from "../api";
import axios from "axios";

export default function Watch() {
  const open = () => {
    fetch(`${STATICURL}/test/player/on`, {
      method: "post",
      headers: {
        "X-AUTH-TOKEN": AccessToken,
        "Content-Type": `application/json`,
      },
      mode: "no-cors",
      body: JSON.stringify({
        unitId: 1,
      }),
    })
      .then((res) => res)
      .then((data) => {
        console.log(data);
        alert(data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const xml = () => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${STATICURL}/test/player/on`);

    xhr.send();

    xhr.onreadystatechange = function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseUR);
        this.abort();
      }
    };
  };

  const opena = () => {
    axios
      .post(
        `${STATICURL}/test/player/on`,
        {
          unitId: 1,
        },
        {
          headers: {
            "X-AUTH-TOKEN": AccessToken,
            "Content-Type": `application/json`,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        window.location.href = "/";
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <button onClick={open}>실행</button>
    </div>
  );
}
