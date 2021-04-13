import { moviesApi, tvApi } from "api";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Helmet } from "react-helmet";
import Section from "Components/Section";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

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

const Title = styled.h1`
  font-size: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

function Home() {
  const [loading, setLoading] = useState(true);
  const [topMovie, setTopMovie] = useState(null);
  const [latestShow, setLatestShow] = useState(null);

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0.5 },
    config: { duration: 1000 },
  });
  const getHome = async () => {
    try {
      const {
        data: { results: topMovie },
      } = await moviesApi.topRated();
      const {
        data: { results: latestShow },
      } = await tvApi.onTheAir();
      setTopMovie(topMovie);
      setLatestShow(latestShow);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHome();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | MoTVGalaxy</title>
      </Helmet>
      <animated.div style={props}>
        <Title>Welcome to MoTV Galaxy</Title>
        <Image bgUrl={"/background.jpg"} />
        <Container>
          {topMovie?.length > 0 && (
            <Section title="Top Movies">
              {topMovie.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  year={movie.release_date?.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {latestShow?.length > 0 && (
            <Section title="On Air Shows">
              {latestShow.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.original_name}
                  imageUrl={show.poster_path}
                  rating={show.vote_average}
                  year={show.first_air_date?.substring(0, 4)}
                />
              ))}
            </Section>
          )}
        </Container>
      </animated.div>
    </>
  );
}
export default Home;
