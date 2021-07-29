import React from 'react';
import GenreListItem from './GenreListItem';

const GenreList = ({genres, handleClick}) => (
  <>
    <div className="inner">
      {Object.keys(genres).map((genre) => (
        <GenreListItem
          key={genres[genre]._id}
          id={genres[genre]._id}
          genreName={genres[genre].name}
          handleClick={handleClick}
        />
      ))}

    </div>
  </>
);

export default GenreList;
