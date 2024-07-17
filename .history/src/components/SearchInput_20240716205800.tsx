import React from "react";
import { Box, Input, Button } from "@chakra-ui/react";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  fetchVideos: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery, fetchVideos }) => {
  return (
    <Box mb={4}>
      <Input
        placeholder="Enter search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        mb={2}
      />
      <Button onClick={fetchVideos}>Search</Button>
    </Box>
  );
};

export default SearchInput;
