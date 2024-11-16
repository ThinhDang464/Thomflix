import styled from "styled-components";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { TOKEN, IMAGE_BASE_URL } from "../config";

const ImageSlider = (props) => {
  //react state for movies
  const [sliderMovies, setSliderMovies] = useState([]); //array of movies on the slider object
  useEffect(() => {
    const fetchSliderMovies = async () => {
      //set up api token and url
      const url =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&watch_region=AU&with_watch_providers=337";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: TOKEN,
        },
      };

      //interact api
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setSliderMovies(data.results.slice(0, 7)); //get first 4 movies for slider
      } catch (error) {
        console.error("Error fetching slider movies");
      }
    };

    //call fetch slider func
    fetchSliderMovies();
  }, []);

  //slick carousel slider settings api - check documentation for specific styling
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
  };
  return (
    <Carousel {...settings}>
      {sliderMovies.map(
        (
          movie //auutomatic return Wrap element no need return key w
        ) => (
          <Wrap key={movie.id}>
            <ImageContainer>
              <img
                src={`${IMAGE_BASE_URL}${movie.backdrop_path}`} //template literal
                alt={movie.title}
              />
            </ImageContainer>
          </Wrap>
        )
      )}
    </Carousel>
  );
};

//ccreating carousel comp from slider comp
const Carousel = styled(Slider)`
  margin-top: 20px;
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;

  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: visible;
  }

  .slick-prev {
    left: -400px;
    &:before {
      font-size: 50px; // Make arrows more visible
    }
  }

  .slick-next {
    right: -400px;
    &:before {
      font-size: 50px; // Make arrows more visible
    }
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  padding-top: 56.25%; // Creates 16:9 aspect ratio
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  padding: 4px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  &:hover {
    padding: 0;
    border: 4px solid rgba(249, 249, 249, 0.8);
    transition-duration: 50ms;
  }
`;

export default ImageSlider;
