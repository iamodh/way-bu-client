import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { client } from "../../../libs/supabase";
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useState, useEffect, useRef } from "react";
import React from "react";
import {
  ComWrapper,
  TitleBox,
  TagWrapper,
  TagContainer,
  TagName,
  TagBox,
  TagTitle,
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
  DropdownBox,
  DropdownComponent,
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
  const [postTag, setPostTag] = useState("전체");
  const [postSport, setPostSport] = useState("전체");
  const [sportsList, setSportsList] = useState([]);

  const getPosts = async () => {
    let { data: posts, error } = await client
      .from("POST")
      .select(
        "post_id, title, contents, post_type, user_nickname, user_id, views, thumbs, comment_count, created_at, updated_at, sport"
      );
    console.log(posts);
    posts.sort((a, b) => {
      return b["created_at"] > a["created_at"] ? 1 : -1;
    });
    setOriginalPosts(posts);
    setPosts(posts);
  };

  const getSports = async () => {
    let { data: sports, error } = await client
      .from("SPORT")
      .select("title, theme_color, id");
    if (error) {
      console.error("Error fetching sports:", error);
      return;
    }
    sports.sort((a, b) => a.id - b.id);
    setSportsList(sports);
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

  const themeFrontColors = {
    red: "var(--color-tag-red-front)",
    orange: "var(--color-tag-orange-front)",
    mint: "var(--color-tag-mint-front)",
    green: "var(--color-tag-green-front)",
  };

  // const themeBackColors = {
  //   red: "var(--color-tag-red-back)",
  //   orange: "var(--color-tag-orange-back)",
  //   mint: "var(--color-tag-mint-back)",
  //   green: "var(--color-tag-green-back)",
  // };

  const PostList = () => {
    return posts
      .slice((postPage - 1) * postPerPage, postPage * postPerPage - 1)
      .map((post) => {
        const sport = sportsList.find((sport) => sport.title === post.sport);
        // const backgroundColor = sport
        //   ? themeBackColors[sport.theme_color]
        //   : "#FFFFFF";
        const color = sport ? themeFrontColors[sport.theme_color] : "#000000";
        return (
          <PostBox key={post.post_id}>
            <PostThumb>{post.thumbs}</PostThumb>
            <PostTag>{post.post_type}</PostTag>
            <PostTag style={{ color, borderColor: color }}>
              {post.sport}
            </PostTag>
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

  const handleTag = (tag, sport) => {
    let filteredPosts = originalPosts;
    if (tag === "전체" && sport === "전체") {
    } else if (tag === "전체") {
      filteredPosts = originalPosts.filter((post) => post.sport === sport);
    } else if (sport === "전체") {
      filteredPosts = originalPosts.filter((post) => post.post_type === tag);
    } else {
      filteredPosts = originalPosts.filter(
        (post) => post.post_type === tag && post.sport === sport
      );
    }
    return setPosts(filteredPosts);
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

  const DropdownList = ({ title, items, selectedItem, setSelectedItem }) => {
    const dropdownRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const handleItemClick = (item) => {
      setSelectedItem(item);
      setIsVisible(false);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsVisible(false); // 화면 다른 부분 클릭 시 드롭다운 숨기기
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div ref={dropdownRef}>
        <TagTitle onClick={() => setIsVisible(!isVisible)}>
          {selectedItem === "전체" ? title : selectedItem}
        </TagTitle>
        {isVisible && (
          <DropdownBox ref={dropdownRef}>
            {items.map((item) => (
              <DropdownComponent
                key={item}
                selected={selectedItem === item}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </DropdownComponent>
            ))}
          </DropdownBox>
        )}
      </div>
    );
  };

  const DropDownTagList = () => {
    const tags = ["전체", "자유", "질문", "후기", "꿀팁"];
    return (
      <DropdownList
        title="태그"
        items={tags}
        selectedItem={postTag}
        setSelectedItem={setPostTag}
      />
    );
  };

  const DropDownSportsList = () => {
    const sports = sportsList.map((sport) => {
      return sport.title;
    });

    return (
      <DropdownList
        title="종목"
        items={sports}
        selectedItem={postSport}
        setSelectedItem={setPostSport}
      />
    );
  };

  const TagList = () => {
    const tags = ["전체", "자유", "질문", "후기", "꿀팁"];
    const sports = sportsList.map((sport) => {
      return sport.title;
    });

    return (
      <TagWrapper>
        <TagContainer>
          <TagName>태그</TagName>
          {tags.map((tag) => {
            return (
              <TagBox
                key={tag}
                selected={postTag === tag}
                onClick={() => setPostTag(tag)}
              >
                {tag}
              </TagBox>
            );
          })}
        </TagContainer>
        <TagContainer>
          <TagName>종목</TagName>
          <TagBox
            selected={postSport === "전체"}
            onClick={() => setPostSport("전체")}
          >
            전체
          </TagBox>
          {sports.map((sport) => {
            return (
              <TagBox
                key={sport}
                selected={postSport === sport}
                onClick={() => setPostSport(sport)}
              >
                {sport}
              </TagBox>
            );
          })}
        </TagContainer>
      </TagWrapper>
    );
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
    getSports();
  }, []);

  useEffect(() => {
    setPageSection(Math.ceil(postPage / postPerPage));
  }, [postPage]);

  useEffect(() => {
    handleTag(postTag, postSport);
  }, [postTag, postSport]);

  return (
    <>
      <ComWrapper>
        <TagList />
        <PostWrapper>
          <PostBox>
            <PostDesc onClick={() => handleSort("thumbs")}>추천수</PostDesc>
            <PostDesc>
              <DropDownTagList />
            </PostDesc>
            <PostDesc>
              <DropDownSportsList />
            </PostDesc>
            <PostDesc onClick={() => handleSort("comment_count")}>
              댓글수
            </PostDesc>
            <PostDesc onClick={() => handleSort("created_at")}>작성일</PostDesc>
            <PostDesc onClick={() => handleSort("views")}>조회수</PostDesc>
          </PostBox>
          {PostList()}
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
