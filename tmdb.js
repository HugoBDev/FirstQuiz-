import config from './config.js'



const baseUrl = 'https://api.themoviedb.org/3';

const commonHeader = {
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + config.bearer
    }
}


export default class tmdb {


    // authenticate() {
    //     const url = `${baseUrl}/authentication`

    //     fetch(url, getOptions)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching data:', error);
    //     });
    // }

    /**
     * 
     * @param {*} page 
     * @param {*} language 
     * @returns 
     */
    discoverMovies(page = 1, language = 'fr') {
        const queryParams = {
            include_adult: false,
            include_video: false,
            language: language,
            page: page,
            sort_by: 'popularity.desc'
        };

        const options = {
            method: 'GET',
            ...commonHeader,
        }

        const url = `${baseUrl}/discover/movie?${new URLSearchParams(queryParams).toString()}`

        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch((error) => reject(error));
        })
    };

    /**
     * Cette fonction permet de retourner les credits d'un films, c'est à dire sont casting et 
     * les membres des l'équipe techiniques.
     * Elle retourne une Promise
     * 
     * @param {*} movieId 
     * @param {*} language 
     * @returns 
     */
    getMovieCredits(movieId, language = 'fr') {
        const queryParams = {
            language: language,
        };

        const options = {
            method: 'GET',
            ...commonHeader,
        }

        const url = `${baseUrl}/movie/${movieId}/credits?${new URLSearchParams(queryParams).toString()}`

        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch((error) => reject(error))
        })
    }

    /**
     * 
     * @param {*} movieId 
     * @param {*} language 
     * @returns 
     */
    getMovieDetails(movieId, language = 'fr') {
        const queryParams = {
            language: language,
        };

        const options = {
            method: 'GET',
            ...commonHeader,
        }

        const url = `${baseUrl}/movie/${movieId}?${new URLSearchParams(queryParams).toString()}`

        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch((error) => reject(error))
        })
    }

    /**
     * Cette fonction à pour but de retourner une liste de personnes populaires (globalement des acteurs).
     * 
     * @param {*} page 
     * @param {*} language 
     * @returns 
     */
    getPopularPeople(page = 1, language = 'fr'){
        const queryParams = {
            language: language,
            page: page,
        };

        const options = {
            method: 'GET',
            ...commonHeader,
        }

        const url = `${baseUrl}/person/popular?${new URLSearchParams(queryParams).toString()}`

        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch((error) => reject(error))
        })
    }

};