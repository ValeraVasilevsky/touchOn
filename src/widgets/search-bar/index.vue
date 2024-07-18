<template>
  <div :class="styles.container">
    <BaseInput v-model:value="modelValue" placeholder="Поиск">
      <template #left-icon>
        <SearchIcon />
      </template>
    </BaseInput>
  </div>
</template>

<script setup lang="ts">
import { BaseInput } from "shared/ui";
import SearchIcon from "shared/icons/search.svg";

import styles from "./styles.module.scss";
import { computed } from "vue";

interface SearchBarProps {
  value: string;
}
type SearchBarEmits = {
  "update:value": [string];
};

const props = defineProps<SearchBarProps>();
const emits = defineEmits<SearchBarEmits>();

const modelValue = computed({
  get: (): string => props.value,
  set: (newValue: string): void => {
    emits("update:value", newValue);
  },
});
</script>
