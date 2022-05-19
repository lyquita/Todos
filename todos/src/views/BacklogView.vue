<script setup lang="ts">
import router from '@/router';
import List from "../components/Backlog/List.vue"
import Addbacklog from "../components/Backlog/Addbacklog.vue"
function goBack() {
  router.back();
}
</script>

<template>
  <main class="flex flex-col w-full items-center">
    <header class="text-2xl flex w-full justify-between">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1"
        @click="goBack"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <div>
        <h2 class="text-2xl relative">Backlog</h2>
        <div class="h-3 w-16 bg-[#FBD8D4] absolute top-6 -z-10"></div>
      </div>
    </header>
    <div>
        <List />
        <Addbacklog />
    </div>
  </main>
</template>