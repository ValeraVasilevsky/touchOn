import { defineStore } from 'pinia'
import { ref } from 'vue'

import { Contact, fetchContacts } from 'features/contacts'

export const useContactStore = defineStore('contacts', () => {
    const contacts = ref<Contact[]>([])
    const isLoading = ref<boolean>(false)
    const selectedContact = ref<Contact | null>(null)

    const getContacts = async (): Promise<void> => {
        isLoading.value = true;
        try {
            const fetchedContacts = await fetchContacts();
            contacts.value = fetchedContacts
        } catch (error) {
            contacts.value = []
        } finally {
            isLoading.value = false
        }
    }

    const setSelectedContact = (contactId?: number): void => {
        if (!contactId) {
            selectedContact.value = null;
            return
        }

        const candidate = contacts.value.find(({ id }) => id === contactId)
        if (!candidate) {
            selectedContact.value = null
            return
        };
        selectedContact.value = candidate
    }

    return {
        contacts,
        isLoading,
        selectedContact,

        getContacts,
        setSelectedContact
    }
}, {
    persist: {
        key: 'selectedContact',
        paths: ['selectedContact'],
        storage: localStorage
    }
})