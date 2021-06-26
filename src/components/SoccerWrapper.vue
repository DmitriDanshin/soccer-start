<template>
  <nav-soccer :active-page="activePage" @set-page="setPage"/>
  <leagues-table v-if="activePage === 'leagues'" @show-teams="showTeams"/>
  <teams-table v-else-if="activePage === 'teams'" :competitionId="competitionId"/>
  <league-calendar v-else-if="activePage === 'league-calendar'"/>
  <team-calendar v-else-if="activePage === 'team-calendar'"/>
</template>

<script>
import {ref} from "vue"

import NavSoccer from "@/components/NavSoccer";
import LeaguesTable from "@/components/LeaguesTable";
import TeamsTable from "@/components/TeamsTable";
import LeagueCalendar from "@/components/LeagueCalendar";
import TeamCalendar from "@/components/TeamCalendar";

export default {
  name: "SoccerWrapper",
  components: {TeamCalendar, LeagueCalendar, TeamsTable, LeaguesTable, NavSoccer},
  setup() {

    const activePage = ref('leagues');
    const competitionId = ref(0);

    const showTeams = (id) => {
      activePage.value = 'teams';
      competitionId.value = id;
    };

    const setPage = (page) => {
      activePage.value = page;
    };

    return {
      activePage, competitionId, setPage, showTeams
    }
  }
}
</script>

<style scoped>

</style>