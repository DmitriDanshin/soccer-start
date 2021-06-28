<template>
  <div class="bg-gray-200 flex justify-start m-0 shadow">
    <div class="py-2 relative text-gray-600">
      <input v-model="search"
             class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
             type="search" placeholder="Поиск">
      <div class="absolute right-0 top-0 mt-5 mr-4">
        <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             viewBox="0 0 56.966 56.966" xml:space="preserve"
             width="512px" height="512px">
            <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
          </svg>
      </div>
    </div>

    <div class="my-2 ml-4">
      <select @change="getMatches"
              class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border-2 border-gray-300 focus:outline-none rounded-lg appearance-none focus:shadow-outline">
        <option value="">Выберите лигу</option>
        <option :selected="competitionId === competition.id" :value="competition.id"
                v-for="competition in competitions" :key="competition.id">
          {{ competition.name }}
        </option>
      </select>
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

  <div class="bg-gray-800 p-4 rounded-lg mx-auto mt-4 w-4/5 grid grid-cols-5 gap-4 ">
    <div v-for="match in matches" :key="match.id">
      <div class="mb-2 text-center rounded-lg bg-gray-200 px-2 shadow-md">{{ match.utcDate.replace(/T|Z/g, ' ') }}</div>
      <div>
        <div class="p-2 text-center rounded-lg bg-gray-200 shadow-md cursor-pointer"
             @click="showTeam(match.homeTeam.id)">
          {{ match.homeTeam.name }}
        </div>
        <div class="p-2 text-center rounded-lg bg-gray-200 mt-1 shadow-md cursor-pointer"
             @click="showTeam(match.awayTeam.id)">
          {{ match.awayTeam.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/API";
import {computed, ref} from "vue";

export default {
  name: "LeagueCalendar",
  props: {
    competitionId: {
      type: Number,
      required: false,
      default: 2000,
    },
    competitions: {
      type: Array,
      required: true
    }

  },
  emits: {
    'show-team': Number,
  },

  setup(props, {emit}) {

    const isLoading = ref(false);
    const error = ref(null);
    const singleCompetition = ref(null);
    const search = ref('');
    const fromDateFilter = ref('2016-01-01');
    const toDateFilter = ref('2022-01-01');

    const getSingleCompetition = async (id) => {
      isLoading.value = true;
      try {
        singleCompetition.value = await API.getSingleCompetition(id);
        isLoading.value = false;
      } catch (e) {
        error.value = e;
      }
    };

    const showTeam = (id) => {
      emit('show-team', id);
    }

    const getMatches = (event) => {
      getSingleCompetition(event.target.value);
    }

    getSingleCompetition(props.competitionId);

    const matches = computed(() => {
      return singleCompetition.value?.matches?.filter(match => {

        const filter = search.value.toLowerCase();

        const homeTeam = match.homeTeam.name.toLowerCase().includes(filter);
        const awayTeam = match.awayTeam.name.toLowerCase().includes(filter);

        const fromDate = new Date(fromDateFilter.value);
        const toDate = new Date(toDateFilter.value);

        const matchDate = new Date(match.utcDate);

        const isIncludesToDateRange = (fromDate <= matchDate) && (matchDate <= toDate);

        return (awayTeam || homeTeam) && isIncludesToDateRange;

      });
    });

    return {
      matches, search, fromDateFilter, toDateFilter, getMatches, showTeam
    }

  }
}
</script>

<style scoped>

</style>