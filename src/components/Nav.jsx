import React from 'react';
import {  Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const NavBar = () => {
  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <div>
        <nav className="Nav_bar">
        <Link to="/">
            <Button variant="outlined" size="small" sx={{borderBlockColor: '#30c2ae', color: '#30c2ae'}}>
              Home
            </Button>
          </Link>
          <Link to="/articles">
            <Button variant="outlined" size="small" sx={{borderBlockColor: '#30c2ae', color: '#30c2ae'}}>
              Articles
            </Button>
          </Link>
          <Link to="/topics">
            <Button variant="outlined" size="small" sx={{borderBlockColor: '#30c2ae', color: '#30c2ae'}}>
              Topics
            </Button>
          </Link>
        </nav>
      </div>
    </Box>
  );
};


export default NavBar