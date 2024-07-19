<template>
  <form :class="styles.form" @submit.prevent="onSubmit">
    <div :class="styles.inputs">
      <BaseInput
        v-model:value="values.name"
        placeholder="Имя"
        :error="!!errors?.name"
        :error-message="errors?.name?.message"
      />
      <BaseInput
        v-model:value="values.email"
        placeholder="Email"
        :error="!!errors?.email"
        :error-message="errors?.email?.message"
        variant="email"
      />
      <BaseInput
        v-model:value="values.phone"
        placeholder="Телефон"
        :error="!!errors?.phone"
        :error-message="errors?.phone?.message"
        variant="phone"
        :initialize-unmasked="true"
      />
    </div>

    <div :class="styles.actions">
      <BaseButton submit :loading="isLoading" :disabled="isLoading">
        {{ formAction }}
      </BaseButton>
      <BaseButton @click="onClick" :disabled="isLoading"> Отменить </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { BaseInput, BaseButton } from "shared/ui";
import { useForm } from "shared/utils/useForm";
import { Contact, contactSchema, useContactStore } from "features/contacts";

import styles from "./styles.module.scss";

type FormType = "add" | "edit";
type FormEmits = {
  add: [value: void];
  edit: [value: void];
  close: [value: void];
};

const emits = defineEmits<FormEmits>();
const contactStore = useContactStore();

const formType = computed(
  (): FormType => (!contactStore.selectedContact ? "add" : "edit")
);
const formAction = computed((): string =>
  formType.value === "add" ? "Создать" : "Сохранить"
);

const { values, errors, isLoading, submit, clearErrors } = useForm(
  contactSchema,
  {
    defaultValues: {
      phone: contactStore.selectedContact?.phone ?? "",
      name: contactStore.selectedContact?.name ?? "",
      email: contactStore.selectedContact?.email ?? "",
    },
  }
);

const createContact = async (): Promise<void> => {
  const contact: Omit<Contact, "id" | "username"> = {
    phone: values.phone,
    email: values.email,
    name: values.name,
  };

  await contactStore.create(contact);
  emits("add");
};

const updateContact = async (): Promise<void> => {
  if (!contactStore.selectedContact) return;
  contactStore.update({
    ...contactStore.selectedContact,
    name: values.name,
    phone: values.phone,
    email: values.email,
  });
  emits("edit");
};

const onSubmit = submit(async () => {
  formType.value === "add" ? await createContact() : await updateContact();
  onClick();
});
const resetForm = (): void => {
  values.email = "";
  values.name = "";
  values.phone = "";
  clearErrors();
  contactStore.selectedContact = null;
};
const onClick = (): void => {
  resetForm();
  emits("close");
};
</script>
