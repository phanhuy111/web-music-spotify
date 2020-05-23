import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  margin-top: 60px;
  // display: flex;
  flex-direction: column;
  display: -webkit-inline-box;

  div {
    padding: 25px;
  }

  h1 {
    font-size: 10px;
    color: white;
    text-align: center;
  }

  img {
    width: 150px;
    height: 150px;
    margin: 10px;
  }
`;
