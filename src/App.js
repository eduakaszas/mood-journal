import React, { Component } from 'react';

import { Route } from "react-router-dom";
import { Navigation, Entries, EntryLogger, StartPage, LoginPage, SignOutModal } from './components/compIndex.js';
import { Awesome, Happy, Okay, Sad, Angry } from './components/compIndex.js';
import { setEntries, deleteEntry } from './store/modules/entries/actions';
import { loginSuccess } from './store/modules/user/actions';
import { connect } from 'react-redux';
import './App.scss';

let moodList = [
    {
        src: Awesome,
        activeSrc: Awesome,
        label: "Awesome",
        color: "#A2C084"
    },
    {
        src: Happy,
        activeSrc: Happy,
        label: "Happy",
        color: "#F6EC65"
    },
    {
        src: Okay,
        activeSrc: Okay,
        label: "Okay",
        color: "#FFBB5B"
    },
    {
        src: Sad,
        activeSrc: Sad,
        label: "Sad",
        color: "#92AEC7"
    },
    {
        src: Angry,
        activeSrc: Angry,
        label: "Angry",
        color: "#E36371"
    }
];

let basicActivities = [
    {
        label: "Work",
        num: "1",
        faClass: "briefcase"
    },
    {
        label: "Sport",
        num: "2",
        faClass: "volleyball-ball"
    },
    {
        label: "Friends",
        num: "3",
        faClass: "users"
    },
    {
        label: "Food",
        num: "4",
        faClass: "utensils"
    },
    {
        label: "Shopping",
        num: "5",
        faClass: "shopping-cart"
    },
    {
        label: "Date",
        num: "6",
        faClass: "heart"
    },
    {
        label: "Reading",
        num: "7",
        faClass: "book"
    }
];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moodList: moodList,
            chosenMood: null,
            pickedDate: null,
            chosenActivities: [],
            entryNote: null,
            entries: null,
            entryId: null,
            isModalOpen: false
        };

    };

    componentDidMount = () => {
        // this.openModal();
        // this.refreshToken();

        // @TODO: only execute setInterval when logged in
        setInterval(this.refreshToken, 5000);
    }

    chooseMood = e => {
        const { chosenMood } = this.state;
        let clickedMood = e.target.id;

        if ( chosenMood === clickedMood ) {
            clickedMood = null
        }

        this.setState({
            chosenMood: clickedMood
        }, () => {
            console.log( this.state.chosenMood );
        })
    };

    getMoodLog = () => {
        return this.props.entries
    }

    // count how many times a mood item is clicked on
    // moodCounter = () => {
    //     const { chosenMood } = this.state;

    //     const moodLog = this.getMoodLog();

    //     const moodCount = moodLog.filter( e => e.mood === chosenMood );
    //     // console.log( moodCount.length );
    // };

    pickActivities = e => {
        const { chosenActivities } = this.state;

        let clickedActivity = e.target.id;

        // Cannot prevent default because event needs to bubble up for bootstrap, instead return
        // e.preventDefault()
        if ( clickedActivity === "" ) return;

        if ( chosenActivities.includes( clickedActivity ) ) {
            let uniqueActivities = chosenActivities.filter( activity => {
                return activity !== clickedActivity;
            });

            this.setState({
                chosenActivities: uniqueActivities
            });

        } else {
            let updatedActivities = chosenActivities.concat( clickedActivity );

            this.setState({
                chosenActivities: updatedActivities
            }, () => {
                console.log( this.state.chosenActivities );
            })
        }
    };

    getColorOfMood = mood => {
        const { moodList } = this.state;

        const moodContainer = moodList.find( el => el.label === mood );

        if ( !moodContainer ) {
            return
        } else {
            return moodContainer.color
        }
    };

    deleteEntry = key => {
        const token = JSON.parse(localStorage.getItem('token'));

        fetch(`http://localhost:3001/v1/entry`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({key})
        }).then(response => {
            console.log(response)
            return response.text();
        }).then( data => {
            console.log(data)
            console.log(key)
            this.props.dispatch(deleteEntry(key))
        })
    };

    editEntry = id => {
        let moodDatas = this.getMoodLog();
        // first need to pull entires from redux and then call do the put method,
        // because I only update the entry once I hit save
        console.log(id)
        return moodDatas.find(
            entry => entry._id === id ?
                this.setState({
                    entryId: id,
                    chosenMood: entry.mood,
                    chosenActivities: entry.activities,
                    entryNote: entry.notes
                }, () => {
                    console.log( `Mood: ${this.state.chosenMood}, Activities: ${this.state.chosenActivities}, Note: ${this.state.entryNote}, ID: ${this.state.entryId}` )
                })
            : null
        )
    }

    resetValues = () => {
        this.setState({
            chosenMood: null,
            chosenActivities: [],
            entryId: null
        })
    };

    handleDateChange = date => {
        this.setState({
            pickedDate: date
        })
    };

    prepareBarChart = () => {
        const { moodList } = this.state

        const moodLog = this.getMoodLog()

        if ( moodLog === null ) {
            return moodList.map( entry => {
                return { x: entry.label, y: 0 }
            })
        }

        return moodList.map( entry => {
            const moods = moodLog.filter( item => {

                return entry.label === item.mood;
            })

            return { x: entry.label, y: moods.length }
        })
    };

    openModal = () => {
        this.setState({
            // ...this.state,
            isModalOpen : true
        })
        console.log( "Modal open")
    };

    closeModal = () => {
        this.setState({
            // ...this.state,
            isModalOpen : false
        })
    };

    // refreshEntries = () => {
    //     const { userId } = this.props;
    //     const token = JSON.parse(localStorage.getItem('token'))

    //     fetch(`http://localhost:8080/entries?userId=${userId}&secret_token=${token}`)
    //     .then( response => {
    //         // console.log( response);
    //         return response.json();
    //     })
    //     .then( data => {
    //         console.log(data);
    //         this.props.dispatch(setEntries(data))
    //     });
    // }

    // refreshToken = () => {
    //     const accessToken = JSON.parse(localStorage.getItem('token'))
    //     const refreshToken = JSON.parse(localStorage.getItem('refresh-token'))
    //     console.log( accessToken )
    //     console.log( refreshToken )

    //     if ( accessToken ) {
    //         fetch('http://localhost:8080/token', {
    //                 method: 'post',
    //                 headers: {'Content-Type': 'application/json'},
    //                 body: JSON.stringify({ refreshToken })
    //             }).then(response => {
    //                 console.log(response.status)
    //                 if ( response.status === 200 ) {
    //                     return response.json();
    //                 }
    //                 throw response.status
    //                 // return response.json();
    //             }).then( data => {
    //                 localStorage.setItem('token', JSON.stringify(data.token));
    //                 this.props.dispatch(loginSuccess({ username: data.username, userId: data.userId }));
    //             })

    //     } else {
    //         return;
    //     }
    // }

    render() {
        const { moodList, chosenMood, pickedDate, chosenActivities, entries, entryId, entryNote, isModalOpen } = this.state

        return (
            <div>
                <Navigation
                    isModalOpen={ isModalOpen }
                    openModal={ this.openModal }
                />
                <Route
                    exact
                    path="/"
                    render={ props =>
                        <StartPage
                            chooseMood={ this.chooseMood }
                            moodList={ moodList }
                            chosenMood={ chosenMood }
                            pickedDate={ pickedDate }
                            onChange={ this.handleDateChange }
                        />
                    }
                    />
                <Route
                    exact
                    path="/entries"
                    render={ props =>
                        <Entries
                            getMoodLog={ this.getMoodLog }
                            moodList={ moodList }
                            chosenMood={ chosenMood }
                            chosenActivities={ chosenActivities }
                            basicActivities={ basicActivities }
                            pickedDate={ pickedDate }
                            getColorOfMood={ this.getColorOfMood }
                            deleteEntry={ this.deleteEntry }
                            editEntry={ this.editEntry }
                            refreshEntries={ this.refreshEntries }
                        />
                    }
                />
                <Route
                    exact
                    path="/login"
                    render={ props =>
                        <LoginPage
                            refreshEntries={ this.refreshEntries }
                        />
                    }
                />
                {/* <Route
                    path="/stats"
                    render={ props =>
                        <Stats
                            moodCounter={ this.moodCounter }
                            moodLog={ this.getMoodLog() }
                            barData={ this.prepareBarChart() }
                        />
                    }
                /> */}

                <EntryLogger
                    moodList={ moodList }
                    chosenMood={ chosenMood }
                    pickedDate={ pickedDate }
                    moodCounter={ this.moodCounter }
                    getMoodLog={ this.getMoodLog }
                    basicActivities={ basicActivities }
                    chosenActivities={ chosenActivities }
                    pickActivities={ this.pickActivities }
                    resetValues={ this.resetValues }
                    entries= { entries }
                    entryId={ entryId }
                    entryNote={ entryNote }
                    editEntry={ this.editEntry }
                />

                {
                    isModalOpen ?
                        <SignOutModal
                            isModalOpen={ isModalOpen }
                            closeModal={ this.closeModal }
                        />
                        : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        entries: state.entries.entries,
        userId: state.user.userId
    };
};

export default connect(mapStateToProps)(App);
