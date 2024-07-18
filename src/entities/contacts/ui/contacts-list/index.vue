<template>
  <div :class="styles.container">
    <ContactItem
      v-for="contact of props.contacts"
      :key="String(contact.id)"
      :contact="contact"
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
const props = defineProps<ContactListProps>();
</script>
