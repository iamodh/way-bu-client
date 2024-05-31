import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { client } from "../../../libs/supabase";
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useState, useEffect } from "react";
import React from "react";
import {
  ComWrapper,
  TitleBox,
  TagWrapper,
  TagContainer,
  TagName,
  TagBox,
  PostWrapper,
  PostBox,
  PostThumb,
  PostTag,
  PostLeft,
  PostLeftTop,
  PostTitle,
  PostComment,
  PostLeftBottom,
  PostUser,
  PostDate,
  PostView,
  PostDesc,
  WriteBox,
  WriteButton,
  PageWrapper,
  PageBox,
  PageBtn,
  SearchForm,
  SearchBox,
  SearchBtn,
} from "./components/CommunityLayout";

export default function Community() {
  const postPerPage = 10;
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );
  const [originalPosts, setOriginalPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [postPage, setPostPage] = useState(1);
  const [pageSection, setPageSection] = useState(1);
  const [sortWay, setSortWay] = useState("created_at");
  const [order, setOrder] = useState(true);

  const getPosts = async () => {
    let { data: posts, error } = await client
      .from("POST")
      .select(
        "post_id, title, contents, post_type, user_nickname, user_id, views, thumbs, comment_count, created_at, updated_at"
      );
    console.log(posts);
    posts.sort((a, b) => {
      return b["created_at"] > a["created_at"] ? 1 : -1;
    });
    setOriginalPosts(posts);
    setPosts(posts);
  };

  const handleSort = (way) => {
    let newOrder = order;
    if (sortWay === way) {
      newOrder = !order;
      setOrder(newOrder);
    } else {
      setSortWay(way);
      newOrder = false;
      setOrder(newOrder);
    }
    const sortedPosts = [...posts].sort((a, b) => {
      if (newOrder) {
        return a[way] > b[way] ? 1 : -1;
      } else {
        return a[way] < b[way] ? 1 : -1;
      }
    });
    setPosts(sortedPosts);
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const koreanDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
    );
    const padZero = (num) => String(num).padStart(2, "0");
    const formattedDate = `${koreanDate.getFullYear()}.${padZero(
      koreanDate.getMonth() + 1
    )}.${padZero(koreanDate.getDate())}.${padZero(
      koreanDate.getHours()
    )}:${padZero(koreanDate.getMinutes())}:${padZero(koreanDate.getSeconds())}`;

    return formattedDate;
  };

  const postList = () => {
    return posts
      .slice((postPage - 1) * postPerPage, postPage * postPerPage - 1)
      .map((post) => {
        return (
          <PostBox>
            <PostThumb>{post.thumbs}</PostThumb>
            <PostTag>{post.post_type}</PostTag>
            <PostLeft>
              <PostLeftTop>
                <PostTitle>
                  <Link to={`${post.post_id}`}>{post.title}</Link>
                </PostTitle>
                {post.comment_count !== 0 && (
                  <PostComment>{post.comment_count} </PostComment>
                )}
              </PostLeftTop>
              <PostLeftBottom>
                <PostUser>{post.user_nickname} </PostUser>
                <PostDate>{formatTime(post.created_at)} </PostDate>
              </PostLeftBottom>
            </PostLeft>
            <PostView>{post.views}</PostView>
          </PostBox>
        );
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTag = (tag) => {
    if (tag === "전체") {
      setPosts(originalPosts);
      return;
    }
    const filteredPosts = originalPosts.filter(
      (post) => post.post_type === tag
    );
    console.log(tag);
    setPosts(filteredPosts);
  };

  const searchPost = (formData) => {
    const { searchKeyword } = formData;
    const filteredPosts1 = originalPosts.filter((post) =>
      post.title.includes(searchKeyword)
    );
    const filteredPosts2 = originalPosts.filter((post) =>
      post.user_nickname.includes(searchKeyword)
    );
    const filteredPosts3 = originalPosts.filter((post) =>
      post.contents.includes(searchKeyword)
    );
    const filteredPosts = [
      ...filteredPosts1,
      ...filteredPosts2,
      ...filteredPosts3,
    ];
    setPosts(filteredPosts);
  };

  const pageList = () => {
    const pages = [];
    const first = (pageSection - 1) * postPerPage + 1;
    const last =
      pageSection * postPerPage < maxPage ? pageSection * postPerPage : maxPage;
    for (let i = first; i <= last; i++) {
      pages.push(<PageBox onClick={() => setPostPage(i)}>{i}</PageBox>);
    }
    return pages;
  };

  useEffect(() => {
    const count = posts.length;
    setPostsCount(count);
    setMaxPage(Math.ceil(count / postPerPage));
    setPostPage(1);
    console.log(count, maxPage);
  }, [posts]);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    setPageSection(Math.ceil(postPage / postPerPage));
  }, [postPage]);

  return (
    <>
      <ComWrapper>
        <TitleBox>게시판</TitleBox>
        <TagWrapper>
          <TagContainer>
            <TagName>태그</TagName>
            <TagBox onClick={() => handleTag("전체")}>전체</TagBox>
            <TagBox onClick={() => handleTag("자유")}>자유</TagBox>
            <TagBox onClick={() => handleTag("질문")}>질문</TagBox>
            <TagBox onClick={() => handleTag("후기")}>후기</TagBox>
            <TagBox onClick={() => handleTag("꿀팁")}>꿀팁</TagBox>
          </TagContainer>
          <TagContainer>
            <TagName>종목</TagName>
            <TagBox>서핑</TagBox>
            <TagBox>카약</TagBox>
            <TagBox>패들보드</TagBox>
            <TagBox>낚시</TagBox>
            <TagBox>크루즈</TagBox>
          </TagContainer>
        </TagWrapper>
        <PostWrapper>
          <PostBox>
            <PostDesc onClick={() => handleSort("thumbs")}>추천수</PostDesc>
            <PostDesc>태그</PostDesc>
            <PostDesc onClick={() => handleSort("comment_count")}>
              댓글수
            </PostDesc>
            <PostDesc onClick={() => handleSort("created_at")}>작성일</PostDesc>
            <PostDesc onClick={() => handleSort("views")}>조회수</PostDesc>
          </PostBox>
          {postList()}
        </PostWrapper>
        <WriteBox>
          <WriteButton>
            <Link to={`write`}>글쓰기</Link>
          </WriteButton>
        </WriteBox>
        <PageWrapper>
          {pageSection > 1 && (
            <>
              <PageBtn onClick={() => setPostPage(1)}>◀️◀️</PageBtn>
              <PageBtn
                onClick={() => setPostPage((pageSection - 2) * postPerPage + 1)}
              >
                ◀️
              </PageBtn>
            </>
          )}
          {pageList()}
          {pageSection < maxPage / postPerPage && (
            <>
              <PageBtn
                onClick={() => setPostPage(pageSection * postPerPage + 1)}
              >
                ▶️
              </PageBtn>
              <PageBtn onClick={() => setPostPage(maxPage)}>▶️▶️</PageBtn>
            </>
          )}
        </PageWrapper>
        <SearchForm onSubmit={handleSubmit(searchPost)}>
          <SearchBox type="text" id="search" {...register("searchKeyword")} />
          <SearchBtn>🔍</SearchBtn>
        </SearchForm>
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
