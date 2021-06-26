<template>
  <h2>League Calendar</h2>
</template>

<script>
import API from "@/API";
import {ref} from "vue";

export default {
  name: "LeagueCalendar",
  setup() {

    const isLoading = ref(false);
    const error = ref(null);
    const competition = ref(null);

    const getSingleCompetition = async (id) => {
      isLoading.value = true;
      try {
        competition.value = await API.getTeams(id);
        console.log(competition.value);
        isLoading.value = false;
      } catch (e) {
        error.value = e;
      }
    };

    getSingleCompetition();
  }
}
</script>

<style scoped>

</style>