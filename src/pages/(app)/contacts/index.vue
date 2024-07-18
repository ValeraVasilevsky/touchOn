<template>
  <div :class="styles.container">
    <SearchBar v-model:value="searchTerm" :class="styles.searchBar" />

    <div :class="styles.wrapper">
      <Loader v-if="contactLoading" />
      <ContactList v-else :contacts="filteredContacts" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { SearchBar } from "widgets/search-bar";
import { ContactList } from "entities/contacts/ui/contacts-list";
import { Loader } from "shared/ui/loader";
import { Contact, useContactStore } from "features/contacts";

import styles from "./styles.module.scss";

const searchTerm = ref<string>("");
const contactStore = useContactStore();

const contactLoading = computed((): boolean => contactStore.isLoading);
const filteredContacts = computed((): Contact[] => {
  if (!searchTerm.value.length) return contactStore.contacts;

  const search = searchTerm.value.toLowerCase();
  return contactStore.contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search) ||
      contact.phone.toLowerCase().includes(search) ||
      contact.email.toLowerCase().includes(search)
  );
});

onMounted(() => {
  contactStore.getContacts();
});
</script>
