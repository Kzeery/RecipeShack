import { Card, IconButton, Image, Text, Link } from "@chakra-ui/react";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

function FavoritesCard(props) {
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

  const deleteCard = () => {
    axios
      .post("/api/removefavorite/", { recipe_id: id }, postRequestConf)
      .then(() => {
        props.onDelete(id);
      });
  };

  return (
    <Card
      p={2}
      w="100%"
      h="100%"
      borderRadius="md"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        color={colors.teal}
        textAlign="center"
        fontSize="lg"
        m={2}
        w="100%"
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
        position="absolute"
        top="0"
        right="0"
        size={"xs"}
        aria-label="Favorite"
        icon={<FaWindowClose />}
        variant="outline"
        colorScheme="black"
        onClick={deleteCard}
        color={colors.teal}
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

export default FavoritesCard;
