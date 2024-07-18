<template>
  <div :class="styles.container">
    <p>Имя: {{ contact.name }}</p>
    <p>Никнейм: {{ contact.username }}</p>
    <p>Почта: {{ contact.email }}</p>
    <p>Телефон: {{ contact.phone }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { Contact } from "features/contacts";

import styles from "./styles.module.scss";

interface ContactItemProps {
  contact: Contact;
}

const props = defineProps<ContactItemProps>();

const contact = computed((): Contact => props.contact);
</script>
