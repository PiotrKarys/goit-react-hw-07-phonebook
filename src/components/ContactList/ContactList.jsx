import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, fetchContacts } from "../../redux/contactsSlice";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  const handleDeleteClick = (id) => {
    dispatch(deleteContact(id));
  };

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p>Error loading contacts: {error}</p>;

  return (
    <ul className={styles.list}>
      {visibleContacts.map(({ id, name, phone }) => (
        <li key={id} className={styles.item}>
          <p className={styles.text}>
            {name}: <span className={styles.number}>{phone}</span>
          </p>
          <button
            onClick={() => handleDeleteClick(id)}
            className={styles.button}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;