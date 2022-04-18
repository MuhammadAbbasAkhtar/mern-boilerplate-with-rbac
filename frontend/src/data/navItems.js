import React from 'react';
import pathLocations from "./pathLocations";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
const navItems = [
    {
        icon: <HomeRoundedIcon />,
        text:'Home',
        link: pathLocations.dashboard,
        isParent:true
    },
    {
        icon: <FileCopyOutlinedIcon />,
        text:'Projects',
        link: pathLocations.projects,
        isParent:true
    }
]

export default navItems