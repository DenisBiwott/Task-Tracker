<template>
    <div class="container">
      <Header
        @toggle-add-task="toggleAddTask"
        title="Task Tracker"
        :showAddTask="showAddTask"
      />
      <div v-show="showAddTask">
        <AddTask @add-task="addTask" /> 
      </div>

      <Tasks 
        @toggle-reminder="toggleReminder"
        @delete-task="deleteTask" :tasks="tasks"/>
    </div>
  
</template>

<script>

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

export default {
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask,
  },
  data () {
    return {
      tasks: [],
      showAddTask: false,
    }
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask
    },

    async addTask(task) {

      const res = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })

      const data = await res.json()

      this.tasks = [...this.tasks, data]
    },

    async deleteTask(id) {
      if(confirm('Are you sure you want to delete this task?')){
        // Loop through the object and remove those with id different from
        // those provided from click

        const res = await fetch(`api/tasks/${id}`, {
          method: 'DELETE',
        })

        res.status === 200 ? (
          this.tasks = this.tasks.filter((task) => task.id !== id)) : alert('Error Deleting Task')
        
      }
    },
    async toggleReminder(id) {
      // Using `map` to loop through the array of objects until one with id is found
      //When found get the value of the reminder key and set to the opposite boolean

      const taskToToggle = await this.fetchTask(id)
      
      const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

      const res = await fetch(`api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      })
      const data = res.json()

      this.tasks = this.tasks.map( (task) => task.id === id ? {...task, reminder: data.reminder }: task)
    },
    async fetchTasks () {
      const res = await fetch('api/tasks')
      const data = await res.json()
      return data
    },
    async fetchTask (id) {
      const res = await fetch(`api/tasks/${id}`)
      const data = await res.json()
      return data
    }
  },
  // SampleData Here Will come from a Backend Eventaully (Currently using json-server 
  // https://www.npmjs.com/package/json-server)
  async created() {
    this.tasks = await this.fetchTasks()
    console.log(this.tasks)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
