import styled from "styled-components";
import ImageSlider from "./ImageSlider";
import Viewers from "./Viewers";
import Rec from "./Rec";
import DisneyOriginal from "./DisneyOriginal";
import NewRelease from "./NewRelease";
import Trending from "./Trending";

const Home = (props) => {
  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <Rec />
      <Trending />
      <DisneyOriginal />
      <NewRelease />
    </Container>
  );
};

const Container = styled.main`
  // Basic container setup
  position: relative; // Makes container a reference point for absolute positioning
  min-height: calc(100vh - 70px); // Full screen height minus navbar height
  overflow-x: hidden; // Hide horizontal scrollbar
  overflow-y: hidden;
  display: block; // Takes full width
  top: 72px; // Push content below navbar
  padding: 0 calc(3.5vw + 5px); // Space on left and right sides

  // Background setup using &:after
  &:after {
    // Creates a new element after the container
    // Background image settings
    background: url("/images/home-background.png") center center / cover
      // Center image and make it cover whole area
      no-repeat fixed; // Don't repeat image and keep it fixed while scrolling

    content: ""; // Required for :after to work
    position: absolute; // Position relative to container
    inset: 0px; // Stretch to all edges (top, right, bottom, left = 0)
    opacity: 1; // Full visibility
    z-index: -1; // Put behind other content
  }
`;

/* 
Container is like a box that:
Is as tall as the screen minus navbar
Has some padding on sides
Sits below navbar
Background is like a layer that:
Sits behind everything
Covers the whole container
Shows an image that doesn't move when scrolling
*/

export default Home;
