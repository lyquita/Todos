<script setup lang="ts">
import router from "@/router";
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { getUsername } from "../services/login";

const username = ref("");
const isLogin = ref(false);

function onLogOut() {
  localStorage.clear();
  router.push({ path: "/login" });
}

onBeforeMount(() => {
  const tokenExisted = localStorage.getItem("access_token");
  const user_id = localStorage.getItem("user_id");
  if (tokenExisted) {
    isLogin.value = true;
  }

  getUsername(user_id)
    .then((res) => {
      localStorage.setItem("username", res.data.username);
      username.value = res.data.username;
    })
    .catch((err) => console.log(err));
});
</script>

<template>
  <main>
    <router-link to="/todo">
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
    </h2>
  </main>
</template>
