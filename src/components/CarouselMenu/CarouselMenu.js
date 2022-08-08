import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import arrow from "../../assets/icons/back-arrow.svg";
import "./CarouselMenu.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CarouselMenu = ({ id, addToExistingList }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [listAnchorEl, setListAnchorEl] = useState(null);
  const [menuLists, setMenuLists] = useState([]);

  const menuOpen = Boolean(menuAnchorEl);
  const listOpen = Boolean(listAnchorEl);
  const handleClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setMenuAnchorEl(null);
    setListAnchorEl(null);
  };

  /**
   * TODO: add code back to handle creating a new shopping list on carousel click
   * Will want to create new page, push items to it, then history.push - or similar - to send the user to that page to name the list
   */

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
  //         setMenuAnchorEl(null);
  //         setListAnchorEl(null);
  //       }
  //     } catch (err) {
  //       console.log(`Error: ${err}`);
  //     }
  //   };

  const expandLists = (event) => {
    setListAnchorEl(event.currentTarget);
  };

  const getLists = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/lists`);
      const menuLists = data.map((list) => {
        return (
          <MenuItem
            key={list.id}
            id={list.id}
            className="menu__item"
            onClick={(e) => {
              addToExistingList(e);
              handleClose();
            }}
          >
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
        // aria-controls={open ? "basic-menu" : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        + Add to List
      </Button>
      <Menu
        // id="basic-menu"
        className="menu__list"
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleClose}
        // MenuListProps={{
        //   "aria-labelledby": "basic-button",
        // }}
      >
        <MenuItem
          className="menu__item"
          //   aria-controls={listOpen ? "basic-menu" : undefined}
          //   aria-haspopup="true"
          //   aria-expanded={listOpen ? "true" : undefined}
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
            // MenuListProps={{
            //   "aria-labelledby": "basic-button",
            // }}
          >
            {menuLists}
          </Menu>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CarouselMenu;
