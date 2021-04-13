import React, { useEffect, useState } from "react";
import { tvApi } from "api";
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

function TV() {
  const [airingToday, setAiringToday] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0.5 },
    config: { duration: 1000 },
  });

  const getTV = async () => {
    try {
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      setAiringToday(airingToday);
      setTopRated(topRated);
      setPopular(popular);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTV();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Helmet>
        <title>show | MoTVGalaxy</title>
      </Helmet>
      <animated.div style={props}>
        <Image bgUrl={"/background.jpg"} />
        <Container>
          {airingToday?.length > 0 && (
            <Section title="Now Playing">
              {airingToday.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.original_name}
                  imageUrl={show.poster_path}
                  rating={show.vote_average}
                  year={show.first_air_date?.substring(0, 4)}
                  isshow={true}
                />
              ))}
            </Section>
          )}
          {topRated?.length > 0 && (
            <Section title="UpComing">
              {topRated.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.original_name}
                  imageUrl={show.poster_path}
                  rating={show.vote_average}
                  year={show.first_air_date?.substring(0, 4)}
                  isshow={true}
                />
              ))}
            </Section>
          )}
          {popular?.length > 0 && (
            <Section title="Popular">
              {popular.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.original_name}
                  imageUrl={show.poster_path}
                  rating={show.vote_average}
                  year={show.first_air_date?.substring(0, 4)}
                  isshow={true}
                />
              ))}
            </Section>
          )}
        </Container>
      </animated.div>
    </>
  );
}

export default TV;
