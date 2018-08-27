import React from 'react';

const ResultsList = props => {
  const renderResult = friend => (
    <div key={`friend-${friend.id}`} className="friend">
      {friend.name}<div className="username">{friend.username}</div>
    </div>
  );

  const { matches } = props;
  return (
    <div className="results">
      {matches.length > 0 ?
        matches.map(renderResult) :
        <span>No matches found</span>
      }
    </div>
  );
}

export default ResultsList;
