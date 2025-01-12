import React, { useState } from "react";
import { Layout, Typography } from "antd";
import SearchBar from "./components/SearchBar/SearchBar";
import classes from './style.module.css'
import MoviesList from "./components/MoviesList/MoviesList";

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleEnterPress = (value:string) => {
    setQuery(value); 
  };
  return (
    <Layout>
      <Header className={classes.header}>
      <Title>Movie Search App</Title>
      </Header>
      <Content className={classes['page-content']}>
        <SearchBar onEnterPress={handleEnterPress}/>
        <MoviesList query={query} />
      </Content>
    </Layout>
  );
};

export default App;
