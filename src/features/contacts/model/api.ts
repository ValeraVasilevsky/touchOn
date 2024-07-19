import { api } from "shared/api";
import { Contact } from "./types";

export const fetchContacts = async (): Promise<Contact[]> => {
  const { data } = await api.get("users");

  return data;
};

export const createContact = async (
  contact: Omit<Contact, "id" | "username">
): Promise<void | Contact> => {
  const { data } = await api.post("users", {
    body: contact,
  });

  if (!data) return;

  const createdContact: Contact = {
    id: +Date.now(),
    phone: data.body.phone,
    email: data.body.email,
    username: data.body.name,
    name: data.body.name,
  };

  return createdContact;
};
