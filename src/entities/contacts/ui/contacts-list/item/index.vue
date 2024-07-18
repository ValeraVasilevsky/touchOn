<template>
  <div :class="styles.container" @click="onClick">
    <p>Имя: {{ contact.name }}</p>
    <p>Никнейм: {{ contact.username }}</p>
    <p>Почта: {{ contact.email }}</p>
    <p>Телефон: {{ contact.phone }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import { type Contact, useContactStore } from "features/contacts";

import styles from "./styles.module.scss";

interface ContactItemProps {
  contact: Contact;
}

const props = defineProps<ContactItemProps>();
const contactStore = useContactStore();
const router = useRouter();

const contact = computed((): Contact => props.contact);

const onClick = (): void => {
  contactStore.setSelectedContact(contact.value.id);
  router.push({ name: "contact-id", params: { id: contact.value.id } });
};
</script>
