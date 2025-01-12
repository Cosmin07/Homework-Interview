
import React, { useState } from "react";
import { Input, Typography } from "antd";
import classes from './SearchBar.module.css'

const { Text } = Typography;

type SearchBarProps = {
  onEnterPress: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onEnterPress }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleEnterPress = () => {
      onEnterPress(inputValue);
  };

  return (
    <div className={classes.searchBarContainer}>
      <Input
        placeholder="Search for movies..."
        onChange={(e) => setInputValue(e.target.value)}
        size="large"
        onPressEnter={handleEnterPress}
      />
      <div>
        <Text keyboard>Query: </Text>
        <Text>{inputValue}</Text>
      </div>
    </div>
  );
};

export default SearchBar;

