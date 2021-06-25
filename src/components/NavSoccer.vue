<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button type="button"
                  class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a v-for="page in pages" :key="page.id" href="#"
                 :class="page.page === activePage ? 'bg-gray-900' : ''" @click="setActivePage(page.page)"
                 class=" text-white px-3 py-2 rounded-md text-sm font-medium">{{ page.title }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
import {ref} from "vue";

export default {
  name: "NavSoccer",
  props: {
    activePage: {
      type: String,
      required: true,
    }
  },
  setup(props, {emit}) {
    const pages = ref([
      {
        id: 0,
        title: 'Список лиг',
        page: 'leagues'
      },
      {
        id: 1,
        title: 'Список команд',
        page: 'teams'
      },
      {
        id: 2,
        title: 'Календарь лиги',
        page: 'league-calendar'
      },
      {
        id: 3,
        title: 'Календарь одной команды',
        page: 'team-calendar'
      },
    ]);
    const setActivePage = (page) => {
      emit('set-page', page);
    };

    return {pages, setActivePage};
  }
}
</script>

<style scoped>

</style>