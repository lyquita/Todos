<script setup lang="ts">
import router from "@/router";
import { postLogin } from "../../services/login"
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

const username = ref('')
const password = ref('')

function goBack() {
  router.back();
}

async function onSubmit() {
    try {
        const params = {
            username: username.value,
            password: password.value
        }
    const res = await postLogin(params);
        if(res){
            localStorage.setItem('access_token', res.data.access),
            localStorage.setItem('refresh_token', res.data.refresh)
        }

    } catch (error) {
        // console.log('err', error.response.status)
        throw new Error(error)
    }
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
    </header>
    <div class="flex flex-col h-[80vh] justify-center items-center">
      <h2 class="text-3xl font-bold underline">Login</h2>
      <div class="z-0 w-full my-6 flex items-center justify-center">
        <input
          type="text"
          name="username"
          v-model="username"
          class="block py-2.5 px-0 mt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required

        />
        <label
          for="username"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Username</label
        >
      </div>
      <div class="z-0 w-full my-6 flex items-center justify-center">
        <input
          type="password"
          name="password"
          v-model="password"
          class="block py-2.5 px-0 mt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Password</label
        >
      </div>
      <button
        @click="onSubmit"
        class="inline-flex justify-center p-2 rounded-full cursor-pointer bg-[#FCD8D4] dark:text-blue-500 dark:hover:bg-gray-600 items-center"
      >
        Button
      </button>
    </div>
  </main>
</template>
