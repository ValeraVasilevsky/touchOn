<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="props.isOpen" class="modal-slide">
        <div class="modal-slide__content">
          <div class="modal-slide__header">
            <p class="modal-slide__title">{{ props.title }}</p>
          </div>

          <div class="modal-slide__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface ModalProps {
  title: string;
  isOpen: boolean;
}
type ModalEmits = {
  "update:isOpen": [value: boolean];
};

const props = defineProps<ModalProps>();
const emits = defineEmits<ModalEmits>();
</script>

<style lang="scss">
@import "./styles.scss";
</style>
