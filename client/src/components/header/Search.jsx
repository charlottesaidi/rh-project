import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Box, styled } from '@mui/material';

const SearchContainer = styled(Box)`
  border-radius: 5px;
  margin-left: 10px;
  width: 40%;
  background-color: #F5F5F5;
  display: flex;
`;

const SearchIconWrapper = styled(Box)`
  padding: 5px;
  display: flex;
  color: #A9A9A9;
`;

const InputSearchBase = styled(InputBase)`
  width: 100%;
  padding-left: 5px;
`;

const Search = () => {
  const [setText] = useState();
  const [setOpen] = useState(true)

  const getText = (text) => {
    setText(text);
    setOpen(false)
  }

  return (
    <SearchContainer>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <InputSearchBase
        placeholder="Search for employee name / ID"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => getText(e.target.value)}
      />
    </SearchContainer>
  )
}

export default Search;