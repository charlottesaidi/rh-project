import React, {useEffect} from "react";
import {
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

const Kanban = () => {
  const [applications, setApplications] = React.useState([]);
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
  };

  return (
    <Wrapper>
      {applications ?
        <Wrapper>
          <KanbanListing items={applications} />
        </Wrapper>
        : 'Une erreur est survenue'
      }
    </Wrapper>
  )
}

export default Kanban;