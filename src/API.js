export default class API {
    static API_TOKEN = '0f2f71ca8cae4a93bb5391f0b4c3bfeb';
    static OPTIONS = {
        headers: {'X-Auth-Token': this.API_TOKEN},
        dataType: 'json',
        type: 'GET',
        mode: 'no-cors'
    }

    static async getCompetitions() {
        const url = `http://api.football-data.org/v2/competitions/`;
        return await fetch(url, this.OPTIONS).then(r => r.json());
    }

    static async getTeams(id) {
        const url = `http://api.football-data.org/v2/competitions/${id}/teams`;
        return await fetch(url, this.OPTIONS).then(r => r.json());
    }


}