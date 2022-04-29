import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";
import { useGetRecommendQuery } from "../services/recommends";
import DropDown from "./DropDown";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [hasText, setHasText] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [id, setId] = useState("");
  const debounced = useDebounce(keyword, 1000);
  const { data, isLoading } = useGetRecommendQuery(debounced, {
    skip: !debounced,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (keyword === "") {
      setHasText(false);
    }
  }, [keyword]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    value ? setHasText(true) : setHasText(false);
    setKeyword(value);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 40 && data?.hits.length - 1 > selected) {
      setSelected(selected + 1);
    }
    if (e.keyCode === 38 && selected >= 0) {
      setSelected(selected - 1);
    }
    if (e.code === "Enter" && selected >= 0) {
      setId(data.hits[selected].objectID);
    }
  };

  useEffect(() => {
    navigate(`/${id}`);
  }, [id]);

  return (
    <Wrapper>
      <Container>
        <Title>Hacker News</Title>
        <SearchForm>
          <SearchBar>
            <InputBox
              type="text"
              onChange={handleInputChange}
              onKeyDown={handleKeyUp}
              value={keyword}
            />
            <SearchIcon />
            <SearchBtn>검색</SearchBtn>
          </SearchBar>
        </SearchForm>
        {hasText && (
          <DropDown
            isLoading={isLoading}
            datas={data?.hits.length > 7 ? data?.hits.slice(0, 7) : data?.hits}
            selected={selected}
            setID={setId}
            ID={id}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default SearchBox;

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
  margin-bottom: 20px;
  text-align: center;
`;
const SearchForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin-top: 40px;
  @media screen and (max-width: 820px) {
    width: 95%;
  }
`;
const SearchBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const InputBox = styled.input`
  border-radius: 42px 0 0 42px;
  width: 80%;
  height: 100%;
  font-size: 16px;
  border-width: 0;
  padding: 0 36px;
  box-shadow: 0px 2px 2px rgb(30 32 37 / 10%);
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 820px) {
    width: 100%;
    border-radius: 42px;
  }
`;
const SearchBtn = styled.button`
  border-width: 0;
  border-radius: 0 42px 42px 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.018em;
  padding: 0 32px;
  height: 100%;
  width: 100px;
  box-shadow: 0px 2px 2px rgb(30 32 37 / 10%);
  background-color: lightgray;
  color: #ffffff;
  cursor: pointer;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;
const SearchIcon = styled(FaSearch)`
  color: lightgray;
  position: absolute;
  cursor: pointer;
  @media screen and (min-width: 820px) {
    left: 12px;
  }
  @media screen and (max-width: 820px) {
    right: 12px;
  }
`;
