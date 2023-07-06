import { useState, useEffect } from "react";
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
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

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    axios.get("/api/getsession/").then((res) => {
      if (res.data.status) {
        window.location.href = "/homepage";
      }
    });
  }, []);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      document.getElementById("signup-button").click();
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "confirm-password") {
      setConfirmPassword(event.target.value);
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
        <Heading color={colors.teal}>Signup</Heading>
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
                    onKeyDown={handleKeyDown}
                    color={colors.teal}
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color={colors.teal} />}
                  />
                  <Input 
                    onKeyDown={handleKeyDown}
                    color={colors.teal}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      bg={colors.teal}
                      color="white"
                      _hover={{ bg: colors.darkTeal }}
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color={colors.teal} />}
                  />
                  <Input 
                    onKeyDown={handleKeyDown}
                    color={colors.teal}
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    name="confirm-password"
                  />
                </InputGroup>
              </FormControl>
              <Button
                id = "signup-button"
                borderRadius={0}
                variant="solid"
                color='white'
                bg={colors.teal}
                width="full"
                _hover={{ bg: colors.darkTeal }}
                onClick={() => {
                  axios
                    .post(
                      "/api/register/",
                      {
                        username: username,
                        password1: password,
                        password2: confirmPassword,
                      },
                      postRequestConf
                    )
                    .then((res) => {
                      if (res.data.status) {
                        window.location.href = "/homepage";
                      } else {
                        setSignupError(res.data.error_message);
                      }
                    });
                }}
              >
                Signup
              </Button>
              {signupError && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Signup Error</AlertTitle>
                  <AlertDescription>{signupError}</AlertDescription>
                </Alert>
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box color={colors.teal}>
        Already have an account?{" "}
        <Link to="/" style={{ textDecoration: 'underline' }}>
          Login
        </Link>
      </Box>
    </Flex>
  );
};

export default SignupPage;
