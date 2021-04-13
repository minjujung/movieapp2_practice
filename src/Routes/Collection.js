import { useEffect, useState } from "react";
import { collectionApi } from "api";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "Components/Loader";

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  opacity: 0.8;
`;

const Container = styled.div`
  margin-top: 30px;
  height: 80%;
  width: 80%;
  padding: 30px;
  border: solid 2px white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
`;

const Title = styled.div`
  position: fixed;
  transition: top 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  font-size: 40px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  z-index: 2;
`;

const Cover = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  row-gap: 40px;
  padding-top: 100px;
  justify-items: center;
  align-items: center;
  z-index: 1;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 5px;
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

const SLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-align: center;
  &:hover {
    opacity: 0.7;
  }
  h4 {
    align-self: center;
    margin: 20px 0;
    font-size: 20px;
  }
  img {
    width: 250px;
    height: 320px;
    border-radius: 5px;
  }
`;

function Collection(props) {
  let [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    match: {
      params: { id },
    },
    history: { goBack },
  } = props;
  const parseId = parseInt(id);

  const getCollection = async () => {
    if (isNaN(parseId)) {
      return goBack();
    }
    let result = null;
    try {
      ({ data: result } = await collectionApi.collection(parseId));
    } catch (e) {
      console.log(e);
    } finally {
      setResult(result);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return loading ? (
    <>
      <Helmet>
        <title>Loading | MovieApp2</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      <Image bgUrl={"/background.jpg"} />
      <Container>
        <Helmet>
          <title>{result.name ? result.name + " |" : ""} MovieApp2</title>
        </Helmet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <Title>{result.name && `${result.name}`}</Title>
          <Cover>
            {result.parts &&
              result.parts.map((part) =>
                part.poster_path ? (
                  <SLink to={`/movie/${part.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${part.poster_path}`}
                    />
                    <h4>
                      {part.original_title.length > 20
                        ? `${part.original_title.substring(0, 20)}...`
                        : `${part.original_title}`}
                    </h4>
                  </SLink>
                ) : (
                  ""
                )
              )}
          </Cover>
        </Content>
      </Container>
    </>
  );
}

export default Collection;
