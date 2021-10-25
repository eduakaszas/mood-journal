import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { ActivityLogo, OptionsMenu } from '../../components/compIndex.js';
import { connect } from 'react-redux';
import './Entries.scss';

class Entries extends Component {
  displayEntryItems(moodData) {
    const { moodList, basicActivities, deleteEntry, editEntry, entries } =
      this.props;

    console.log(this.props.entries);
    console.log(this.props.userId);

    if (entries.length === 0) {
      return <h1> No entries </h1>;
    } else {
      let displayedEntries = moodData
        .sort((a, b) => {
          if (a.date > b.date) {
            return -1;
          } else if (a.date < b.date) {
            return 1;
          } else {
            return 0;
          }
        })
        .map((entry) => {
          let displayedImage = moodList
            .map((item) => {
              let src;

              if (entry.mood === item.label) {
                src = item.activeSrc;
              } else {
                return null;
              }

              return (
                <img
                  src={src}
                  className='entry-mood-img'
                  alt={item.label}
                  key={`${item.label}_${src}`}
                />
              );
            })
            .filter((x) => x);

          return (
            <li key={entry._id} className='entry'>
              <div className='entry-img'> {displayedImage} </div>
              <div className='entry-text-content'>
                <div className='entry-date mb-2'>
                  {new Date(entry.date).toLocaleDateString('en-GB')}
                </div>
                <h4 className='entry-mood'>{entry.mood}</h4>
                <div className='activity-entry'>
                  {entry.activities.map((x) => (
                    <ActivityLogo
                      key={`${entry.date}_${x}`}
                      activity={x}
                      basicActivities={basicActivities}
                    />
                  ))}
                </div>
                {entry.notes ? (
                  <div className='entry-note' value={entry.notes}>
                    {' '}
                    {entry.notes}{' '}
                  </div>
                ) : null}
              </div>
              <div className='options'>
                <OptionsMenu
                  deleteEntry={() => deleteEntry(entry._id)}
                  editEntry={() => editEntry(entry._id)}
                />
              </div>
            </li>
          );
        });

      return displayedEntries;
    }
  }

  render() {
    return (
      <Container fluid>
        {/* {
                    this.props.isLoggedIn ? */}
        <div>
          {/* <button onClick={ this.props.refreshEntries }> Click </button> */}
          <ul className='entries'>
            {this.displayEntryItems(this.props.entries)}
          </ul>
        </div>
        {/* : <h1> You're not logged in </h1>
                } */}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries.entries,
    isLoggedIn: state.user.isLoggedIn,
    userId: state.user.userId,
  };
};

export default connect(mapStateToProps)(Entries);
