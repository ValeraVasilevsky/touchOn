<template>
  <span :class="[styles.container, styles[props.size]]" />
</template>

<script setup lang="ts">
import styles from "./styles.module.scss";

type LoaderSize = "s" | "l";
interface LoaderProps {
  size?: LoaderSize;
}

const props = withDefaults(defineProps<LoaderProps>(), {
  size: "l",
});
</script>
