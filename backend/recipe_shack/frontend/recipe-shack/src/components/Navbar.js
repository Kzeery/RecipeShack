import { Box, Flex, Button } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const postRequestConf = {
  withCredentials: true,
  headers: {
    "X-CSRFToken": Cookies.get("csrftoken"),
  },
};
const Navbar = () => {
  const [username, setUsername] = useState("");
  const location = useLocation();
  const colors = {
    black: "#2C3333",
    darkTeal: "#2E4F4F",
    teal: "#0E8388",
    lightTeal: "#CBE4DE",
  };
  

  useEffect(() => {
    axios.get("/api/getsession/").then((res) => {
      
      setUsername(res.data.data);
    });
  }, []);

  return (
    <Flex
      width="100vw"
      backgroundColor={colors.darkTeal}
      pos="absolute"
      top={0}
      left={0}
      right={0}
      zIndex={1}
      p={4}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        {username && (
          <Box mr={4} fontWeight="bold" color='white'>
            Hi {username}
          </Box>
        )}
        <Link to="/">
          <Button
            borderRadius={0}
            type="submit"
            variant="solid"
            bg={colors.teal}
            _hover={{ bg: colors.lightTeal, color: "black" }}
            color="white"

            mr={4}
            onClick={() => {
              axios.post("/api/logout/", {}, postRequestConf).then((res) => {
                
              });
            }}
          >
            Logout
          </Button>
        </Link>
        <Link
          to={location.pathname === "/favorites" ? "/homepage" : "/favorites"}
        >
          <Button
            borderRadius={0}
            type="submit"
            variant="solid"
            bg={colors.teal}
            _hover={{ bg: colors.lightTeal, color: "black" }}
            color="white"
            mr={4}
          >
            {location.pathname === "/favorites" ? "Homepage" : "Favorites"}
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
