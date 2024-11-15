import styled from "styled-components";
const Header = (props) => {
  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt=""></img>
      </Logo>
      <NavMenu>
        <a href="/home">
          <img src="/images/home-icon.svg" alt="home" />
          <span>HOME</span>
        </a>

        <a href="/search">
          <img src="/images/search-icon.svg" alt="search" />
          <span>SEARCH</span>
        </a>

        <a href="/originals">
          <img src="/images/original-icon.svg" alt="originals" />
          <span>ORIGINALS</span>
        </a>

        <a href="/series">
          <img src="/images/series-icon.svg" alt="series" />
          <span>SERIES</span>
        </a>

        <a href="/movies">
          <img src="/images/movie-icon.svg" alt="movies" />
          <span>MOVIES</span>
        </a>

        <a href="/watchlist">
          <img src="/images/watchlist-icon.svg" alt="watchlist" />
          <span>WATCHLIST</span>
        </a>
      </NavMenu>
      <Login>Login</Login>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed; //stay
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between; //2 items has space between
  align-items: center; //center verti
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  width: 80px; //no need height image scale proportionally
  padding: 0;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap; //items in a single row
  height: 100;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto; //move to right close to logo
  margin-left: 25px; //distance from logo

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      //show the img with height
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
      margin-right: 5px;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap; //text content stay on one line
      position: relative;
      margin-top: 2px;

      //undeline animation
      //position needs to be absolute
      &:before {
        //pseudo element creates before the span text
        //creates invisible line under text
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px; //6px below the text
        content: ""; //need for the pseudo element
        height: 2px; //line thickness
        left: 0px;
        opacity: 1;
        position: absolute;
        right: 0px; //mean stick to the right edge of parent
        transform-origin: left center; //starting point on the left
        transform: scaleX(0); //shrinks width to 0
        transition: transform 0.3s ease-out; //smooth change
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1); //100% width
      }
    }
  }

  @media only screen and (max-width: 768px) {
    display: none; //small screen no show
  }
`;

const Login = styled.a`
  background-color: black;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid white;
  border-radius: 5px;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;

export default Header;
