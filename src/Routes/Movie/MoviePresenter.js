import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";

const Container = styled.div`
     padding: 0 10px;
`;

const MoviePresenter = ({ nowPlaying, upComing, popular, error, loading }) => {
     return (
          loading ? <Loader /> : (
               <Container>
                    {nowPlaying && nowPlaying.length > 0 && (
                         <Section title = "Now Playing">
                              {nowPlaying.map(movie => movie.title)}
                         </Section>
                    )}
                    {upComing && upComing.length > 0 && (
                         <Section title = "Upcoming">
                              {upComing.map(movie => movie.title)}
                         </Section>
                    )}
                    {popular && popular.length > 0 && (
                         <Section title = "Popular">
                              {popular.map(movie => movie.title)}
                         </Section>
                    )}
               </Container>
          )
          
     );
}
    
MoviePresenter.propTypes = {
     nowPlaying: PropTypes.array,
     upComing: PropTypes.array,
     popular: PropTypes.array,
     error: PropTypes.string,
     loading: PropTypes.bool.isRequired
}

export default MoviePresenter;