
import React, { useState } from "react";
import { Input, Typography } from "antd";
import classes from './SearchBar.module.css'

const { Text } = Typography;

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div className={classes.searchBarContainer}>
      <Input
        placeholder="Search for movies..."
        onChange={(e) => setInputValue(e.target.value)}
        size="large"
      />
      <div>
        <Text keyboard>Query: </Text>
        <Text>{inputValue}</Text>
      </div>
    </div>
  );
};

export default SearchBar;

