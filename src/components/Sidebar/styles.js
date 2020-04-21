import styled from "styled-components";

import { Spinner } from "../Loading/styles";

export const Container = styled.aside`
  height: 100%;
  width: 200px;
  background: #121212;
  color: #b3b3b3;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div {
    padding: 25px;
  }
`;

export const Nav = styled.ul`
  list-style: none;
  margin-top: 25px;

  &:first-child {
    margin: 0;
  }

  li {
    display: flex;
    align-items: center;

    a {
      color: inherit;
      text-decoration: none;
      font-size: 13px;
      line-height: 32px;
      font-weight: ${props => (props.main ? "bold" : "normal")};

      &:hover {
        color: #fff;
      }
    }

    span {
      font-size: 11px;
      text-transform: uppercase;
      line-height: 22px;
      letter-spacing: 1.11px;
      font-weight: 300;
    }

    ${Spinner} {
      height: 15px;
      margin-left: 5px;
    }
  }
`;

export const InputSearch = styled.input`
  background: #393939;
  border:0;
  border-radius:20px;
  padding:5px;
  color:white;
  width:150px;
`;

export const NewPlayList = styled.button`
  background: transparent;
  border: 0;
  border-top: 1px solid #282828;
  font-size: 13px;
  color: #b3b3b3;
  display: flex;
  align-items: center;
  padding: 15px 25px;

  &:hover {
    color: #fff;
  }

  img {
    margin-right: 10px;
  }
`;

export const Modal = styled.div`
    font-size: 12px;
    display: grid;
    background-color: #181818;

   input{
    padding: 5px;
    margin: 5px;
    border: none;
    border-radius: 4px;
    width: 260px;
   }
   button{
    border: none;
    width: 80px;
    height: 27px;
    text-align: center;
    border-radius: 4px;
    margin: 5px;
   }

   h1{
    display: flex;
    color: white;
    margin: 5px;
   }
`;

// .modal > .header {
//   width: 100%;
//   border-bottom: 1px solid gray;
//   font-size: 18px;
//   text-align: center;
//   padding: 5px;
// }
// .modal > .content {
//   width: 100%;
//   padding: 10px 5px;
// }
// .modal > .actions {
//   margin: auto;
// }
// .modal > .actions {
//   width: 100%;
//   padding: 10px 5px;
//   text-align: center;
// }
// .modal > .close {
//   cursor: pointer;
//   position: absolute;
//   display: block;
//   padding: 2px 5px;
//   line-height: 20px;
//   right: -10px;
//   top: -10px;
//   font-size: 24px;
//   background: #ffffff;
//   border-radius: 18px;
//   border: 1px solid #cfcece;
// }


