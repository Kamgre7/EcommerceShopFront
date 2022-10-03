import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const UnauthorizedView = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Box>
      <Text> You do not have access to the requested page. </Text>
      <Button onClick={goBack}> Go back</Button>
    </Box>
  );
};
