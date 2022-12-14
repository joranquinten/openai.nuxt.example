<script setup lang="ts">
interface ModerateResponse {
  id?: string;
  model?: string;
  results?: ModerateResults[];
}

interface ModerateResults {
  categories?: object;
  category_scores?: object;
  flagged?: boolean;
}

const input = ref("");
const result = ref([] as ModerateResponse[]);

const onSubmit = async (): Promise<void> => {
  const response: ModerateResponse = await $fetch("/api/moderate", {
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
      <input type="text" v-model="input" />
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
