import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  margin-top: 60px;
  display: flex;
  flex-direction: row;

  img{
    width: auto;
    height: auto; 
  }

  button {
    cursor: pointer;
    margin: 15px;
    padding: 6px 40px;
    background: #1db954;
    font-size: 20px;
    border: transparent;
    border-radius: 16px;
    color: white;     
  }

  h1{
    font-size:20px
  }

`;

export const SongList = styled.div`
      width: 100%;
      text-align: left;
      margin-top: 20px;
      display: flex;
      flex-direction: column

      div{
        margin-left:60px
      }

      h1{
        font-size: 16px;
        font-weight: 200;
      }

      h2{
        margin-top:5px;
        font-size:12px
      }
`;