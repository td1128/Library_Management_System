import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from 'react-router-dom';

function MuiBreadcrumbs() {
  const location = useLocation();
  let currentLink = '';

  const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {
    currentLink += `/${crumb}`;
    return (
      <Link
        color="inherit"
        component={RouterLink}
        to={currentLink}
        underline="hover"
        key={crumb}
      >
        {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
      </Link>
    );
  });

  return (
    <Box m={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          component={RouterLink}
          to="/"
          underline="hover"
        >
          Home
        </Link>
        {crumbs}
      </Breadcrumbs>
    </Box>
  );
}

export default MuiBreadcrumbs;












// // import { Box,Breadcrumbs,Link, Typography } from "@mui/material";
// import React from 'react'
// import { Link, useLocation } from "react-router-dom";

// function MuiBreadcrumbs() {
//   const location = useLocation()
//   let currentLink='Home'
//   const crumbs=location.pathname.split('/').filter(
//     crumb=>crumb!==''
//   ).map(crumb=>{
//     currentLink=+ `/${crumb}`
//     return (
//       <div className="crumb" key={crumb}>
//         <Link to={currentLink}>{crumb}</Link>
//       </div>
//     )
//   })
//   return (
//     <div className="breadcrumbs">
//       {crumbs}
//     </div>
//   )
// }

// export default MuiBreadcrumbs
