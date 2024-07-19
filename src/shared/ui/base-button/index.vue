<template>
  <button :type="buttonType" :disabled="props.disabled" :class="styles.button">
    <Loader v-if="props.loading" size="s" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Loader } from "shared/ui";

import styles from "./styles.module.scss";

interface BaseButtonProps {
  submit?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
type ButtonType = "submit" | "button";

const props = defineProps<BaseButtonProps>();

const buttonType = computed(
  (): ButtonType => (props.submit ? "submit" : "button")
);
</script>
