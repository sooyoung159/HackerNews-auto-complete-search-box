import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Searched = () => {
  const objectId = useParams();
  console.log(objectId.id);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    useCallback(() => {
      fetch(`http://hn.algolia.com/api/v1/items/${objectId.id}`)
        .then(async (res) => {
          const newData = await res.json();
          setData(newData);
          setIsLoading(true);
          console.log(newData);
        })
        .catch((err) => console.log(err));
    }),
    []
  );

  return (
    <Wrapper>
      <Container>
        <Title>
          <Link to="/" style={{ textDecoration: "none", color: "lightgray" }}>
            Hacker News
          </Link>
        </Title>
        <DisplayBox>
          {!isLoading ? (
            <Loader />
          ) : (
            <div>
              <div>
                Title : <a href={data.url}>{data.title}</a>
              </div>
              <div>Author : {data.author}</div>
              <div>Points : {data.points}</div>
              <CommentsBox>Comments</CommentsBox>
              <Suggest>
                {data.children
                  ?.filter((child, idx) => idx < 3)
                  .map((obj, index) => (
                    <List key={obj.id}>
                      <div>{parse(obj.text.split("</p>")[0])}</div>
                    </List>
                  ))}
              </Suggest>
            </div>
          )}
        </DisplayBox>
      </Container>
    </Wrapper>
  );
};

export default Searched;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #404140;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 1040px;
  width: 100%;
  height: 50vh;
  margin: 0 auto;
`;

const Title = styled.div`
  color: lightgray;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 0.6;
  margin-bottom: 50px;
  text-align: center;
  > Link {
    text-decoration: none;
  }
`;

const DisplayBox = styled.div`
  width: 60%;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  @media screen and (max-width: 820px) {
    width: 90%;
  }
`;

const CommentsBox = styled.div`
  margin-top: 1rem;
`;

const Suggest = styled.ul`
  width: 95%;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 20px;
  padding-left: 0px;
  padding-bottom: 10px;
  list-style: none;
  /* list-style-position: inside; */
`;

const List = styled.li`
  position: relative;

  align-items: center;
  /* padding-top: 1rem; */
  padding-left: 1rem;
  &:hover {
    background-color: rgba(230, 230, 230, 0.6);
  }
  &.selected {
    background-color: rgba(230, 230, 230, 0.6);
  }
`;
