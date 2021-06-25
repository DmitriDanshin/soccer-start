<template>
  <nav-soccer :active-page="activePage" @set-page="setPage"/>
  <leagues-table v-if="activePage === 'leagues'"/>
  <teams-table v-else-if="activePage === 'teams'"/>
  <league-calendar v-else-if="activePage === 'league-calendar'"/>
  <team-calendar v-else-if="activePage === 'team-calendar'"/>
</template>

<script>
import NavSoccer from "@/components/NavSoccer";
import LeaguesTable from "@/components/LeaguesTable";
import {ref} from "vue";
import TeamsTable from "@/components/TeamsTable";
import LeagueCalendar from "@/components/LeagueCalendar";
import TeamCalendar from "@/components/TeamCalendar";

export default {
  name: "SoccerWrapper",
  components: {TeamCalendar, LeagueCalendar, TeamsTable, LeaguesTable, NavSoccer},
  setup() {
    const activePage = ref('leagues');
    const setPage = (page) => {
      activePage.value = page;
    };
    return {
      activePage, setPage
    }
  }
}
</script>

<style scoped>

</style>