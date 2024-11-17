import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TOKEN, IMAGE_BASE_URL } from "../config";

const Detail = (props) => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [showVideo, setShowVideo] = useState(false); // Add state for video player

  useEffect(() => {
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
      {!showVideo ? (
        <>
          <Background>
            <img src={`${IMAGE_BASE_URL}${movieDetails?.backdrop_path}`} alt="" />
          </Background>

          {movieDetails?.logoPath && (
            <ImageTitle>
              <img src={`${IMAGE_BASE_URL}${movieDetails.logoPath}`} alt="" />
            </ImageTitle>
          )}

          <Controls>
            <PlayButton onClick={() => setShowVideo(true)}>
              <img src="/images/play-icon-black.png" alt="" />
              <span>Play</span>
            </PlayButton>
            <TrailerButton>
              <img src="/images/play-icon-white.png" alt="" />
              <span>Trailer</span>
            </TrailerButton>
          </Controls>
        </>
      ) : (
        <VideoWrapper>
          <CloseButton onClick={() => setShowVideo(false)}>✕</CloseButton>
          <iframe
            src={`https://moviesapi.club/movie/${id}`}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          />
        </VideoWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px); // Fixed spacing
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
  opacity: 0.8;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;

    @media (max-width: 768px) {
      height: 100vh;
      width: 100%;
      object-position: center top;
    }
  }
`;

const ImageTitle = styled.div`
  display: flex;
  align-items: flex-end;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const PlayButton = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }
`;

const TrailerButton = styled(PlayButton)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const VideoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: black;
  
  iframe {
    width: 100%;
    height: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export default Detail;