import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { client } from "../../../libs/supabase";
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useState, useEffect } from "react";
import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ComWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  margin: 0 auto;
  flex-direction: column;
  & * {
    box-sizing: border-box;
  }
`;

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMsg = styled.span`
  color: red;
`;

const PostNameBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PostBox = styled.div`
  display: flex;
  margin: 10px 0;
  width: 100%;
`;

const ComponentBox = styled.div`
  margin: 0 10px;
  width: 50px;
  &:nth-child(4) {
    width: 200px;
  }
  &:last-child {
    width: 100px;
  }
`;

export default function Community() {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    let { data: posts, error } = await client
      .from("POST")
      .select(
        "post_id, title, post_type, user_nickname, user_id, views, thumbs, comment_count, created_at, updated_at"
      );
    console.log(posts);
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const postList = () => {
    return posts.map((post) => {
      return (
        <PostBox>
          <ComponentBox>{post.post_type}</ComponentBox>
          <ComponentBox>{post.views}</ComponentBox>
          <ComponentBox>{post.thumbs}</ComponentBox>
          <ComponentBox>
            <Link to={`${post.post_id}`}>{post.title}</Link>
          </ComponentBox>
          <ComponentBox>{post.comment_count} </ComponentBox>
          <ComponentBox>{post.user_nickname} </ComponentBox>
        </PostBox>
      );
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addComPost = async (formData) => {
    const { data, error } = await client
      .from("POST")
      .insert([
        {
          title: formData.title,
          contents: formData.content,
          user_id: loggedInUser.id,
          user_nickname: loggedInUserProfile.user_nickname,
          post_type: formData.tag,
        },
      ])
      .select();
    if (error) {
      console.error(error);
      return;
    }
    getPosts();
    console.log("작성완료", data);
  };

  return (
    <>
      <ComWrapper>
        <Form onSubmit={handleSubmit(addComPost)}>
          <Title>글쓰기</Title>
          <InputBox>
            <label htmlFor="title">제목</label>
            <input
              {...register("title", { required: "제목을 입력해 주세요." })}
              id="title"
              type="text"
            />
            <ErrorMsg>{errors?.email?.message}</ErrorMsg>
          </InputBox>
          <select name="tag" id="tag" {...register("tag")}>
            <option value="자유">자유</option>
            <option value="질문">질문</option>
            <option value="후기">후기</option>
            <option value="꿀팁">꿀팁</option>
          </select>
          <InputBox>
            <label htmlFor="content">내용</label>
            <textarea
              rows="10"
              {...register("content", {
                required: "내용을 입력해 주세요.",
              })}
              id="content"
            ></textarea>
            <ErrorMsg>{errors?.content?.message}</ErrorMsg>
          </InputBox>
          <button style={{ padding: "10px" }}>글쓰기</button>
        </Form>
        <PostNameBox>
          <PostBox className="hi">
            <ComponentBox>태그</ComponentBox>
            <ComponentBox>조회수</ComponentBox>
            <ComponentBox>추천수</ComponentBox>
            <ComponentBox>제목</ComponentBox>
            <ComponentBox>댓글수</ComponentBox>
            <ComponentBox>작성자</ComponentBox>
          </PostBox>
          {postList()}
        </PostNameBox>
      </ComWrapper>
    </>
  );
}
// App.jsx / App.tsx
// class App extends Component {
//     render() {
//         return (
//             <div className="App">
//                 <h2>Using CKEditor&nbsp;5 build in React</h2>
//                 <CKEditor
//                     editor={ ClassicEditor }
//                     data="<p>Hello from CKEditor&nbsp;5!</p>"
//                     onReady={ editor => {
//                         // You can store the "editor" and use when it is needed.
//                         console.log( 'Editor is ready to use!', editor );
//                     } }
//                     onChange={ ( event ) => {
//                         console.log( event );
//                     } }
//                     onBlur={ ( event, editor ) => {
//                         console.log( 'Blur.', editor );
//                     } }
//                     onFocus={ ( event, editor ) => {
//                         console.log( 'Focus.', editor );
//                     } }
//                 />
//             </div>
//         );
//     }
// }
