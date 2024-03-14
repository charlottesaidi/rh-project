import React, {useEffect} from "react";
import {
  Alert,
  Box,
  styled,
} from '@mui/material';
import {Core} from "../service/core";
import '@asseinfo/react-kanban/dist/styles.css'
import KanbanListing from "../components/kanban/kanbanListing";

const api = new Core();

const Wrapper = styled(Box)({
    padding: '20px 50px'
})

const Home = () => {
  const [applications, setApplications] = React.useState([]);
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState(null);

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
  };

  const updateApplication = async (id, status) => {
    const response = await api.update('applications/' + id, {"status": status})
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setMessage("La candidature a été déplacée dans la colonne " + response.data.status);
    }
  }

  const handleDragStop = (e) => {
    updateApplication(e.data[0].Id, e.data[0].Status)
    fetchApplications();
  }

  return (
      <Wrapper>
        {applications ?
          <Wrapper>
            {message ?
              <Alert severity="success">{message}</Alert>
              : ''
            }
            <KanbanListing items={applications} onDragStop={handleDragStop}/>
          </Wrapper>
          : error ?
            <Alert severity="error">{error}</Alert>
            : <Alert severity="warning">Quelque chose ne va pas</Alert>
        }
      </Wrapper>
  )
}

export default Home;