import { api } from "../../../shared/api";
import { Contact } from "./types";

export const fetchContacts = async (): Promise<Contact[]> => {
    const { data } = await api.get('users')

    return data;
} 