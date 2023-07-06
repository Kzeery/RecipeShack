import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Image,
  FormControl,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const postRequestConf = {
  withCredentials: true,
  headers: {
    "X-CSRFToken": Cookies.get("csrftoken"),
  },
};

const colors = {
  black: "#2C3333",
  darkTeal: "#2E4F4F",
  teal: "#0E8388",
  lightTeal: "#CBE4DE",
};

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    axios.get("/api/getsession/").then((res) => {
      if (res.data.status) {
        window.location.href = "/homepage";
      }
    });
  }, []);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      document.getElementById("login-button").click();
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor={colors.lightTeal}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={require("../images/logo.png")} />
        <Heading color={colors.teal}>Login</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color={colors.teal} />}
                  />
                  <Input
                    color={colors.teal}
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}

                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color={colors.lightTeal}
                    children={<CFaLock color={colors.teal} />}
                  />
                  <Input
                    color={colors.teal}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                      bg={colors.teal}
                      color='white'
                      _hover={{ bg: colors.darkTeal }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                id="login-button"
                onClick={() => {
                  axios
                    .post(
                      "/api/login/",
                      { username: username, password: password },
                      postRequestConf
                    )
                    .then((res) => {
                      
                      if (res.data.status) {
                        window.location.href = "/homepage";
                      } else {
                        setLoginError(res.data.error_message);
                      }
                    });
                }}
                borderRadius={0}
                variant="solid"
                color='white'
                bg={colors.teal}
                width="full"
                _hover={{ bg: colors.darkTeal }}

              >
                Login
              </Button>

              {loginError && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Login Error</AlertTitle>
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box color={colors.teal}>
        New to us? <Link to="/signup"  style={{ textDecoration: 'underline' }}>Sign Up</Link>
      </Box>
    </Flex>
  );
};

export default LoginPage;
