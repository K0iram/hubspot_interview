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

    console.log(usPartners)
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
    //loop thru the datesArr and check to see if the dates attendance value is higher or
    //equal to the next day and set them the 2 best dates.
    //
    //TODO: fix sorting of dates and return array index.
    let datesArr = Object.entries(dates)
    let currBestDates = {}
    for (var i = 0; i < datesArr.length; i++) {
      if(dates[i+1] && dates[i][1] >= dates[i+1][1]){
        currBestDates['date1'] = dates[i][0]
        currBestDates['date2'] = dates[i+1][0]
      }
    }
    this.setState({
      usaDates: Object.values(currBestDates)
    })
  }

  render() {
    return (
      <div>
        <h1>Best Event Dates</h1>
        <button onClick={() => this.pickBestDates(this.state.usa)}>Get Dates</button>
      </div>
    )
  }
}

export default Home