
const HTTP_REQUEST = {
    get : (url, call) => {
      fetch(
        url,
        {
            method : 'get',
            headers : { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        }
      )
      .then(res => res.json())
      .then( result => call(result), error => call(null, error) );
    },
    post : (url, body, headers, call) => {
      fetch(
          url,
          {
            method : 'post',
            headers,
            body : JSON.stringify(body)
          },
          )
      .then(res => res.json())
      .then( result => call(result), error => call(false, error) );
    }
  }