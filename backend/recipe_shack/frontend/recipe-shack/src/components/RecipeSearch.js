import React, { useEffect, useState, useRef } from "react";
import {
  FormControl,
  Grid,
  Input,
  Button,
  Text,
  Stack,
  Icon,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import CaloriesModal from "./Modals/CaloriesModal";
import CookTimeModal from "./Modals/CookTimeModal";
import RatingModal from "./Modals/RatingModal";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import Cookies from "js-cookie";
const postRequestConf = {
  withCredentials: true,
  headers: {
    "X-CSRFToken": Cookies.get("csrftoken"),
  },
};
const RecipeSearch = ({ ingredients }) => {
  const [dish, setDish] = useState("");
  const [appliedCalories, setAppliedCalories] = useState(0);
  const [appliedCookTime, setAppliedCookTime] = useState(0);
  const [appliedRating, setAppliedRating] = useState(0);
  const [myData, setMyData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const inputRef = useRef("");
  const [loading, setLoading] = useState(false);

  const colors = {
    black: "#2C3333",
    darkTeal: "#2E4F4F",
    teal: "#0E8388",
    lightTeal: "#CBE4DE",
  };
  
  useEffect(() => {
    axios.get("/api/getfavorites/").then((res) => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const request = {
        dish: dish,
        ingredients: ingredients,
        calories: appliedCalories,
        cooktime: appliedCookTime,
        rating: appliedRating,
      };
  
      axios.post("/api/getrecipes/", request, postRequestConf).then((res) => {
        setMyData(res.data.data);
        setLoading(false);
      });
  
      axios.get("/api/getfavorites/").then((res) => {
        setFavorites(res.data.data);
        setLoading(false);
      });
    }, 2000);

  }, [ingredients, appliedCalories, appliedCookTime, appliedRating, dish]);

  const handleSearchClick = () => {
    const inputValue = inputRef.current.value;

    setDish(inputValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      w="60vw"
      p={2}
      border="1px"
      borderRadius="lg"
      pos="relative"
      mt={55}
      bg="white"
    >
      <Text
        fontSize="xl"
        textAlign="center"
        mb={2}
        fontWeight="bold"
        color={colors.teal}
      >
        Search Recipes
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl mb={4}>
            <Input
              type="text"
              placeholder="Enter dish name"
              ref={inputRef}
              color={colors.teal}
            />
          </FormControl>
          <Button
            type="submit"
            rightIcon={<Icon as={FaSearch} />}
            onClick={handleSearchClick}
            bg={colors.teal}
            color="white"
            _hover={{ bg: colors.darkTeal }}
          >
            Search
          </Button>
        </Stack>
      </form>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={6}>
        <CaloriesModal callback={setAppliedCalories} />
        <CookTimeModal callback={setAppliedCookTime} />
        <RatingModal callback={setAppliedRating} />
      </Grid>

      <Box display="flex" justifyContent="center" alignItems="center">

        {loading ? (
          <Spinner />
        ) : (
          <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={6}>

          {myData.map((recipe) => {
            return (
              <RecipeCard
                title={recipe.Name}
                imageSrc={recipe.ImageURL}
                key={recipe.ID}
                id={recipe.ID}
                favorites={favorites}
              />
            );
          })}
          </Grid>

        )}
        </Box>

    </Box>
  );
};

export default RecipeSearch;
