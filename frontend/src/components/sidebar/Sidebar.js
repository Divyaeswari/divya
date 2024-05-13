import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';
import EventIcon from '@material-ui/icons/Event';
import ReportIcon from '@material-ui/icons/Report';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import profileImage from '../../assets/img/Admin.jpg';



const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#12223D',
    color: 'white',
  },
  toolbar: theme.mixins.toolbar,
  subMenu: {
    paddingLeft: theme.spacing(6),
    paddingTop: theme.spacing(0),
    //backgroundColor: theme.palette.secondary.main, // Customize background color
    //color: theme.palette.primary.contrastText, // Set text color
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState({});

  const toggleSubMenu = (menuName) => {
    setOpenMenu((prevOpenMenu) => ({
      ...prevOpenMenu,
      [menuName]: !prevOpenMenu[menuName],
    }));
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />

      <div className="profile">
  <img alt="" src={profileImage} className="profile-picture"/>
  <Typography variant="h6" className="profile-name">John Doe</Typography>
</div>
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon  style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <List component="nav">
          <ListItem button onClick={() => toggleSubMenu('userManagement')}>
            <ListItemIcon>
              <PeopleIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="User Management" />
            {openMenu['userManagement'] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMenu['userManagement']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.subMenu}>
                <ul><li><ListItemText primary="Add/Edit Admin Users" /></li></ul>
              </ListItem>
              <ListItem button className={classes.subMenu}>
              <ul><li><ListItemText primary="Role & Permissions" /></li></ul>
              </ListItem>
              <ListItem button className={classes.subMenu}>
              <ul><li><ListItemText primary="User Activity Monitoring" /></li></ul>
              </ListItem>
            </List>
          </Collapse>
        </List>





        <List component="nav">
          <ListItem button onClick={() => toggleSubMenu('masters')}>
          <ListItemIcon>
            <BusinessIcon  style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Masters" />
          {openMenu['masters'] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu['masters']} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.subMenu}>
          <ul><li><ListItemText primary="Industry Types" /></li></ul>
            </ListItem>
            <ListItem button className={classes.subMenu}>
            <ul><li><ListItemText primary="Categories" /></li></ul>
            </ListItem>
            <ListItem button className={classes.subMenu}>
            <ul><li><ListItemText primary="Event Types" /></li></ul>
            </ListItem>
            <ListItem button className={classes.subMenu}>
            <ul><li><ListItemText primary="Data Privacy" /></li></ul>
            </ListItem>
            <ListItem button className={classes.subMenu}>
            <ul><li><ListItemText primary="Visibility" /></li></ul>
            </ListItem>
            <ListItem button className={classes.subMenu}>
            <ul><li><ListItemText primary="Pronouns" /></li></ul>
            </ListItem>
            </List>      
        </Collapse>
        </List>

        <List component="nav">
          <ListItem button onClick={() => toggleSubMenu('postManagement')}>
          <ListItemIcon>
            <EventIcon  style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Post Management" />
          {openMenu['postManagement'] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu['postManagement']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.subMenu}>
                <ul><li><ListItemText primary="View All Post" /></li></ul>
              </ListItem>
              <ListItem button className={classes.subMenu}>
              <ul><li><ListItemText primary="Block and Delete Post" /></li></ul>
              </ListItem>
            </List>
          </Collapse>
        </List>

        <List component="nav">
          <ListItem button onClick={() => toggleSubMenu('eventManagement')}>
          <ListItemIcon>
            <EventIcon  style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Event Management" />
          {openMenu['eventManagement'] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu['eventManagement']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.subMenu}>
                <ul><li><ListItemText primary="View All Events" /></li></ul>
              </ListItem>
              <ListItem button className={classes.subMenu}>
              <ul><li><ListItemText primary="Block and Delete events" /></li></ul>
              </ListItem>
            </List>
          </Collapse>
        </List>

        <List component="nav">
          <ListItem button onClick={() => toggleSubMenu('businessPagesManagement')}>
          <ListItemIcon>
            <BusinessIcon  style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Business Pages Management" />
          {openMenu['businessPagesManagement'] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu['businessPagesManagement']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.subMenu}>
                <ul><li><ListItemText primary="View All pages" /></li></ul>
              </ListItem>
            </List>
          </Collapse>
        </List>

        <List component="nav">
          <ListItem button onClick={() => toggleSubMenu('subscriptionManagement')}>
          <ListItemIcon>
            <PeopleIcon   style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Subscription Management" />
          {openMenu['subscriptionManagement'] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu['subscriptionManagement']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.subMenu}>
                <ul><li><ListItemText primary="Free(MVP)" /></li></ul>
              </ListItem>
            </List>
          </Collapse>
        </List>


        <ListItem button>
          <ListItemIcon>
            <ReportIcon  style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon  style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
