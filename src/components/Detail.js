import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TOKEN, IMAGE_BASE_URL } from "../config";

const Detail = (props) => {
  const { id } = useParams(); //Get movie id from url
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      // Detailed API call including images
      const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=images,videos`;
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

        // Find English logo if available
        //find() searches array and return first element matches condition
        // logo => logo.iso_639_1 === "en" is callback function that:
        //   - Takes each logo object as parameter
        //   - Checks if language code (iso_639_1) is "en" (English)
        //   - Returns true when it finds English logo
        const englishLogo = data.images.logos.find(
          (logo) => logo.iso_639_1 === "en"
        );

        //update movies state with details and logo
        //spread operator copies all props from data
        // If englishLogo exists, use its file_path
        // If no English logo found, set logoPath to null
        setMovieDetails({
          ...data,
          logoPath: englishLogo ? englishLogo.file_path : null,
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);
  return (
    <Container>
      {/* Background Image */}
      <Background>
        <img src={`${IMAGE_BASE_URL}${movieDetails?.backdrop_path}`} alt="" />
      </Background>

      {/* Movie Logo */}
      {movieDetails?.logoPath && (
        <ImageTitle>
          <img src={`${IMAGE_BASE_URL}${movieDetails.logoPath}`} alt="" />
        </ImageTitle>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; // Add this to ensure full coverage
  opacity: 0.8;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // This is crucial for proper scaling
    object-position: center; // Centers the image

    @media (max-width: 768px) {
      // On mobile, ensure image covers full height
      height: 100vh;
      width: 100%;
      object-position: center top; // Focus on top portion on mobile
    }
  }
`;

const ImageTitle = styled.div``;
export default Detail;
