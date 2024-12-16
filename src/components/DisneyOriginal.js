import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TOKEN, IMAGE_BASE_URL } from "../config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const DisneyOriginal = (props) => {
  const [disMovies, setDisMovies] = useState([]);

  useEffect(() => {
    const fetchDisMovies = async () => {
      const url =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=AU&with_companies=2&with_watch_providers=337";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: TOKEN,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setDisMovies(data.results.slice(0, 15)); // Get 15 movies for sliding
      } catch (error) {
        console.error("Error fetching Disney movies");
      }
    };

    fetchDisMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <h4>Disney Specials</h4>
      <StyledSlider {...settings}>
        {disMovies.map((movie) => (
          <Wrap key={movie.id}>
            <Link to={`/detail/${movie.id}`}>
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
          </Wrap>
        ))}
      </StyledSlider>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: visible;
  }

  .slick-slide > div {
    margin: 0 10px;
  }

  .slick-prev,
  .slick-next {
    z-index: 10;
    width: 44px;
    height: 44px;
    &:before {
      font-size: 24px;
    }
  }

  .slick-prev {
    left: -50px;
  }

  .slick-next {
    right: -50px;
  }
`;

const Wrap = styled.div`
  padding-top: 150%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default DisneyOriginal;
