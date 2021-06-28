import {createStore} from 'vuex'

export default createStore({
    state: {
        competitionId: 0,
        teamId: 0,
        activePage: 'leagues',
    },
    getters: {
        competitionId: state => {
            if (isNaN(+state.competitionId)) {
                state.competitionId = 0;
                return 0;
            }
            return +state.competitionId;
        },
        teamId: state => {
            if (isNaN(+state.teamId)) {
                state.teamId = 0;
                return 0;
            }
            return +state.teamId;
        },
    },
})
