import styled from "styled-components";

import SearchIcon from "../../assets/images/search.svg";

export const Container = styled.header `
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 0;
  // background: ${props => (props.imgHeader ? "url('https://hoigicungbiet.com/wp-content/uploads/2018/10/EDM-l%C3%A0-g%C3%AC-T%C3%ACm-hi%E1%BB%83u-v%E1%BB%81-d%C3%B2ng-nh%E1%BA%A1c-EDM-v%C3%A0-EDM-trong-marketing.jpg')" : "")};
`;

export const Search = styled.div `
  display: flex;
  align-items: center;
  border-radius: 12px;
  height: 24px;
  width: 175px;
  padding: 6px 7px 6px 26px;
  background: #fff url(${SearchIcon}) no-repeat 7px center;

  input {
    flex: 1;
    font-size: 13px;
    color: #121212;
    border: 0;
  }
`;

export const User = styled.div `
  display: flex;
  align-items: center;
  font-size: 13px;

  img {
    width: 27px;
    height: 27px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

export const ButtonSpan = styled.span`
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px 10px;
    cursor: pointer
`

export const Text = styled.h1`
    color: white;
    padding: 0px 20px;
    font-size: 15px;
    font-weight: 400;
`