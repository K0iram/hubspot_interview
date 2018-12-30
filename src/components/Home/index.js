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
    france: [],
    usaDates:[]
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

    console.log(mexPartners)
  }

  pickBestDates = (partners) => {
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
          if(bestDates.hasOwnProperty('date1') && datesArr[i][1] <= bestDates.date1.attendees) {
            bestDates = bestDates
          } else {
            bestDates = {
              'date1': {
                'date': datesArr[i][0],
                'attendees': datesArr[i][1]
              },
              'date2': {
                'date': datesArr[i+1][0],
                'attendees': datesArr[i+1][1]
              }
            }
          }
        }
      }
      this.setState({usaDates: Object.values(bestDates)})
      console.log(dates)
      console.log(Object.values(bestDates))
    }

  render() {
    return (
      <div>
        <h1>Best Event Dates</h1>
        <button onClick={() => this.pickBestDates(this.state.mexico)}>Get Dates</button>
      </div>
    )
  }
}

export default Home