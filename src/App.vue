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
      showAddTask: true,
    }
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask
    },

    addTask(task) {
      this.tasks = [...this.tasks, task]
    },

    deleteTask(id) {
      if(confirm('Are you sure you want to delete this task?')){
        // Loop through the object and remove those with id different from
        // those provided from click
        this.tasks = this.tasks.filter((task) => task.id !== id)
      }
    },
    toggleReminder(id) {
      // Using `map` to loop through the array of objects until one with id is found
      //When found get the value of the reminder key and set to the opposite boolean
      this.tasks = this.tasks.map( (task) => task.id === id ? {...task, reminder: !task.reminder}: task)
    }
  },
  // SampleData Here Will come from a Backend Eventaully
  created() {
    this.tasks = [
      {
        id: 1,
        text:"Write Code",
        day: "March 1st at 2:30pm",
        reminder: true,
      },
      {
        id: 2,
        text:"Read Django Docs",
        day: "March 1st at 4:30pm",
        reminder: true,
      },
      {
        id: 3,
        text:"Study Vue",
        day: "March 1st at 5:30pm",
        reminder: true,
      },
      {
        id: 4,
        text:"Play FIFA",
        day: "September 2nd at 5:30pm",
        reminder: false,
      }
      ,
      {
        id: 5,
        text:"Read a book",
        day: "October 4th at 5:30pm",
        reminder: true,
       }
    ]
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
