<script setup lang="ts">
const input = ref("");
const result = ref([] as string[]);

const onSubmit = async (): Promise<void> => {
  const response = await $fetch("/api/twoot", {
    method: "post",
    body: { message: input.value },
  });

  result.value.unshift(response);
  input.value = "";
};
</script>

<template>
  <div>
    <div class="input">
      <input type="text" v-model="input" @keyup.enter="onSubmit" />
      <button type="submit" @click="onSubmit">Validate moderation</button>
    </div>
    <div class="output">
      <ul>
        <li :key="res" v-for="res in result">
          {{ res }}
        </li>
      </ul>
    </div>
  </div>
</template>
