import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Grid,
} from "@chakra-ui/react";

function CookTimeModal({ callback }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bgColor, setBgColor] = useState("#CBE4DE");
  const [selectedCookTime, setSelectedCookTime] = useState(0);
  const [appliedCookTime, setAppliedCookTime] = useState(0);
  const colors = {
    black: "#2C3333",
    darkTeal: "#2E4F4F",
    teal: "#0E8388",
    lightTeal: "#CBE4DE",
  };

  useEffect(() => {
    callback(appliedCookTime);
  }, [appliedCookTime]);

  const handleApply = () => {
    setAppliedCookTime(selectedCookTime);
    onClose();
    if (selectedCookTime) {
      setBgColor(colors.teal);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        bg={bgColor}
        onClick={onOpen}
        color="black"
        _hover={{ bg: colors.darkTeal, color: "white" }}
      >
        Cook Time
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cook Time</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={6}>
              <Button
                variant="outline"
                bg={selectedCookTime === 1 ? colors.teal : colors.lightTeal}
                onClick={() => setSelectedCookTime(1)}
                disabled={selectedCookTime === "0-15 M"}
              >
                0 - 15 M
              </Button>
              <Button
                variant="outline"
                bg={selectedCookTime === 2 ? colors.teal : colors.lightTeal}
                onClick={() => setSelectedCookTime(2)}
                disabled={selectedCookTime === "15 M - 30 M"}
              >
                15 M - 30 M
              </Button>
              <Button
                variant="outline"
                bg={selectedCookTime === 3 ? colors.teal : colors.lightTeal}
                onClick={() => setSelectedCookTime(3)}
                disabled={selectedCookTime === "30 M - 1 H"}
              >
                30 M - 1 H
              </Button>
              <Button
                variant="outline"
                bg={selectedCookTime === 4 ? colors.teal : colors.lightTeal}
                onClick={() => setSelectedCookTime(4)}
                disabled={selectedCookTime === "1 H - 2 H"}
              >
                1 H - 2 H
              </Button>
              <Button
                variant="outline"
                bg={selectedCookTime === 5 ? colors.teal : colors.lightTeal}
                onClick={() => setSelectedCookTime(5)}
                disabled={selectedCookTime === "2 H - 3 H"}
              >
                2 H - 3 H
              </Button>
              <Button
                variant="outline"
                bg={selectedCookTime === 6 ? colors.teal : colors.lightTeal}
                onClick={() => setSelectedCookTime(6)}
                disabled={selectedCookTime === "3 H +"}
              >
                3 H +
              </Button>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setSelectedCookTime(0);
                setAppliedCookTime(0);
                onClose();
                setBgColor("#CBE4DE");
              }}
            >
              Unselect filter
            </Button>
            <Button
              onClick={() => {
                handleApply();
              }}
              variant="ghost"
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CookTimeModal;
