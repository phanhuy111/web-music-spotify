import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 30px;
  display: flex;
`;

export const Header = styled.header`
  display: inline-block;
  align-items: center;

  img {
    width: 340px;
    height: 300px;
  }

  div {
    text-align: center;

    span {
      font-size: 11px;
      letter-spacing: 1.11px;
      font-weight: 300;
    }

    h1 {
      margin-top: 10px;
      font-size: 30px;
    }

    h3 {
      margin-top: 0px;
      font-size: 15px;
      color: #676767; 
    }

    p {
      margin-top: 0;
      color: #b3b3b3;
      font-size: 11px;
      letter-spacing: 1.11px;
      text-transform: uppercase;
    }

    button {
      background: #1db854;
      height: 32px;
      border-radius: 16px;
      color: #fff;
      line-height: 32px;
      padding: 0 35px;
      border: 0;
      margin-top: 20px;
      font-size: 12px;
      letter-spacing: 1.11px;
    }
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


