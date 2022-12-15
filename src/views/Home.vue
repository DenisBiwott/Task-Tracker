<template>
  <AddTask v-show="showAddTask" @add-task="addTask" />

  <Tasks
    @toggle-reminder="toggleReminder"
    @delete-task="deleteTask"
    :tasks="tasks"
  />
</template>

<script>
import Tasks from '../components/Tasks';
import AddTask from '../components/AddTask';

export default {
  name: 'Home',
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async addTask(task) {
      const res = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      this.tasks = [...this.tasks, data];
    },

    async deleteTask(id) {
      if (confirm('Are you sure you want to delete this task?')) {
        // Loop through the object and remove those with id different from
        // those provided from click

        const res = await fetch(`api/tasks/${id}`, {
          method: 'DELETE',
        });

        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task._id !== id))
          : alert('Error Deleting Task');
      }
    },
    async toggleReminder(id) {
      // Using `map` to loop through the array of objects until one with id is found
      //When found get the value of the reminder key and set to the opposite boolean

      const taskToToggle = await this.fetchTask(id);

      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const res = await fetch(`api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updTask),
      });
      const data = res.json();

      this.tasks = this.tasks.map((task) =>
        task._id === id ? { ...task, reminder: data.reminder } : task
      );
    },
    async fetchTasks() {
      const res = await fetch('api/tasks');
      const data = await res.json();
      return data;
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`);
      const data = await res.json();
      return data;
    },
  },
  // SampleData Here Will come from a Backend Eventually (Currently using json-server
  // https://www.npmjs.com/package/json-server)

  // As of now(15-12-22): I have created a correspoding api for this project here:
  // https://github.com/DenisBiwott/Task-Tracker-API
  // Either the above, `json-server` or the instance of the API hosted on cyclic here:
  // https://puce-kingfisher-tutu.cyclic.app/

  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>
