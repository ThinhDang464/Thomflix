import styled from "styled-components";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
//dispatch action to our store, selector retrieve stuff from store
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
//selector we created need import from userSlice
import {
  selectUserName,
  selectUserEmail,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const userEmail = useSelector(selectUserEmail);

  //react hook useeffect
  //useEffect is like setting up an automatic watcher that runs code:
  //When the component first appears (mounts)
  //When specific things (dependencies) change
  useEffect(() => {
    //listener on auth state change - firebase built in
    auth.onAuthStateChanged(async (user) => {
      //user arg is provided by firebase when we log in with the response user object
      if (user) {
        //if user null -> not redirect
        setUser(user); //needed for continous auth state monitoring when user change

        navigate("/home");
      }
    });
  }, [userName]); //this function only runs when variable username is updated

  //Handle authentication
  const handleAuth = async () => {
    if (!userName) {
      //pop up sign in
      try {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        setUser(result.user);
      } catch (error) {
        alert(error.message);
      }
    } else if (userName) {
      // Sign Out logic
      try {
        await auth.signOut(); // Firebase sign out
        dispatch(setSignOutState()); // Reset Redux state
        navigate("/"); // Go back to login page
      } catch (error) {
        alert(error.message);
      }
    }
  };

  //setUser function
  //take in user, and dispatch user login details
  const setUser = (user) => {
    dispatch(
      //all of props coming from the response/result can be viewed in console
      //dispatch to rediux store
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };
  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt=""></img>
      </Logo>
      {
        //conditional redenring logged in
        !userName ? (
          <Login onClick={handleAuth}>Login</Login>
        ) : (
          <>
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
            <SignOut>
              <UserImg src={userPhoto} alt={userEmail} />
              <DropDown>
                <span onClick={handleAuth}> Sign Out</span>
              </DropDown>
            </SignOut>
          </>
        )
      }
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

      //underline animation
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

const UserImg = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover; // Ensure image covers circle proper -> no stretch
  border: 2px solid transparent; // For hover effect, invisible border
  transition: all 0.3s ease; //all changes smooth
`;

const DropDown = styled.div`
  position: absolute; // Position relative to SignOut div
  top: 50px; // 50px down from top of SignOut
  right: 0; // Align to right edge
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  padding: 10px;
  font-size: 13px;
  letter-spacing: 1.5px;
  width: 110px; //width of dropdown
  opacity: 0; // Hidden by default
  visibility: hidden; // Better than just opacity for accessibility
  transform: translateY(-20px); // Slight upward shift for animation
  transition: all 0.3s ease; // Smooth transition for all properties

  span {
    display: block;
    width: 100%;
    padding: 5px 10px;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1); // Subtle hover effect
      border-radius: 2px;
    }
  }

  // Triangle pointer at top
  &:before {
    content: "";
    position: absolute;
    top: -10px; // Position above dropdown
    right: 10px; // Align with user image
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent rgb(19, 19, 19) transparent;
  }
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  // UserImg styling moved inside
  img {
    // Instead of separate UserImg component
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  // Hover effects
  &:hover {
    img {
      // Changed from ${UserImg} to img
      border-color: rgba(255, 255, 255, 0.8);
      transform: scale(1.05);
    }

    ${DropDown} {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
`;

export default Header;
