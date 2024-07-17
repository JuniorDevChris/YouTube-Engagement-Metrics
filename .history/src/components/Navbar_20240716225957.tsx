import React from "react";
import { Flex, Box, Input, IconButton, Spacer } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface NavbarProps {
  query: string;
  setQuery: (query: string) => void;
  fetchVideos: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ query, setQuery, fetchVideos }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchVideos();
    }
  };

  return (
    <Flex
      as="nav"
      bg="gray.800"
      color="white"
      padding={4}
      align="center"
      width="100%"
      position="fixed"
      top="0"
      zIndex="1000"
    >
      <Box fontSize="2xl" fontWeight="bold">
        YouTube Rating S
      </Box>
      <Spacer />
      <Box display="flex">
        <Input
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          width="300px"
          bg="white"
          color="black"
        />
        <IconButton
          icon={<SearchIcon />}
          onClick={fetchVideos}
          aria-label="Search"
          ml={2}
        />
      </Box>
    </Flex>
  );
};

export default Navbar;
