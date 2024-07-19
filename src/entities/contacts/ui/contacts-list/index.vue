<template>
  <div :class="styles.container">
    <ContactItem
      v-for="contact of props.contacts"
      :key="String(contact.id)"
      :contact="contact"
      @select="onSelect"
    />
  </div>
</template>

<script setup lang="ts">
import type { Contact } from "features/contacts/model";
import { ContactItem } from "./item";

import styles from "./styles.module.scss";

interface ContactListProps {
  contacts: Contact[];
}
type ContactListEmits = {
  select: [value: number];
};

const props = defineProps<ContactListProps>();
const emits = defineEmits<ContactListEmits>();

const onSelect = (contactId: number): void => {
  emits("select", contactId);
};
</script>
