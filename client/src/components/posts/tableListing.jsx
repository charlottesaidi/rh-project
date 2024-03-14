import {Button, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import moment from "moment/moment";
import {BsPencilSquare, BsFillTrashFill} from "react-icons/bs";
import React from "react";

const DeleteButton = styled(Button)`
    cursor: default;
    opacity: .5;
    &:hover {
        background: transparent;
    }
`

const TableListing = ({items, handleDelete}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Poste</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Date de début</TableCell>
            <TableCell align="left">Date de fin</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 }
              }}
            >
              <TableCell component="th" scope="row">{item.post.name}</TableCell>
              <TableCell align="left">{item.title}</TableCell>
              <TableCell align="left">{moment(item.startDate).format('L')}</TableCell>
              <TableCell align="left">{moment(item.endDate).format('L')}</TableCell>
              <TableCell align="left">
                <div>
                  <Button>
                    <BsPencilSquare color={"red"} />
                  </Button>
                  <DeleteButton>
                    <BsFillTrashFill color={"green"} onClick={() => handleDelete(item.id)}/>
                  </DeleteButton>
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