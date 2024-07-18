<template>
  <div :class="styles.container">
    <SearchBar v-model:value="searchTerm" :class="styles.searchBar" />

    <div :class="styles.wrapper">
      <ContactList :contacts="filteredContacts" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { SearchBar } from "widgets/search-bar";
import { ContactList } from "entities/contacts/ui/contacts-list";
import { Contact, fetchContacts } from "features/contacts";

import styles from "./styles.module.scss";

const isLoading = ref<boolean>(false);
const searchTerm = ref<string>("");
const contacts = ref<Contact[]>([]);

const filteredContacts = computed((): Contact[] => {
  if (!searchTerm.value.length) return contacts.value;

  const search = searchTerm.value.toLowerCase();
  return contacts.value.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search) ||
      contact.phone.toLowerCase().includes(search) ||
      contact.email.toLowerCase().includes(search)
  );
});

const getContacts = async (): Promise<void> => {
  isLoading.value = true;

  try {
    const fetchedContacts = await fetchContacts();
    contacts.value = fetchedContacts;
  } catch (error) {
    contacts.value = [];
  } finally {
    isLoading.value = false;
  }
};

await getContacts();
</script>
