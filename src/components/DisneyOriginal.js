import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; //click link and react no refresh
import { TOKEN, IMAGE_BASE_URL } from "../config";

const DisneyOriginal = (props) => {
  const [disMovies, setDisMovies] = useState([]);
  useEffect(() => {
    const fetchDisMovies = async () => {
      //set up api token and url
      const url =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=AU&with_companies=2&with_watch_providers=337";
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
        setDisMovies(data.results.slice(0, 4)); //get first 4 movies for rec
      } catch (error) {
        console.error("Error fetching slider movies");
      }
    };

    //call fetch func
    fetchDisMovies();
  }, []);
  return (
    <Container>
      <h4>Disney Specials</h4>
      <Content>
        {disMovies.map(
          (
            movie //auutomatic return Wrap element no need return key word
          ) => (
            <Wrap key={movie.id}>
              <Link>
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`} //template literal
                  alt={movie.title}
                />
              </Link>
            </Wrap>
          )
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
`;
const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr)); //2 columns in mobile only
  }
`;

const Wrap = styled.div`
  padding-top: 150%; //aspect ratio, 100 for square and 56.25 for landscape, use to create aspect ratio
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
