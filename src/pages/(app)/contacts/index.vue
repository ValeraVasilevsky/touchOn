<template>
  <div :class="styles.container">
    <SearchBar v-model:value="searchTerm" :class="styles.searchBar" />

    <div :class="styles.wrapper">
      <Loader v-if="contactLoading" />
      <ContactList v-else :contacts="filteredContacts" />
    </div>

    <Modal v-model:isOpen="isOpen" title="Добавить контакт">
      <ContactForm />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { SearchBar } from "widgets/search-bar";
import { ContactList, ContactForm } from "entities/contacts/ui";
import { Modal, Loader } from "shared/ui";
import { Contact, useContactStore } from "features/contacts";

import styles from "./styles.module.scss";

const searchTerm = ref<string>("");
const isOpen = ref<boolean>(true);
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

onMounted(async () => {
  await contactStore.getContacts();
});
</script>
