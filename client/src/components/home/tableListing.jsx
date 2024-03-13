import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import moment from "moment/moment";
import {BsArchive, BsCheckSquare, BsEnvelope, BsFillTelephoneForwardFill, BsXOctagon} from "react-icons/bs";
import React from "react";

const TableListing = ({items}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="left">Nom</TableCell>
            <TableCell align="left">Poste</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                'td, th': { color: item.application.status === "rejected" ? '#EB0014' : '#000000' },
                opacity: item.application.status === "archived" ? '0.5' : '1'
              }}
            >
              <TableCell component="th" scope="row">
                {item.application.status}
              </TableCell>
              <TableCell align="left">{item.application.name}</TableCell>
              <TableCell align="left">{item.post.name}</TableCell>
              <TableCell align="left">{item.application.email}</TableCell>
              <TableCell align="left">{moment(item.application.createdAt).format('L')}</TableCell>
              <TableCell align="left">
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
  )
}

export default TableListing;