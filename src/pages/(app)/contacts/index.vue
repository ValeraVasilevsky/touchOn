<template>
  <div :class="styles.container">
    <SearchBar v-model:value="searchTerm" :class="styles.searchBar" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { SearchBar } from "widgets/search-bar";

import styles from "./styles.module.scss";

const searchTerm = ref<string>("");
</script>
