import { defineStore } from "pinia";
import { ref } from "vue";

import { Contact, fetchContacts, createContact } from "features/contacts";

export const useContactStore = defineStore(
  "contacts",
  () => {
    const contacts = ref<Contact[]>([]);
    const isLoading = ref<boolean>(false);
    const selectedContact = ref<Contact | null>(null);

    const getContacts = async (): Promise<void> => {
      isLoading.value = true;
      try {
        if (contacts.value.length) return;

        const fetchedContacts = await fetchContacts();
        contacts.value = fetchedContacts;
      } catch (error) {
        contacts.value = [];
      } finally {
        isLoading.value = false;
      }
    };

    const setSelectedContact = (contactId?: number): void => {
      if (!contactId) {
        selectedContact.value = null;
        return;
      }

      const candidate = contacts.value.find(({ id }) => id === contactId);
      if (!candidate) {
        selectedContact.value = null;
        return;
      }
      selectedContact.value = candidate;
    };

    const create = async (
      contact: Omit<Contact, "id" | "username">
    ): Promise<void> => {
      try {
        const newContact = await createContact(contact);
        if (!newContact) return;

        contacts.value = [...contacts.value, newContact];
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const update = (contact: Contact): void => {
      try {
        const candidateIndex = contacts.value.findIndex(
          ({ id }) => id === contact.id
        );
        if (candidateIndex === -1) return;

        contacts.value.splice(candidateIndex, 1, contact);
      } catch (error) {
        return;
      }
    };

    return {
      contacts,
      isLoading,
      selectedContact,

      getContacts,
      setSelectedContact,
      create,
      update,
    };
  },
  {
    persist: {
      key: "contacts",
      paths: ["contacts"],
      storage: localStorage,
    },
  }
);
