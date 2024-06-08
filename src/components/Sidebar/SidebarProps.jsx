import './Sidebar.css';
import React from 'react';
import { Link } from 'react-router-dom';

function SidebarProps({ onClick, active, text, Icon, link }) {
    return (

        <Link to={link}
            className={`sidebarProp ${active && "sidebarProp--active"}`}
            onClick={onClick}
        >
            <Icon className="sidebar-icon" />
            <h4>{text}</h4>
        </Link>

    )
}

export default SidebarProps
