export const fetchItems = async (url, history) => {
  try {
    const res = await fetch(url);
    // catch bad request
    const data = await res.json();
    if (res.status !== 200) {
      history.push({pathname: '/error', state: data.errors});
    } else {
      return data;
    }
  } catch (error) {
    // catch server connection problems
    history.push({pathname: '/500'});
  }
};

export const postItems = async (items, history, fetchUrl, redirectUrl) => {
  try {
    const res = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(items),
    });
      // catch bad request
    const data = await res.json();
    if (res.status !== 200) {
      history.push({pathname: '/error', state: data.errors});
    } else if (redirectUrl != null) {
      history.push(redirectUrl);
    } else {
      history.push('/');
    }
  } catch (error) {
    // catch server connection problems
    history.push('/500');
  }
};

export const putItems = async (items, history, fetchUrl, redirectUrl) => {
  try {
    const res = await fetch(fetchUrl, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(items),
    });
      // catch bad request
    const data = await res.json();
    if (res.status !== 200) {
      history.push({ pathname: '/error', state: data.errors });
    } else {
      history.push(redirectUrl);
    }
  } catch (error) {
    // catch server connection problems
    history.push('/500');
  }
};

export const deleteItems = async (history, fetchUrl, redirectUrl) => {
  try {
    const res = await fetch(fetchUrl, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });
      // catch bad request
    const data = await res.json();
    if (res.status !== 200) {
      history.push({ pathname: '/error', state: data.errors });
    } else {
      history.push(redirectUrl);
    }
  } catch (error) {
    // catch server connection problems
    history.push('/500');
  }
};
