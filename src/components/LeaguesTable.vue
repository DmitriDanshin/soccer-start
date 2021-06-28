<template>

  <div class="flex flex-col">

    <div class="bg-gray-200 flex justify-start m-0 shadow">
      <div class="py-2 relative text-gray-600">
        <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
               type="search" placeholder="Поиск" v-model="search">
        <div class="absolute right-0 top-0 mt-5 mr-4">
          <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 56.966 56.966" xml:space="preserve"
               width="512px" height="512px">
            <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
          </svg>
        </div>
      </div>
      <div class="flex flex-col  ml-4">
        <div class="mx-2">
          Выбор промежутка:
        </div>
        <div>
          <span class="mx-2">С</span>
          <input v-model="fromDateFilter" class="p-1 mb-1 inline-block rounded-lg" type="date">
          <span class="mx-2">По</span>
          <input v-model="toDateFilter" class="p-1 mb-1 inline-block rounded-lg" type="date">
        </div>
      </div>
    </div>

    <div v-if="!isLoading" class="-my-2 overflow-x-auto ">
      <div class="py-2 align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th v-for="header in tableHeaders" :key="header.id" scope="col"
                  class="w-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                {{ header.title }}
              </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="competition in competitions" :key="competition.id">
              <td @click="showTeams(competition.id)"
                  class="px-6 py-4 whitespace-nowrap">
                <a href="#">{{ competition.name }}</a>
              </td>
              <td
                  class="px-6 py-4 whitespace-nowrap">
                {{ competition.currentSeason?.startDate }}
              </td>
              <td
                  class="px-6 py-4 whitespace-nowrap">
                {{ competition.currentSeason?.endDate }}
              </td>
              <td
                  class="px-6 py-4 whitespace-nowrap">
                {{ competition.area?.name }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="mx-auto mt-2 " v-else>Loading...</div>
  </div>
</template>

<script>

import API from "@/API";
import {ref, computed} from 'vue';

export default {
  name: "LeaguesTable",

  emits: {
    'show-teams': Number,
  },

  setup(props, {emit}) {

    const isLoading = ref(false);
    const error = ref(null);
    const listOfCompetitions = ref({});
    const tableHeaders = ref([
      {
        id: 0,
        title: 'НАЗВАНИЕ ',
      },
      {
        id: 1,
        title: 'НАЧАЛО',
      },
      {
        id: 2,
        title: 'КОНЕЦ',
      },
      {
        id: 3,
        title: 'МЕСТО ПРОВЕДЕНИЯ',
      },
    ]);
    const search = ref('');

    const fromDateFilter = ref('2010-01-01');
    const toDateFilter = ref(new Date().toISOString().slice(0, 10));

    const showTeams = (id) => {
      emit('show-teams', id);
    }


    const getListOfCompetitions = async () => {
      isLoading.value = true;
      try {
        listOfCompetitions.value = await API.getCompetitions();
        isLoading.value = false;
      } catch (e) {
        error.value = e;
      }
    };

    getListOfCompetitions();

    const competitions = computed(() => {

      return listOfCompetitions.value.competitions.filter(competition => {

        const filter = search.value.toLowerCase();

        const name = competition.name.toLowerCase().includes(filter);
        const startDate = competition.currentSeason?.startDate.includes(filter);
        const endDate = competition.currentSeason?.endDate.includes(filter);
        const area = competition.area?.name.toLowerCase().includes(filter);

        const fromDate = new Date(fromDateFilter.value);
        const toDate = new Date(toDateFilter.value);

        const fromCompetitionDate = new Date(competition.currentSeason?.startDate);
        const toCompetitionDate = new Date(competition.currentSeason?.startDate);

        const isIncludesToDateRange = (fromDate <= fromCompetitionDate) && (toCompetitionDate <= toDate);

        return (name || startDate || endDate || area) && isIncludesToDateRange;
      });
    });

    return {isLoading, error, competitions, tableHeaders, search, fromDateFilter, toDateFilter, showTeams};

  }
}
</script>

<style scoped>

</style>