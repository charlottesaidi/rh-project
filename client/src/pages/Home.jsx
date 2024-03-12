import React, {useEffect} from "react";
import { Box, styled } from '@mui/material';
import {Core} from "../service/core";

const api = new Core();

const Wrapper = styled(Box)({
    padding: '20px 50px'
})

const Home = () => {
  const [applications, setApplications] = React.useState();
  const [error, setError] = React.useState();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const response = await api.get('applications');
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setApplications(response.data);
    }
    console.log(response)
  };

  return (
      <Wrapper>
        {/*<Board initialBoard={board} />*/}
      </Wrapper>
  )
}

export default Home;