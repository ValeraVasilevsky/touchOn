<template>
  <form :class="styles.form">
    <div :class="styles.inputs">
      <BaseInput placeholder="Имя" />
      <BaseInput placeholder="Email" />
      <BaseInput placeholder="Телефон" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { BaseInput } from "shared/ui";

import styles from "./styles.module.scss";
</script>
