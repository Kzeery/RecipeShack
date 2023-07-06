import { useState, useEffect } from "react";
import { Card, IconButton, Image, Text, Link } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

function RecipeCard(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const favroites = props.favorites;
  const id = props.id;
  const colors = {
    black: "#2C3333",
    darkTeal: "#2E4F4F",
    teal: "#0E8388",
    lightTeal: "#CBE4DE",
  };
  const url = (str) => {
    str = str.toLowerCase();
    str = str.replace(/(\s+)(?=[^-])/g, "-");
    return str + "-" + props.id;
  };
  const postRequestConf = {
    withCredentials: true,
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  useEffect(() => {
    const foundObject = favroites.find((obj) => obj.ID === id);
    if (foundObject) {
      setIsFavorite(true);
    }
  }, [favroites, id]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      axios
        .post("/api/addfavorite/", { recipe_id: id }, postRequestConf)
        .then((res) => {});
    } else {
      axios
        .post("/api/removefavorite/", { recipe_id: id }, postRequestConf)
        .then((res) => {});
    }
  };

  return (
    <Card
      p={2}
      w="100%"
      h="100%"
      borderRadius="md"
      
      border={isFavorite ? "2px solid yellow" : "2px solid black.500"}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        textAlign="center"
        fontSize="lg"
        m={2}
        w="100%"
        color={colors.teal}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {props.title}
      </Text>
      <IconButton
        color={colors.teal}
        position="absolute"
        top="0"
        right="0"
        size='xs'
        aria-label="Favorite"
        icon={<FaStar />}
        bg={isFavorite ? "yellow" : "white"}
        variant="outline"
        colorScheme="black"
        onClick={handleFavoriteClick}
      />
      <Link href={"https://www.food.com/recipe/" + url(props.title)}>
        <Image
          h={200}
          w={400}
          objectFit="cover"
          src={props.imageSrc}
          alt={props.title}
        />
      </Link>
    </Card>
  );
}

export default RecipeCard;
