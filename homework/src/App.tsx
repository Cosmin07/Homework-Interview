import React from "react";
import { Layout, Typography } from "antd";
import SearchBar from "./components/SearchBar/SearchBar";
import classes from './style.module.css'

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout>
      <Header className={classes.header}>
      <Title>Movie Search App</Title>
      </Header>
      <Content className={classes['page-content']}>
        <SearchBar/>
      </Content>
    </Layout>
  );
};

export default App;
