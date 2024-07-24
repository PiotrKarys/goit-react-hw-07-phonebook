import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items) || [];
  const filter = useSelector((state) => state.contacts.filter) || "";

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const visibleContacts = getVisibleContacts();

  const handleDeleteClick = (id) => {
    try {
      dispatch(deleteContact(id));
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  return (
    <ul className={styles.list}>
      {visibleContacts.length === 0 ? (
        <li className={styles.item}>No contacts found</li>
      ) : (
        visibleContacts.map(({ id, name, number }) => (
          <li key={id} className={styles.item}>
            <p className={styles.text}>
              {name}: <span className={styles.number}>{number}</span>
            </p>
            <button
              onClick={() => handleDeleteClick(id)}
              className={styles.button}>
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default ContactList;
