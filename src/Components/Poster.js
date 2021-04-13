import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  font-size: 12px;
  z-index: 2;
  position: relative;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 200px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s ease-in-out linear;
`;

const Rating = styled.span`
  bottom: 5px;
  right: 5px;
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s ease-in-out linear;
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Poster = ({ id, title, imageUrl, rating, year, isMovie = false }) => {
  return (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <Container>
        <ImageContainer>
          <Image
            bgUrl={
              imageUrl
                ? `https://image.tmdb.org/t/p/w300${imageUrl}`
                : "/noImage.jpg"
            }
          />
          <Rating>
            <span role="img" aria-label="rating">
              ⭐
            </span>{" "}
            {rating}/10
          </Rating>
        </ImageContainer>
        <Title>
          {title?.length > 18 ? `${title.substring(0, 18)}...` : title}
        </Title>
        <Year>{year}</Year>
      </Container>
    </Link>
  );
};

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default Poster;
