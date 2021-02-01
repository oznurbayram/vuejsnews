import axios from 'axios';

export default {

    getData() {
        let promise;
       axios.get('https://newsapi.org/v2/sources?apiKey=102d1f0884d44aef86e8c373a26c6a8f')
          .then(response => {
            promise = response.data.sources
                console.log(response);
             })
        return promise;
    }

}


