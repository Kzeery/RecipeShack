import React, { useEffect } from "react";
import { Flex, Stack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import FavoritesSearch from "../components/FavoritesSearch";
import axios from "axios";

const Favorites = () => {
  const colors = {
    black: "#2C3333",
    darkTeal: "#2E4F4F",
    teal: "#0E8388",
    lightTeal: "#CBE4DE",
  };

  useEffect(() => {
    axios.get("/api/getsession/").then((res) => {
      if (!res.data.status) {
        window.location.href = "/";
      }
    });
  }, []);

  return (
    <div style={{ backgroundColor: colors.lightTeal }}>    

    <Flex p={4}>
      <Stack w="100vw" h="100vh"  maxW="1000px" spacing={4} p={2}>
        <Flex w="100vw" flexWrap="wrap">
          <Navbar />
          <FavoritesSearch />
        </Flex>
      </Stack>
    </Flex>
    </div>
  );
};

export default Favorites;
