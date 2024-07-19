<template>
  <div :class="styles.container">
    <div :class="styles.header">
      <p v-if="!filteredContacts.length && searchTerm.length">
        Ничего не найдено
      </p>
      <SearchBar v-model:value="searchTerm" :class="styles.searchBar" />
      <BaseButton @click="openModal"> Добавить </BaseButton>
    </div>

    <div :class="styles.wrapper">
      <Loader v-if="contactLoading" />
      <ContactList v-else :contacts="filteredContacts" @select="onSelect" />
    </div>

    <Modal v-model:isOpen="isOpen" :title="modalTitle">
      <ContactForm
        @add="onAddContact"
        @edit="onEditContact"
        @close="closeModal"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { SearchBar } from "widgets/search-bar";
import { ContactList, ContactForm } from "entities/contacts/ui";
import { Modal, Loader, BaseButton } from "shared/ui";
import { Contact, useContactStore } from "features/contacts";

import styles from "./styles.module.scss";

const searchTerm = ref<string>("");
const isOpen = ref<boolean>(false);
const contactStore = useContactStore();

const modalTitle = computed((): string => {
  return !!contactStore.selectedContact
    ? "Редактировать контакт"
    : "Добавить контакт";
});
const contactLoading = computed((): boolean => contactStore.isLoading);
const filteredContacts = computed((): Contact[] => {
  if (!searchTerm.value.length) return contactStore.contacts;

  const search = searchTerm.value.toLowerCase();
  return contactStore.contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search)
  );
});

const openModal = (): void => {
  isOpen.value = true;
};
const closeModal = (): void => {
  isOpen.value = false;
};

const onAddContact = (): void => {
  closeModal();
};
const onEditContact = (): void => {
  closeModal();
};
const onSelect = (): void => {
  openModal();
};

onMounted(async () => {
  await contactStore.getContacts();
});
</script>
