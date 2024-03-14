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
  const [message, setMessage] = React.useState(null);

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

  const handleDelete = async (id) => {
    const response = await api.delete('/jobs/' + id + '/delete');
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setMessage(response.data);
    }
  }

  return (
    <Wrapper>
      {jobs ?
        <Wrapper>
          {message ?
            <Alert severity="success">{message}</Alert>
            : ''
          }
          <TableListing items={jobs} handleDelete={handleDelete}/>
        </Wrapper>
        : 'Une erreur est survenue'
      }
    </Wrapper>
  )
}

export default AllPosts;