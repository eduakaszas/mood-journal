
    /* getCurrentMood = () => this.state.moodList.find( mood => mood.isVisible )
    getCurrentMood() {
        const { moodList } = this.state
        
        return moodList.find( mood => mood.isVisible )
    }

    getDifferentMood( e ) {
        const { moodList } = this.state
        let visibleMood = this.getCurrentMood()
        let visibleMoodIndex = moodList.indexOf( visibleMood )

        moodList[ visibleMoodIndex ].isVisible = false 

        if ( e.target.id === 'betterMoods' )
            moodList[ visibleMoodIndex - 1 ].isVisible = true 

        else if ( e.target.id === 'worseMoods' )
            moodList[ visibleMoodIndex + 1 ].isVisible = true

        this.setState({
            moodList
        })
    }*/