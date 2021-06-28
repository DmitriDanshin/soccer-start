<template>
  <nav-soccer :active-page="activePage" @set-page="setPage"/>
  <leagues-table v-if="activePage === 'leagues'" @show-teams="showTeams"/>
  <teams-table v-else-if="activePage === 'teams'" :competitions="listOfCompetitions" :competitionId="competitionId"/>
  <league-calendar v-else-if="activePage === 'league-calendar'" @show-team="showTeam"
                   :competitions="listOfCompetitions"/>
  <team-calendar v-else-if="activePage === 'team-calendar'" :teamId="teamId" :competitions="listOfCompetitions"/>
</template>

<script>
import {ref} from "vue"

import NavSoccer from "@/components/NavSoccer";
import LeaguesTable from "@/components/LeaguesTable";
import TeamsTable from "@/components/TeamsTable";
import LeagueCalendar from "@/components/LeagueCalendar";
import TeamCalendar from "@/components/TeamCalendar";
import API from "@/API";
import {useStore} from "vuex";

export default {
  name: "SoccerWrapper",
  components: {TeamCalendar, LeagueCalendar, TeamsTable, LeaguesTable, NavSoccer},

  setup() {
    const store = useStore();
    const activePage = ref('');
    const competitionId = ref(0);
    const teamId = ref(0);
    const listOfCompetitions = ref([]);

    store.state.competitionId = new URL(document.location).searchParams.get('competition-id');
    store.state.teamId = new URL(document.location).searchParams.get('team-id');
    store.state.activePage = new URL(document.location).searchParams.get('active-page');


    const getListOfCompetitions = async () => {
      listOfCompetitions.value = await API.getCompetitions();
      listOfCompetitions.value = listOfCompetitions.value.competitions.map(c => {
        return {'name': c.name, 'id': c.id}
      })
    };

    getListOfCompetitions();

    const showTeams = (id) => {
      activePage.value = 'teams';
      competitionId.value = id;
    };

    const showTeam = (id) => {
      activePage.value = 'team-calendar';
      teamId.value = id;
    }

    const setPage = (page) => {
      activePage.value = page;
    };

    if (store.state.activePage) {
      setPage(store.state.activePage);
    } else {
      setPage('leagues');
    }


    return {
      activePage, competitionId, listOfCompetitions, teamId, setPage, showTeams, showTeam
    }
  }
}
</script>

<style scoped>

</style>