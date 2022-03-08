import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import { sliderItems } from "../../data";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ height: "60vh" })}
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  opacity: 0.6;
  z-index: 2;
  ${mobile({ background: "none" })}
`;

const Wrapper = styled.div`
  height: 100px;
  display: flex;
  transform: translateX(${(props) => props.slideIndex}vw);
  transition: all 1.5s ease;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bgColor};
  ${mobile({ height: "60vh" })}
`;

const ImgContainer = styled.div`
  margin-top: 60px;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 10px;
  ${mobile({ height: "60%", margin: "0px" })};
`;
const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
  ${mobile({ fontSize: "25px" })}
`;
const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({ fontSize: "10px" })}
`;
const Button = styled.button`
  font-size: 20px;
  background-color: transparent;
  padding: 10px;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const onClickHandler = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex !== 0 ? slideIndex + 100 : -200);
    } else if (direction === "right") {
      setSlideIndex(slideIndex !== -200 ? slideIndex - 100 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => onClickHandler("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bgColor={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link to="/products">
                <Button>SHOP NOW</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => onClickHandler("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
