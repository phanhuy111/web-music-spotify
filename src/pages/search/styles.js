import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  margin-top: 40px;
  display: block;
  flex-direction: row;
`;

export const InputSearch = styled.input`
  background: #393939;
  border: 0;
  border-radius: 20px;
  padding: 5px;
  color: white;
  width: 150px;
  height: 32px;
`;

export const SongList = styled.div`
  width: 100%;
  text-align: left;
  margin-top: 20px;
  display: flex;
  flex-direction: column div {
    margin-left: 60px;
  }

  h1 {
    font-size: 16px;
    font-weight: 200;
  }

  h2 {
    margin-top: 5px;
    font-size: 12px;
  }
`;
