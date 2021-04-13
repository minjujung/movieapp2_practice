import React, { useState } from "react";
import { moviesApi, tvApi } from "api";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Poster from "Components/Poster";
import Message from "Components/Message";
import { Helmet } from "react-helmet";
import { useSpring, animated } from "react-spring";

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

// 'form' intercept the event of the 'submit'
const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

function Search() {
  const [movies, setMovies] = useState(null);
  const [shows, setShows] = useState(null);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0.5 },
    config: { duration: 1000 },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (term !== "") {
      searchByTerm();
    }
  };

  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setTerm(value);
  };

  const searchByTerm = async () => {
    setLoading(true);
    try {
      const {
        data: { results: movies },
      } = await moviesApi.search(term);
      const {
        data: { results: shows },
      } = await tvApi.search(term);
      setMovies(movies);
      setShows(shows);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <animated.div style={props}>
      <Image bgUrl={"/background.jpg"} />
      <Container>
        <Helmet>
          <title>Search | MoTVGalaxy</title>
        </Helmet>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Search Movies or TV Shows..."
            value={term}
            onChange={updateTerm}
          />
        </Form>
        {loading ? (
          <Loader />
        ) : (
          <>
            {movies?.length > 0 && (
              <Section title="Movie Results">
                {movies.map((movie) => (
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
            {shows?.length > 0 && (
              <Section title="TV Show Results">
                {shows.map((show) => (
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
            {movies?.length === 0 && shows?.length === 0 && (
              <Message color="#95afc0" text="Nothing Found!!" />
            )}
          </>
        )}
      </Container>
    </animated.div>
  );
}

export default Search;
