import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TOKEN, IMAGE_BASE_URL } from "../config";

const Detail = (props) => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [showMovie, setShowMovie] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    // Show disclaimer when component mounts
    alert(
      "Disclaimer: This website is created for educational purposes only. " +
        "All content and functionality are intended for demonstration and learning. " +
        "This is a non-profit project and not affiliated with Disney+ or any streaming service. " +
        "All movie rights belong to their respective owners."
    );

    const fetchMovieDetails = async () => {
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
        const englishLogo = data.images.logos.find(
          (logo) => logo.iso_639_1 === "en"
        );

        const officialTrailer = data.videos.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        setMovieDetails({
          ...data,
          logoPath: englishLogo ? englishLogo.file_path : null,
          trailerKey: officialTrailer ? officialTrailer.key : null,
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <Container>
      <Background>
        <img src={`${IMAGE_BASE_URL}${movieDetails?.backdrop_path}`} alt="" />
      </Background>

      <ContentMeta>
        {movieDetails?.logoPath ? (
          <LogoImg src={`${IMAGE_BASE_URL}${movieDetails.logoPath}`} alt="" />
        ) : (
          <Title>{movieDetails?.title}</Title>
        )}

        <Description>{movieDetails?.overview}</Description>

        <Details>
          <DetailItem>
            <DetailLabel>Rating:</DetailLabel>
            {movieDetails?.vote_average?.toFixed(1)}/10
          </DetailItem>
          <DetailItem>
            <DetailLabel>Runtime:</DetailLabel>
            {movieDetails?.runtime} min
          </DetailItem>
          <DetailItem>
            <DetailLabel>Release:</DetailLabel>
            {new Date(movieDetails?.release_date).getFullYear()}
          </DetailItem>
        </Details>

        <Controls>
          <PlayButton
            onClick={() => {
              setShowMovie(true);
              setShowTrailer(false);
            }}
          >
            Watch Movie
          </PlayButton>
          <TrailerButton
            onClick={() => {
              setShowTrailer(true);
              setShowMovie(false);
            }}
          >
            Trailer
          </TrailerButton>
        </Controls>
      </ContentMeta>

      {showMovie && (
        <MovieContainer>
          <CloseButton onClick={() => setShowMovie(false)}>×</CloseButton>
          <iframe
            src={`https://moviesapi.club/movie/${id}`}
            width="100%"
            height="100%"
            allowFullScreen
            frameBorder="0"
          />
        </MovieContainer>
      )}

      {showTrailer && movieDetails?.trailerKey && (
        <MovieContainer>
          <CloseButton onClick={() => setShowTrailer(false)}>×</CloseButton>
          <iframe
            src={`https://www.youtube.com/embed/${movieDetails.trailerKey}`}
            width="100%"
            height="100%"
            allowFullScreen
            frameBorder="0"
          />
        </MovieContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
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
  bottom: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
  margin-top: 30px;
  color: white;
`;

const LogoImg = styled.img`
  max-width: 600px;
  min-height: 200px;
  width: 35vw;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: 500;
`;

const Description = styled.div`
  line-height: 1.6;
  font-size: 20px;
  margin-bottom: 24px;
  max-width: 760px;
  letter-spacing: 0.5px;
`;

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
  font-size: 16px;
  letter-spacing: 0.5px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: rgba(249, 249, 249, 0.8);
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
`;

const PlayButton = styled.button`
  font-size: 15px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: rgb(198, 198, 198);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
  }
`;

const TrailerButton = styled(PlayButton)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const MovieContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 80vh;
  background: black;
  z-index: 1000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
`;

const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: 1px solid rgba(249, 249, 249, 0.4);
  border-radius: 50%;
  cursor: pointer;
  z-index: 1001;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
`;

export default Detail;
