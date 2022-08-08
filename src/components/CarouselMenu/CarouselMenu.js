import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import arrow from "../../assets/icons/back-arrow.svg";
import "./CarouselMenu.scss";

const CarouselMenu = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [listAnchorEl, setListAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const listOpen = Boolean(listAnchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addToNewList = () => {};

  const addToExistingList = () => {};

  const expandLists = (event) => {
    setListAnchorEl(event.currentTarget);
  };

  return (
    <div id={id} className="menu">
      <Button
        // id="basic-button"
        className="menu__button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        + Add to List
      </Button>
      <Menu
        // id="basic-menu"
        className="menu__list"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className="menu__item" onClick={handleClose}>
          New List
        </MenuItem>
        <MenuItem
          className="menu__item"
          aria-controls={listOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={listOpen ? "true" : undefined}
          onClick={expandLists}
        >
          Existing Lists
          <img src={arrow} alt="" className="menu__item-arrow" />
          <Menu
            // id="basic-menu"
            className="menu__list"
            anchorEl={listAnchorEl}
            open={listOpen}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem className="menu__item">List 1</MenuItem>
            <MenuItem className="menu__item">List 2</MenuItem>
            <MenuItem className="menu__item">List 3</MenuItem>
            <MenuItem className="menu__item">List 4</MenuItem>
          </Menu>
        </MenuItem>
        {/* <MenuItem onClick={expandLists}>Existing Lists</MenuItem> */}
      </Menu>
    </div>
  );
};

export default CarouselMenu;
