import styled from "styled-components";

const Login = (props) => {
  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="/images/cta-logo-one.svg" />
          <SignUp>GET ALL THERE</SignUp>
          <Description>
            Explore thousands of TV series, movies & originals, in stunning 4K
          </Description>
          <CTALogoTwo src="/images/logo-2.png" />
        </CTA>
        <BGIMG></BGIMG>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
`;

const BGIMG = styled.div`
  height: 100%;
  background-image: url("/images/login-background.jpg");
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
  animation: kenBurns 20s infinite ease-in-out;

  @keyframes kenBurns {
    //start of animation
    0% {
      transform: scale(1) translate(0);
    }
    //halfway point
    50% {
      //zoom in 10% + move left and up
      transform: scale(1.1) translate(-1%, -1%);
    }
    //end animation
    100% {
      transform: scale(1) translate(0);
    }
  }
`;

const CTA = styled.div`
  max-width: 650px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const CTALogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const CTALogoTwo = styled.img`
  margin-bottom: 20px;
  max-width: 600px;
  display: inline-block;
  width: 100%;
`;

const SignUp = styled.a`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: #0483ee;
    letter-spacing: 2.5px;
    filter: brightness(1.1);
  }
`;

const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 14px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;
export default Login;
