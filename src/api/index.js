import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

const getData = axios.create({
 baseURL: `https://candidate.hubteam.com/candidateTest/v3/problem/dataset`,
 params: { userKey: "7a4a748c8ae0569780438c48a376"},
 crossDomain: true,
 headers: {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
 }
})

export const fetchAvailability = () => getData.get('/')