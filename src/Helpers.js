export default class Helpers {
    static makeURL(activePage, competitionId, teamId) {
        return `?active-page=${activePage}&competition-id=${competitionId}&team-id=${teamId}`
    }
}
