import React, { useEffect, useState } from "react";
import { moviesApi } from "api";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import { useSpring, animated } from "react-spring";
import { Helmet } from "react-helmet";
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

function Movie() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0.5 },
    config: { duration: 1000 },
  });

  const getMovie = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upComing },
      } = await moviesApi.upComing();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      setNowPlaying(nowPlaying);
      setUpComing(upComing);
      setPopular(popular);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Helmet>
        <title>Movie | MoTVGalaxy</title>
      </Helmet>
      <animated.div style={props}>
        <Image bgUrl={"/background.jpg"} />
        <Container>
          {nowPlaying?.length > 0 && (
            <Section title="Now Playing">
              {nowPlaying.map((movie) => (
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
          {upComing?.length > 0 && (
            <Section title="UpComing">
              {upComing.map((movie) => (
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
          {popular?.length > 0 && (
            <Section title="Popular">
              {popular.map((movie) => (
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
        </Container>
      </animated.div>
    </>
  );
}

export default Movie;
