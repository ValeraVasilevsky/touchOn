<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="props.isOpen"
        @mouseup.self="closeModal"
        :class="styles.modalSlide"
      >
        <div :class="styles.content">
          <div :class="styles.header">
            <p :class="styles.title">{{ props.title }}</p>

            <div @click.stop="closeModal" :class="styles.close"></div>
          </div>

          <div :class="styles.body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import styles from "./styles.module.scss";

interface ModalProps {
  title: string;
  isOpen: boolean;
}
type ModalEmits = {
  "update:isOpen": [value: boolean];
};

const props = defineProps<ModalProps>();
const emits = defineEmits<ModalEmits>();

const closeModal = (): void => {
  emits("update:isOpen", props.isOpen);
};
</script>
