<template>
  <div :class="styles.container">
    <BaseInput v-model:value="searchTerm" placeholder="Поиск" required />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { BaseInput } from "shared/ui/base-input";

import styles from "./styles.module.scss";

const searchTerm = ref<string>("");
</script>
