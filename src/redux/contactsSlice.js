import { createSlice } from "@reduxjs/toolkit";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const loadContacts = () => {
  try {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (Array.isArray(savedContacts)) {
      return savedContacts;
    }
    return initialContacts;
  } catch (error) {
    console.error("Failed to load contacts from localStorage:", error);
    return initialContacts;
  }
};

const saveContacts = (contacts) => {
  try {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  } catch (error) {
    console.error("Failed to save contacts to localStorage:", error);
  }
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: loadContacts(),
    filter: "",
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
      saveContacts(state.items);
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload,
      );
      saveContacts(state.items);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
