import React from 'react';
import AuthorListItem from './AuthorListItem';

const AuthorList = ({authors, handleClick}) => {
  const getFullName = (author) => (
    author ? `${author.first_name} ${author.family_name}` : ''
  );
  const formatDate = (date) => {
    if (date != null) {
      return new Date(Date.parse(date)).toLocaleString(
        'en-AU',
        {year: 'numeric', month: 'long', day: 'numeric'},
      );
    }
    return '';
  };
  return (
    <>
      <div className="inner">
        {Object.keys(authors).map((author) => (
          <AuthorListItem
            key={authors[author]._id}
            id={authors[author]._id}
            authorName={getFullName(authors[author])}
            dateOfBirth={formatDate(authors[author].date_of_birth)}
            dateOfDeath={formatDate(authors[author].date_of_death)}
            handleClick={handleClick}
          />
        ))}

      </div>
    </>
  );
};

export default AuthorList;
