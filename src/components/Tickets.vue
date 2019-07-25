<template>
  <div class="container"><br>
    <h1 class="h3 mb-3 font-weight-normal">Your Tickets</h1>
   <table class="table col-md-6 mx-auto">
    <thead>
      <tr>
        <th>Match</th>
        <th>No of Tickets</th>
        <th>Created By</th>
        <th>Updated By</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(ticket) in tickets">
        <td>{{ticket.games}}</td>
        <td>{{ticket.ticketno}}</td>
        <td>{{ticket.created_by}}</td>
        <td>{{ticket.updated_by}}</td>
        <button v-on:click="editTicket(ticket.id,ticket.games,ticket.ticketno)" class=" btn btn-primary ">Edit</button>
      </tr>
    </tbody>
  </table>
  <div class="col-md-6 mt-5 mx-auto" v-if="this.show">
      <form v-on:submit.prevent="updateTicket">
        <h1 class="h3 mb-3 font-weight-normal">Edit Ticket</h1>
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
        <button type="submit" class="btn btn-lg btn-primary btn-block">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    this.getUser().then(res => {
      this.fullname = res.user.name
      return res
    })
    return {
      fullname: '',
      tickets: [],
      games: '',
      id: '',
      ticketno: '',
      matchname: [],
      show: false
    }
  },
  mounted () {
    this.getTickets(),
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
    getTickets () {
      axios({ method: 'GET', url: 'http://localhost/TicketsPortal/public/api/allticket' }).then(result => {
          this.tickets = result.data
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
        return res.data
      })
        .catch(err => {
          console.log(err)
        })
    },
    editTicket (id, games, ticketno) {
      this.id = id
      this.games = games
      this.ticketno = ticketno
      this.show = true
    },
    updateTicket () {    
      axios.put('http://localhost/TicketsPortal/public/api/updateticket/'+this.id,
        {
          games: this.games,
          ticketno: this.ticketno,
          updated_by: this.fullname
        }
      ).then((res) => {
        this.show = false
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>