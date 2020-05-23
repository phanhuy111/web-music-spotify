import styled from "styled-components";

import { Spinner } from "~/components/Loading/styles";
import { Link } from "react-router-dom";

export const Container = styled.div`
  margin-top: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-image: url("https://c.stocksy.com/a/h99200/z9/511853.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-top: 10px;
`;

export const ContainerAuth = styled.div`
  margin-top: 30px;
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 10px ${Spinner} {
    height: 24px;
  }
`;

export const List = styled.div`
  margin-top: 20px;
  display: flex;
`;

export const Playlist = styled(Link)`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 250px;
  text-decoration: none;

  img {
    height: 250px;
  }

  strong {
    font-size: 13px;
    margin-top: 10px;
    color: #fff;
  }

  p {
    line-height: 22px;
    margin-top: 5px;
    font-size: 13px;
    color: #b3b3b3;
  }

  &:hover img {
    opacity: 0.4;
  }

  &:first-child {
    margin: 0;
  }
`;
