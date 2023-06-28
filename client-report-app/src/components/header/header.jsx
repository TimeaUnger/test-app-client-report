import React, { useState } from 'react';
import { useAddClientMutation } from '../../services/clientsApi';
import { uniqueNamesGenerator, names, NumberDictionary } from 'unique-names-generator';
import "./header.css";
import Button from '@mui/material/Button';
import { useSearchParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[400]),
  backgroundColor: indigo[400],
  '&:hover': {
    backgroundColor: indigo[500],
  },
}));

const Header = () => {

  const [addClient] = useAddClientMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchVal, setSearchVal] = useState('');

  const config = {
    dictionaries: [names]
  }

  const client = uniqueNamesGenerator(config);

  const addHandler = async () => {

    const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
    const uniqueId = uniqueNamesGenerator({ dictionaries: [numberDictionary] });

    const clientAdd = {
      id: uniqueId,
      name: client
    }

    await addClient(clientAdd);
  }

  const searchHandler = (event) => {
    const value = event.target.value;
    setSearchVal(value);
  }

  const searchClickHandler = () => {
    setSearchParams({ name: searchVal });
  }

  const searchEnterHandler = (event) => {
    if (event.keyCode === 13) {
      setSearchParams({ name: searchVal });
    }
  }

  return (
    <div className="headerWrapper">
      <div className="btnWrapper">
        <ColorButton variant="contained" onClick={addHandler} >New Client</ColorButton>
      </div>
      <div className="searchWrapper">
        <div className="search">
          <span className="fa fa-search" onClick={searchClickHandler}></span>
          <input
            placeholder="Search client"
            value={searchVal}
            onChange={searchHandler}
            onKeyDown={searchEnterHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default Header;