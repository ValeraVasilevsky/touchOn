<template>
  <div :class="formStyles.container">
    <span v-if="isShowSlot" :class="[styles.left, styles.icon]">
      <slot name="left-icon" />
    </span>

    <input
      v-model="inputValue"
      :placeholder="props.placeholder"
      :class="formStyles.input"
      @input="onInput"
    />

    <p v-if="isShowError" :class="styles.error">
      {{ props.errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import styles from "./styles.module.scss";

interface BaseInputProps {
  value: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
}
type BaseInputEmits = {
  "update:value": [string];
};

const props = withDefaults(defineProps<BaseInputProps>(), {
  value: "",
  placeholder: "",
  error: false,
  errorMessage: "",
});
const emits = defineEmits<BaseInputEmits>();
const slots = defineSlots<{
  default(props: object): never;
  "left-icon"(props: object): never;
}>();

const inputValue = ref<string>("");

const isShowError = computed(() => props.error && props.errorMessage.length);
const isShowSlot = computed(() => !!slots["left-icon"]);
const formStyles = computed<{ input: string[]; container: string[] }>(
  (): { input: string[]; container: string[] } => {
    const classes = {
      input: [styles.input],
      container: [styles.container],
    };

    if (props.error) {
      classes.input.push(styles.invalid);
      classes.container.push(styles.invalid);
    }

    return classes;
  }
);

const onInput = (): void => {
  emits("update:value", inputValue.value);
};
</script>
