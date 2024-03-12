import React, {useEffect} from "react";
import {
  Box,
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {Core} from "../service/core";
import '@asseinfo/react-kanban/dist/styles.css'
import moment from "moment";
import { BsEnvelope } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import { BsXOctagon } from "react-icons/bs";
import { BsCheckSquare } from "react-icons/bs";
import { BsFillTelephoneForwardFill } from "react-icons/bs";

const api = new Core();

const Wrapper = styled(Box)({
    padding: '20px 50px'
})

const Home = () => {
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Nom</TableCell>
                  <TableCell align="right">Poste</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((application) => (
                  <TableRow
                    key={application.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      'td, th': { color: application.application.status === "rejected" ? '#EB0014' : '#000000' },
                      opacity: application.application.status === "archived" ? '0.5' : '1'
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {application.application.status}
                    </TableCell>
                    <TableCell align="right">{application.application.name}</TableCell>
                    <TableCell align="right">{application.post.name}</TableCell>
                    <TableCell align="right">{application.application.email}</TableCell>
                    <TableCell align="right">{moment(application.application.createdAt).format('L')}</TableCell>
                    <TableCell align="right">
                      <div>
                        <Button>
                          <BsEnvelope/>
                        </Button>
                        <Button>
                          <BsXOctagon/>
                        </Button>
                        <Button>
                          <BsArchive/>
                        </Button>
                      </div>
                      <div>
                        <Button>
                          <BsCheckSquare/>
                        </Button>
                        <Button>
                          <BsFillTelephoneForwardFill/>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          : 'Une erreur est survenue'
        }
      </Wrapper>
  )
}

export default Home;