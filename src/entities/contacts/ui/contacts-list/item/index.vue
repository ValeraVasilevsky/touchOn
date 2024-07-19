<template>
  <div :class="styles.container" @click="onClick">
    <p>id: {{ contact.id }}</p>
    <p>Имя: {{ contact.name }}</p>
    <p>Никнейм: {{ contact.username }}</p>
    <p>Почта: {{ contact.email }}</p>
    <p>Телефон: {{ contactPhone }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { preparePhone } from "shared/utils/preparePhone";

import { type Contact, useContactStore } from "features/contacts";

import styles from "./styles.module.scss";

interface ContactItemProps {
  contact: Contact;
}
type ContactItemEmits = {
  select: [value: number];
};

const props = defineProps<ContactItemProps>();
const emits = defineEmits<ContactItemEmits>();
const contactStore = useContactStore();

const contact = computed((): Contact => props.contact);
const contactPhone = computed((): string => {
  return contact.value.phone.length === 10
    ? preparePhone(contact.value.phone)
    : contact.value.phone;
});

const onClick = (): void => {
  contactStore.setSelectedContact(contact.value.id);
  emits("select", contact.value.id);
};
</script>
