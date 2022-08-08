import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import arrow from "../../assets/icons/back-arrow.svg";
import "./CarouselMenu.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CarouselMenu = ({ id, type }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [listAnchorEl, setListAnchorEl] = useState(null);
  const [menuLists, setMenuLists] = useState([]);

  const open = Boolean(anchorEl);
  const listOpen = Boolean(listAnchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setListAnchorEl(null);
  };

  //   const addToNewList = async () => {
  //     try {
  //       const res1 = await axios.post(`${BACKEND_URL}/lists`);
  //       console.log(res1);
  //       if (res1) {
  //         const newId = res1.data.newListCreated.id;
  //         const res2 = await axios.get(`${BACKEND_URL}/home/${type}/${id}`);
  //         console.log(res2.data);
  //         console.log(newId);
  //         const test = await axios.get(`${BACKEND_URL}/lists/${newId}`);
  //         console.log(test.data);
  //         const res3 = await axios.post(
  //           `${BACKEND_URL}/lists/${newId}/add-items`,
  //           {
  //             items: [{ name: "abc", quantity: "1" }],
  //           }
  //         );
  //         //   const res3 = await axios.post(`${BACKEND_URL}/lists/${newId}/add-items`, {
  //         //     items: res2.data,
  //         //   });
  //         console.log(res3);
  //         alert("Items added to new list");
  //         setAnchorEl(null);
  //         setListAnchorEl(null);
  //       }
  //     } catch (err) {
  //       console.log(`Error: ${err}`);
  //     }
  //   };

  const addToExistingList = () => {};

  const expandLists = (event) => {
    setListAnchorEl(event.currentTarget);
  };

  const getLists = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/lists`);
      const menuLists = data.map((list) => {
        return (
          <MenuItem key={list.id} id={list.id} className="menu__item">
            {list.name}
          </MenuItem>
        );
      });
      setMenuLists(menuLists);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

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
        {/* onClick={addToNewList} */}
        <MenuItem className="menu__item">New List</MenuItem>
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
            {menuLists}
            {/* <MenuItem className="menu__item">List 1</MenuItem>
            <MenuItem className="menu__item">List 2</MenuItem>
            <MenuItem className="menu__item">List 3</MenuItem>
            <MenuItem className="menu__item">List 4</MenuItem> */}
          </Menu>
        </MenuItem>
        {/* <MenuItem onClick={expandLists}>Existing Lists</MenuItem> */}
      </Menu>
    </div>
  );
};

export default CarouselMenu;
