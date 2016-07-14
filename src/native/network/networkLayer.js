function parseJSON(res) {
  if (res.status !== 200) {
    throw new Error('Invalid request.');
  }

  return res.json().then(json => json.data);
}

// TODO abstraction
export default (token) => ({
  performQuery(endpoint, query, variables) {
    const opts = {
      method: 'post',
      fetchTimeout: 30000,
      retryDelays: [5000, 10000],
      headers: {
        'Accept': 'application/json', //eslint-disable-line
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      // credentials: 'same-origin',
      body: JSON.stringify({ query, variables }),
    };

    return fetch(endpoint, opts)
      .then(parseJSON);
  },

  performMutation(endpoint, mutation, variables, files) {
    if (!files) {
      return fetch(endpoint, {
        method: 'post',
        fetchTimeout: 30000,
        retryDelays: [5000, 10000],
        headers: {
          'Accept': 'application/json', // eslint-disable-line
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        // credentials: 'same-origin',
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      }).then(parseJSON);
    }

    const formData = new FormData();
    formData.append('query', mutation);
    formData.append('variables', JSON.stringify(variables));
    if (files) {
      for (const filename in files) {
        if (files.hasOwnProperty(filename)) {
          formData.append(filename, files[filename]);
        }
      }
    }

    return fetch(endpoint, {
      method: 'post',
      credentials: 'same-origin',
      body: formData,
    }).then(parseJSON);
  },
});
