import React, {useEffect} from "react";
import {
  Alert,
  Box,
  styled,
} from '@mui/material';
import {Core} from "../service/core";
import '@asseinfo/react-kanban/dist/styles.css'
import TableListing from "../components/posts/tableListing";

const api = new Core();

const Wrapper = styled(Box)({
  padding: '20px 50px'
})

const AllPosts = () => {
  const [jobs, setJobs] = React.useState([]);
  const [error, setError] = React.useState();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const response = await api.get('jobs');
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setJobs(response.data);
    }
  };

  return (
    <Wrapper>
      {jobs ?
        <Wrapper>
          <TableListing items={jobs}/>
        </Wrapper>
        : error ?
          <Alert severity="error">{error}</Alert>
          : <Alert severity="warning">Quelque chose ne va pas</Alert>
      }
    </Wrapper>
  )
}

export default AllPosts;