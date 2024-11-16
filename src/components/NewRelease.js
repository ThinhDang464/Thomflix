import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; //click link and react no refresh
import { TOKEN, IMAGE_BASE_URL } from "../config";

const NewRelease = (props) => {
  const [newMovies, setNewMovies] = useState([]);
  useEffect(() => {
    const fetchNewMovies = async () => {
      //Date data for sorting new release

      //current date in yyyy-mm-dd format
      //original output: 2024-11-16T13:45:30.123Z
      /* split the string into array at T character
      [
        "2024-11-16",        // index [0] - the date part
        "13:45:30.123Z"      // index [1] - the time part
        ]

      */
      const today = new Date().toISOString().split("T")[0];

      //set date 3 months ago as starting date for movie releases
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3); // 3 ms ago

      //set up start date
      const startDate = threeMonthsAgo.toISOString().split("T")[0];

      //set up api token and url
      const url =
        `https://api.themoviedb.org/3/discover/movie?` +
        `include_adult=false` +
        `&include_video=false` +
        `&language=en-US` +
        `&page=1` +
        `&sort_by=release_date.desc` + // Sort by release date, newest first
        `&with_watch_providers=337` + // Disney+ content
        `&watch_region=AU` +
        `&release_date.lte=${today}` + // Released before or on today
        `&release_date.gte=${startDate}`; // Released after 3 months ago
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
        setNewMovies(data.results.slice(0, 4)); //get first 4 movies for rec
      } catch (error) {
        console.error("Error fetching new movies");
      }
    };

    //call fetch slider func
    fetchNewMovies();
  }, []);
  return (
    <Container>
      <h4>New Releases</h4>
      <Content>
        {newMovies.map(
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
export default NewRelease;
