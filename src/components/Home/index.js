import React, { Component } from 'react'
import data from '../../api/sampleData'


class Home extends Component {
  state = {
    partners: {},
    bestDates: {},
    loaded: false
  }

  componentDidMount() {
    let partners = {}

    data.partners
      .forEach(partner => (
        partners[partner.country]
          ? partners[partner.country].push(partner)
          : partners[partner.country] = [partner]
      ))

    this.setState({partners})
  }

  pickBestDates = (entry) => {
    const [country, partners] = entry
    const dates = {}
    let bestDates = {}

    partners.forEach(partner => {
      partner.availableDates.forEach(date => {
        dates.hasOwnProperty(date) ? (
          dates[date]++
        ) : (
          dates[date] = 1
        )
      })
    })

    const datesArr = Object.entries(dates)
      .sort((a,b) => (
        a[0].split('-').join('') - b[0].split('-').join('')
      ))

    for (let i = 0; i < datesArr.length; i++) {
      if((datesArr[i+1] && datesArr[i][1] === datesArr[i+1][1])){
        if(bestDates.hasOwnProperty(country) && datesArr[i][1] <= bestDates[country].attendeeCount) {
        } else {
          const people = this.state.partners[country].filter(person => person.availableDates.includes(datesArr[i][0]))
          const attendees = people.map(p => p.email)

          bestDates = {
            [country]: {
              'stateDate': datesArr[i][0],
              'attendeeCount': datesArr[i][1],
              'attendees': attendees,
              'name': country
            }
          }
        }
      }
    }

    this.setState((prevstate) => ({
      bestDates: {
        ...prevstate.bestDates,
        ...bestDates
      },
      loaded: true
    }))
  }

  getAllDates = () => {
    Object.entries(this.state.partners).forEach(this.pickBestDates)
  }

  render() {
    const { loaded, bestDates } = this.state
    return (
      <div>
        <h1>Best Event Dates</h1>
        <button onClick={this.getAllDates} disabled={loaded}>Get Dates</button>
          {loaded &&

            Object.values(bestDates).map((date, i) => (
              <div key={i}>
                <h4>{date.name}</h4>
                <p>{date.stateDate}</p>
                <p>Attendee Count: {date.attendeeCount}</p>
              </div>
            ))
          }
      </div>
    )
  }
}

export default Home