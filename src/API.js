export default class API {
    static API_TOKEN = 'a94c4dc876174c0794541a34c4989d5c';

    static async getCompetitions(filters = {}) {

        if (Object.keys(filters).length === 0) {
            filters = '';
        }

        const url = `http://api.football-data.org/v2/competitions/${filters}`;

        return await fetch(url, {
            headers: {'X-Auth-Token': this.API_TOKEN},
            dataType: 'json',
            type: 'GET',
        }).then(r => r.json());
    }
}