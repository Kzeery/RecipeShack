import React, { useState, useEffect } from "react";
import { Grid, Text, Stack, Box, Spinner } from "@chakra-ui/react";
import FavoritesCard from "./FavoritesCard";
import axios from "axios";

const FavoritesSearch = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const colors = {
    black: "#2C3333",
    darkTeal: "#2E4F4F",
    teal: "#0E8388",
    lightTeal: "#CBE4DE",
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios.get("/api/getfavorites/").then((res) => {
        setFavorites(res.data.data);
        setLoading(false);
      });

    }, 2000);

  }, []);

  const deleteFavorite = (id) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.ID !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <Box w="100%" p={2}>
      <Text
        fontSize="xl"
        textAlign="center"
        mb={2}
        pos="relative"
        mt={50}
        color={colors.teal}
      >
        Your Favorites
      </Text>

      <Stack spacing={4}>

      <Box display="flex" justifyContent="center" alignItems="center">

          {loading ? (
            <Spinner />
          ) : (
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={6}>

            {favorites.map((recipe) => {
              return (
                <FavoritesCard
                  title={recipe.Name}
                  imageSrc={recipe.ImageURL}
                  key={recipe.ID}
                  id={recipe.ID}
                  favorites={favorites}
                  onDelete={deleteFavorite}
                />
              );
            })}
            </Grid>
          )}
        



      </Box>
      </Stack>
    </Box>
  );
};

export default FavoritesSearch;
