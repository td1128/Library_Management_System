import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReturnForm from './ReturnForm';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

//   const DrawerList = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Renew/Return</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor='right' >
        <Box sx={{ width: 1000, padding: 5 }} role="presentation" onClick={toggleDrawer(false)} >
            <div className=' flex h-20 items-center'>
                <ArrowBackIcon onClick={toggleDrawer(false)} className=' mr-5'/>
                <h1 className=' font-bold text-2xl'>Return / Renew</h1>
            </div>
            <ReturnForm/>
        </Box>
      </Drawer>
    </div>
  );
}
