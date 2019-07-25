<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="newTicket">
          <h1 class="h3 mb-3 font-weight-normal">Create Ticket</h1>
          <div class="form-group">
            <label for="name">Select Football Match</label>
            <select v-model="games" class="form-control" name="matchname" required>
              <option disabled value="" selected="selected">Please select one</option>
              <option v-for="match in matchname" :key="match.name" v-bind:value="match.name" required>
                     {{match.name}}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="name">Number of Tickets</label>
            <input type="number" v-model="ticketno" class="form-control" name="ticketno" placeholder="Enter No of Tickets" required>
          </div>
          <button type="submit" class="btn btn-lg btn-primary btn-block">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  data () {
    this.getUser().then(res => {
      this.fullname = res.user.name
      return res
    })
    return {
      fullname: '',
      matchname: [],
      games: '',
      ticketno: ''      
    }
  },
  mounted () {
    this.getMatches()
  },
  methods: {
    getMatches () {
      axios({ method: 'GET', url: 'http://localhost/TicketsPortal/public/api/footballmatches' }).then(result => {
          this.matchname = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    getUser () {
      return axios.get('http://localhost/TicketsPortal/public/api/profile', {
        headers: { Authorization: `Bearer ${localStorage.usertoken}` }
      }
      ).then(res => {
        // console.log(res.data)
        return res.data
      })
        .catch(err => {
          console.log(err)
        })
    },
    newTicket () {
      axios.post('http://localhost/TicketsPortal/public/api/newticket',
        {
          games: this.games,
          ticketno: this.ticketno,
          created_by: this.fullname
        }
      ).then((res) => {
        console.log(res)
        router.push({ name: 'Tickets' })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>