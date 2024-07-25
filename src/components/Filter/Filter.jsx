import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/contactsSlice";
import styles from "./Filter.module.css";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contacts.filter);

  const changeFilter = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <label className={styles.label}>
      Find contacts by name
      <input
        type="text"
        value={filter}
        onChange={changeFilter}
        className={styles.input}
      />
    </label>
  );
};

export default Filter;