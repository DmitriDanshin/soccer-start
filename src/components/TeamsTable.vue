<template>

  <menu class="bg-gray-200 flex justify-start m-0 shadow">
    <div class="py-2 relative text-gray-600">
      <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
             type="search" placeholder="Поиск" v-model="search">
      <div class="absolute right-0 top-0 mt-5 mr-4">
        <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
             id="Capa_1" x="0px" y="0px"
             viewBox="0 0 56.966 56.966" xml:space="preserve"
             width="512px" height="512px">
            <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
          </svg>
      </div>
    </div>
  </menu>

  <div class="flex flex-col">
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
            <tr v-for="team in teams" :key="team.id">
              <td
                  class="px-6 py-4 whitespace-nowrap">
                {{ team.shortName }}
              </td>
              <td
                  class="px-6 py-4 whitespace-nowrap">
                {{ team.area.name }}
              </td>
              <td
                  class="px-6 py-4 whitespace-nowrap">
                {{ team.founded }}
              </td>
              <td
                  class="px-6 py-4 whitespace-nowrap">
                <a :href="team.website">
                  {{ team.website }}
                </a>
              </td>
              <td
                  class="px-6 py-4 whitespace-nowrap">
                {{ team.address }}
              </td>
              <td
                  class="px-6 py-4 whitespace-nowrap">
                {{ team.phone }}
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
import {ref, computed} from "vue";

export default {
  name: "TeamsTable",
  props: {
    competitionId: {
      type: Number,
      required: true
    }
  },

  setup(props) {

    const isLoading = ref(false);
    const error = ref(null);
    const listOfTeams = ref({});
    const tableHeaders = ref([
      {
        id: 0,
        title: 'НАЗВАНИЕ ',
      },
      {
        id: 1,
        title: 'СТРАНА',
      },
      {
        id: 2,
        title: 'ДАТА ОСНОВАНИЯ',
      },
      {
        id: 3,
        title: 'САЙТ',
      },
      {
        id: 4,
        title: 'АДРЕС',
      },
      {
        id: 5,
        title: 'НОМЕР ТЕЛЕФОНА',
      },
    ]);

    const search = ref('');

    const getListOfTeams = async () => {
      isLoading.value = true;
      try {
        listOfTeams.value = await API.getTeams(props.competitionId);

        isLoading.value = false;
      } catch (e) {
        error.value = e;
      }
    };

    getListOfTeams();

    const teams = computed(() => {

      return listOfTeams.value.teams?.filter((team) => {

        const filter = search.value.toLowerCase();

        const founded = String(team.founded).includes(filter)
        const country = team.area.name.toLowerCase().includes(filter)
        const name = team.shortName.toLowerCase().includes(filter);
        const website = team.website.toLowerCase().includes(filter);
        const address = team.address.toLowerCase().includes(filter);
        const phone = team.phone.toLowerCase().includes(filter);

        return founded || name || website || address || phone || country;
      });
    })

    return {
      isLoading, error, teams, tableHeaders, search
    }
  },
}
</script>

<style scoped>

</style>