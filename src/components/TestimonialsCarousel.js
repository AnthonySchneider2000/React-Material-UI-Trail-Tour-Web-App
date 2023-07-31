import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, styled } from "@mui/material";

const StyledImageContainer = styled("div")({
  width: 760, // Set the desired width
  height: 500, // Set the desired height
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover", // Stretch the image to cover the container
    borderRadius: "10px", // Optional: Round the corners
  },
});

const StyledPaper = styled(Paper)({
  textAlign: "center",
  // Add any additional styles for the Paper component if needed
});

const StyledNextButton = styled(Button)({
  // Custom styles for the "Next" button
  // Adjust the height as per your preference
  top: "40px", // Set the desired height for the next button
});

function Example(props) {
  var items = [
    {
      name: "Lakeview Serenity Trail",
      description:
        "Experience tranquility and scenic beauty as you hike along the picturesque Lakeview Serenity Trail. Immerse yourself in the sights and sounds of nature near the sparkling lake.",
      image:
        "https://img-aws.ehowcdn.com/700x/www.onlyinyourstate.com/wp-content/uploads/2022/02/mortonarboretum.jpeg",
    },
    {
      name: "Azure Waterside Path",
      description:
        "Embark on an adventure through the enchanting Azure Waterside Path. Wander amidst the lush greenery and enjoy breathtaking views of the glistening lake that accompany you throughout the journey.",
      image:
        "https://www.reneeroaming.com/wp-content/uploads/2022/05/Monkey-Rock-Trail-Lake-Tahoe.jpg",
    },
    {
      name: "Tranquil Lakefront Trail",
      description:
        "Find peace and serenity on the Tranquil Lakefront Trail. Let the soothing sounds of lapping waves and gentle breeze guide your footsteps along the serene path that hugs the pristine lake shore.",
      image:
        "https://www.femalehiker.com/wp-content/uploads/2022/02/Brewster-Peninsula-Loop.jpg", // Replace this with an actual image URL
    },
    {
      name: "Crystal Clear Lake Trek",
      description:
        "Discover the wonders of nature on the Crystal Clear Lake Trek. Marvel at the crystal-clear waters reflecting the surrounding landscape as you journey through dense forests and open meadows.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Uppertraillake.JPG/1200px-Uppertraillake.JPG", // Replace this with an actual image URL
    },
  ];

  return (
    <Carousel NextButton={StyledNextButton}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <StyledPaper>
      <StyledImageContainer>
        <img src={props.item.image} alt={props.item.name} />
      </StyledImageContainer>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
      <Button variant="contained" style={{ width: "100%" }}>
        Check it out!
      </Button>
    </StyledPaper>
  );
}

export default Example;
