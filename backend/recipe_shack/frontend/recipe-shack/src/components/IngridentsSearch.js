import React, { useState, useEffect } from "react";
import { FormControl, Text, Stack, Box } from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";

import { myIngredients } from "../ingredients";

const IngredientsSearch = ({ callback }) => {
  const [ingredients, setIngredients] = useState([]);
  const pickerItems = myIngredients;
  const colors = {
    black: "#2C3333",
    darkTeal: "#2E4F4F",
    teal: "#0E8388",
    lightTeal: "#CBE4DE",
  };

  const handleSelectedItemsChange = (ingredients) => {
    if (ingredients) {
      setIngredients(ingredients);
    }
  };

  useEffect(() => {
    const ingredientValues = ingredients.map((ingredient) => ingredient.value);
    callback(ingredientValues);
  }, [ingredients]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Box w="30vw" p={2} border='1px' borderRadius='lg' pos="relative" mt={55} bg='white'>
      <Text fontSize="xl" textAlign="center" mb={2} fontWeight="bold" color={colors.teal}>
        Add ingredients
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl mb={4}>
            <CUIAutoComplete
              highlightItemBg={colors.lightTeal}
              limitTags={5}
              tagStyleProps={{ rounded: "full" }}
              placeholder="Type an ingredient"
              inputStyleProps={{ color: colors.teal }}
              hideToggleButton={true}
              items={pickerItems}
              selectedItems={ingredients}
              disableCreateItem={true}
              onSelectedItemsChange={(changes) =>
                handleSelectedItemsChange(changes.selectedItems)
              }
            />
          </FormControl>
        </Stack>
      </form>
    </Box>
  );
};

export default IngredientsSearch;
