<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import axios from "axios";
import moment from "moment";
import router
 from "@/router";
const listData = ref([]);
const currentMonth = ref(null);
const currentYear = ref(null);

axios.get("http://localhost:4000/monthly-todo").then((res) => {
  currentMonth.value = moment(res.data.month).format("MMMM");
  currentYear.value = moment(res.data.month).format("YYYY");
  listData.value = res.data.list;
});

function computedDate(m) {
  return moment(m).format("MMMM DD");
}

function goBack(){
    router.back()
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
        {{ currentMonth }}
        <span class="text-sm">{{ currentYear }}</span>
      </div>
    </header>

    <div class="grid grid-cols-2 gap-3 w-full mt-5">
      <div
        v-for="item in listData"
        :key="item"
        class="
          w-full
          h-72
          bg-[#FDF6F0]
          flex flex-col
          items-start
          p-5
          shadow-md
          rounded-md
        "
      >
        <router-link to="/todo">
          <div class="font-bold mb-3 text-lg">
            {{ computedDate(item.date) }}
          </div>
          <ul>
            <li
              v-for="todo in item.list"
              key="todo.id"
              class="text-base tracking-wide leading-5 list-disc mb-1"
            >
              {{ todo.text }}
            </li>
          </ul>
          <div>😁</div>
        </router-link>
      </div>
    </div>
  </main>
</template>
