<template>
  <div :class="formStyles.container">
    <span v-if="isShowSlot" :class="styles.icon">
      <slot name="left-icon" />
    </span>

    <input
      v-model="inputValue"
      :placeholder="props.placeholder"
      :value="inputValue"
      :class="formStyles.input"
      :type="inputType.type"
      :inputmode="inputType.inputMode"
      data-maska-eager
      v-maska:unmaskedValue.unmasked="mask"
      @input="onInput"
    />

    <p v-if="isShowError" :class="styles.error">
      {{ props.errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { vMaska } from "maska/vue";

import styles from "./styles.module.scss";

interface BaseInputProps {
  value: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  variant?: "phone" | "password" | "text" | "email" | string;
  required?: boolean;
  initializeUnmasked?: boolean;
}
type BaseInputEmits = {
  "update:value": [string];
  "update:unmasked": [string];
};
type InputModeType = "text" | "tel" | "email";

const props = withDefaults(defineProps<BaseInputProps>(), {
  value: "",
  placeholder: "",
  error: false,
  errorMessage: "",
  variant: "text",
  required: false,
  initializeUnmasked: false,
});
const emits = defineEmits<BaseInputEmits>();
const slots = defineSlots<{
  default(props: object): never;
  "left-icon"(props: object): never;
}>();

const inputValue = ref<string>(props.value);
const unmaskedValue = ref<string>("");

defineExpose({ unmaskedValue });

const mask = computed((): string =>
  props.initializeUnmasked ? "+7 (###) ###-##-##" : ""
);
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
const inputType = computed((): { inputMode: InputModeType; type: string } => {
  if (props.variant === "phone") {
    return {
      inputMode: "tel",
      type: "text",
    };
  }

  if (props.variant === "email") {
    return {
      inputMode: "email",
      type: "text",
    };
  }

  return {
    inputMode: "text",
    type: "text",
  };
});

const onInput = (): void => {
  emits("update:value", unmaskedValue.value);
};
</script>
