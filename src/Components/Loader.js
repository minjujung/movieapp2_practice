import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Load = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  z-index: 1;
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

const Loader = () => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0.5 },
    config: { duration: 1000 },
  });
  return (
    <>
      <animated.div style={props}>
        <Image bgUrl={"/background.jpg"} />
      </animated.div>
      <Load>Loading...</Load>
    </>
  );
};

export default Loader;
