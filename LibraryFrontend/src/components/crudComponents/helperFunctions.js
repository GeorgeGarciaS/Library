export const fetchItems = async (url, history) => {
  try {
    const res = await fetch(url);
    // catch bad request
    const data = await res.json();
    if (res.status !== 200) {
      history.push({ pathname: '/error', state: data.errors });
    } else {
      return data;
    }
  } catch (error) {
    // catch server connection problems
    history.push('/500');
  }
};

export const postBook = async (book, history) => {
  try {
    const res = await fetch('http://localhost:8000/books', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(book),
    });
      // catch bad request
    const data = await res.json();
    if (res.status !== 200) {
      history.push({ pathname: '/error', state: data.errors });
    } else {
      history.push('/');
    }
  } catch (error) {
    // catch server connection problems
    history.push('/500');
  }
};

export const putBook = async (id, book, history) => {
  try {
    const res = await fetch(`http://localhost:8000/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(book),
    });
      // catch bad request
    const data = await res.json();
    if (res.status !== 200) {
      history.push({ pathname: '/error', state: data.errors });
    } else {
      history.push('/');
    }
  } catch (error) {
    // catch server connection problems
    history.push('/500');
  }
};
