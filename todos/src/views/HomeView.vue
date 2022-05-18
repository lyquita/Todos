<script setup lang="ts">
import router from "@/router";
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { getUsername } from "../services/login";

const username = ref("");
const isLogin = ref(false);
const userId = ref(0);

function onLogOut() {
  localStorage.clear();
  router.push({ name: "login" });
}

onBeforeMount(() => {
  const tokenExisted = localStorage.getItem("access_token");
  if (localStorage.getItem("user_id")) {
    //@ts-ignore
    userId.value = parseInt(localStorage.getItem("user_id"));
  }
  if (tokenExisted) {
    isLogin.value = true;
  }

  getUsername(userId.value)
    .then((res) => {
      localStorage.setItem("username", res.data.username);
      username.value = res.data.username;
    })
    .catch((err) => console.log(err));
});
</script>

<template>
  <main>
    <div class="flex">
      <div>
        <h1 class="text-2xl">Good Morning,</h1>
        <h2 class="text-3xl font-bold">hireoo!</h2>
      </div>
      <img class="w-28 h-28 ml-5" src="../assets/img/day.svg" />
    </div>
    <div>
      <router-link to="/todo">
      <h2 class="text-2xl relative">Today</h2>
      <div class="h-3 w-16 bg-[#FBD8D4] absolute top-6 -z-10"></div>
      <ul class="flex w-full justify-between mt-4">
        <li>
          <p class="font-bold">4</p>
          <p>Todo</p>
        </li>
        <li>
          <p class="font-bold">2</p>
          <p>In Progress</p>
        </li>
        <li>
          <p class="font-bold">5</p>
          <p>Done</p>
        </li>
      </ul>
    </router-link>
    </div>
    <div class="mt-4">
      <h2 class="text-2xl relative">Record</h2>
      <div class="h-3 w-16 bg-[#FBD8D4] absolute top-6 -z-10"></div>
      <ul class="mt-4 flex w-full justify-around">
        <li>
          <img src="../assets/img/emoji1.svg" class="h-8 w-8" alt="" />
        </li>
        <li>
          <img src="../assets/img/emoji2.svg" class="h-8 w-8" alt="" />
        </li>
        <li>
          <img src="../assets/img/emoji3.svg" class="h-8 w-8" alt="" />
        </li>
        <li>
          <img src="../assets/img/emoji4.svg" class="h-8 w-8" alt="" />
        </li>
      </ul>
      <button
        class="inline-flex justify-center p-2 rounded-full mt-5 cursor-pointer bg-[#FCD8D4] dark:text-blue-500 dark:hover:bg-gray-600 items-center"
      >
        Add+
      </button>
    </div>

    <div class="fixed bottom-4">
      <button
       v-if="isLogin"
      @click="onLogOut"
        class="inline-flex justify-center p-2 rounded-full mt-5 sticky cursor-pointer bg-[#FCD8D4] dark:text-blue-500 dark:hover:bg-gray-600 items-center"
      >
        Log out
      </button>
    </div>
    <router-link to="/login">

    <div class="fixed bottom-4">
      <button
       v-if="!isLogin"
        class="inline-flex justify-center p-2 rounded-full mt-5 sticky cursor-pointer bg-[#FCD8D4] dark:text-blue-500 dark:hover:bg-gray-600 items-center"
      >
        Log in
      </button>
    </div>
    </router-link>

    <!-- <router-link to="/todo">
      <h2 class="text-3xl font-bold underline">Todo</h2>
    </router-link>
    <router-link to="/login" v-if="!isLogin">
      <h2 class="text-3xl font-bold underline mt-5">Login</h2>
    </router-link>
    <h2 class="text-3xl font-bold underline mt-5" v-if="isLogin">
      Hey, {{username}}
    </h2>
    <h2
      class="text-base font-bold underline mt-5"
      v-if="isLogin"
      @click="onLogOut"
    >
      Log out
    </h2> -->
  </main>
</template>
