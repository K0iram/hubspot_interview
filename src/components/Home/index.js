import React, { Component } from 'react'
import { fetchAvailability } from '../../api'
import data from '../../api/sampleData'


class Home extends Component {
  state = {
    usa: [],
    ireland: [],
    mexico: [],
    spain: [],
    canada: [],
    singapore: [],
    japan: [],
    uk: [],
    france: []
  }

  componentDidMount() {
    const usPartners = data.partners.filter(partner => partner.country === "United States")
    const irePartners = data.partners.filter(partner => partner.country === "Ireland")
    const mexPartners = data.partners.filter(partner => partner.country === "Mexico")
    const spaPartners = data.partners.filter(partner => partner.country === "Spain")
    const canPartners = data.partners.filter(partner => partner.country === "Canada")
    const singPartners = data.partners.filter(partner => partner.country === "Singapore")
    const japPartners = data.partners.filter(partner => partner.country === "Japan")
    const ukPartners = data.partners.filter(partner => partner.country === "United Kingdom")
    const fraPartners = data.partners.filter(partner => partner.country === "France")

    this.setState({
      usa: usPartners,
      mexico: mexPartners,
      ireland: irePartners,
      spain: spaPartners,
      canada: canPartners,
      singapore: singPartners,
      japan: japPartners,
      uk: ukPartners,
      france: fraPartners,
    })
  }

  pickBestDates = (partners, country) => {
      let dates = {}
      partners.map(partner => {
        partner.availableDates.forEach(date => {
          dates.hasOwnProperty(date) ? (
            dates[date]++
          ) : (
            dates[date] = 1
          )
        })
      })

      let datesArr = Object.entries(dates).sort((a,b) => a[0].split('-').join('') - b[0].split('-').join(''))

      let bestDates = {}

      for (let i = 0; i < datesArr.length; i++) {
        if((datesArr[i+1] && datesArr[i][1] === datesArr[i+1][1])){
          if(bestDates.hasOwnProperty('startDate') && datesArr[i][1] <= bestDates.startDate.attendeeCount) {
            bestDates = bestDates
          } else {
            let people = this.state[country].filter(person => person.availableDates.includes(datesArr[i][0]))
            let attendees = people.map(p => p.email)

            bestDates = {
              'startDate': {
                'date': datesArr[i][0],
                'attendeeCount': datesArr[i][1],
                'attendees': attendees,
                'name': country
              }
            }
          }
        }
      }
      this.setState({[country]: Object.values(bestDates)})
    }

    getAllDates = (countries) => {
      countries.forEach(country => {
        return this.pickBestDates(country[1], country[0])
      })
    }

  render() {
    const countriesArr = Object.entries(this.state)
    return (
      <div>
        <h1>Best Event Dates</h1>
        <button onClick={() => this.getAllDates(countriesArr)} disabled={this.state.usa.length === 1}>Get Dates</button>
        { this.state.usa.length === 1 &&
          <div>
            {JSON.stringify(this.state)}
          </div>
        }
      </div>
    )
  }
}

export default Home