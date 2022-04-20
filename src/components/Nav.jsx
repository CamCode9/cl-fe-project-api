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
            <Button variant="outlined" size="small">
              Home
            </Button>
          </Link>
          <Link to="/articles">
            <Button variant="outlined" size="small">
              Articles
            </Button>
          </Link>
          <Link to="/topics">
            <Button variant="outlined" size="small">
              Topics
            </Button>
          </Link>
        </nav>
      </div>
    </Box>
  );
};


export default NavBar