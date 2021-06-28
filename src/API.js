export default class API {
    static API_TOKEN = '';
    static OPTIONS = {
        headers: {'X-Auth-Token': this.API_TOKEN},
        dataType: 'json',
        type: 'GET',
    }

    static async getCompetitions() {
        const url = new URL(`https://api.football-data.org/v2/competitions/`);
        return await fetch(url.href, this.OPTIONS).then(r => r.json());
    }

    static async getTeams(id) {
        const url = new URL(`https://api.football-data.org/v2/competitions/${id}/teams`);
        return await fetch(url.href, this.OPTIONS).then(r => r.json());
    }

    static async getSingleCompetition(id) {
        const url = new URL(`https://api.football-data.org/v2/competitions/${id}/matches/`);
        return await fetch(url.href, this.OPTIONS).then(r => r.json());
    }

    static async getSingleTeam(id) {
        const url = new URL(`https://api.football-data.org/v2/teams/${id}/matches`);
        return await fetch(url.href, this.OPTIONS).then(r => r.json());
    }


}