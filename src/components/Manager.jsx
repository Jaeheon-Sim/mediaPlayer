import { motion } from "framer-motion";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useEffect, useState } from "react";
import { STATICURL } from "../api";

const Wrapper = styled.div``;
const Input = styled.input`
  border: 1px solid black;
  margin-right: 5px;
`;
const Form = styled.form`
  border: 1px solid black;
  padding: 20px;
`;

export default function Manager() {
  const [movie, setMovie] = useState("");
  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState(0);
  const upload = (e) => {
    e.preventDefault();
    console.log(unit, title);
    const formData = new FormData();
    formData.append("file", movie);
    formData.append(
      "unitRequestDto",
      JSON.stringify({ courseId: Number(unit), title: String(title) })
    );

    fetch(`${STATICURL}/open/course/unit`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <Wrapper>
      매니저 임시 페이지
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>강의를 업로드 하세요</h1>
      <br />
      <br />
      <br />
      <Form>
        <Input
          type="file"
          accept={".mp4"}
          onChange={(e) => {
            setMovie(e.target.files[0]);
          }}
          placeholder="강의 mp4를 업로드하세요"
        />
        <Input
          type="number"
          placeholder="강의 unit"
          value={unit}
          onChange={(e) => {
            setUnit(e.target.value);
          }}
        />
        <Input
          type="text"
          placeholder="강의 title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <button onClick={upload}>업로드</button>
      </Form>
    </Wrapper>
  );
}
