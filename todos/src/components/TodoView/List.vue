<script setup lang="ts">
interface ITodo {
  id: number;
  text: string;
  status: "pending" | "working" | "done";
}


defineProps(["todos"]);
</script>

<template>
  <main class="w-full">
    <div class="mb-5">
      <h3 class="text-lg">Todos</h3>
      <ul>
        <template v-for="todo in todos">
          <li
            v-if="todo.status === 'pending'"
            :key="todo.id"
            class="text-base tracking-wide leading-5 my-2 flex justify-between"
          >
            <div>
              <input
                :id="todo.id"
                type="checkbox"
                value="todo.id"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                :for="todo.id"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >{{ todo.text }}
              </label>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </li>
        </template>
      </ul>
    </div>
    <div class="mb-5">
      <h3 class="text-lg">In progress</h3>
      <ul>
        <template v-for="todo in todos">
          <li
            v-if="todo.status === 'working'"
            :key="todo.id"
            class="text-base tracking-wide leading-5 my-2"
          >
            <input
              :id="todo.id"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              :for="todo.id"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ todo.text }}</label
            >
          </li>
        </template>
      </ul>
    </div>
    <div class="mb-5">
      <h3 class="text-lg">Done</h3>
      <ul>
        <template v-for="todo in todos">
          <li
            class="text-base tracking-wide leading-5 my-2"
            v-if="todo.status === 'done'"
            :key="todo.id"
          >
            <p
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 line-through ml-0"
            >
              {{ todo.text }}
            </p>
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>
