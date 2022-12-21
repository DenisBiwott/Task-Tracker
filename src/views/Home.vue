<template>
  <AddTask v-show="showAddTask" @add-task="addTask" />

  <Tasks
    @toggle-reminder="toggleReminder"
    @delete-task="deleteTask"
    :tasks="allTasks"
  />
</template>

<script>
//TODO: Lookup how to use axios globally.
import axios from 'axios';
import Tasks from '../components/Tasks';
import AddTask from '../components/AddTask';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
  },
  methods: {
    async addTask(task) {
      const res = await axios('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        data: JSON.stringify(task),
      });

      const data = await res.data;

      this.tasks = [...this.tasks, data];
    },

    async deleteTask(id) {
      if (confirm('Are you sure you want to delete this task?')) {
        // Loop through the object and remove those with id different from
        // those provided from click

        const res = await axios.delete(`api/tasks/${id}`, {
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

      // const res = await axios(`api/tasks/${id}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      //   data: JSON.stringify(updTask),
      // });
      // const data = res.data;

      // console.log(this.$store.state.tasks);
      // // TODO: Update tasks in the store
      // this.tasks = this.tasks.map((task) =>
      //   task._id === id ? { ...task, reminder: data.reminder } : task
      // );
      this.$store.dispatch('toggleReminder', updTask);
    },
    async fetchTask(id) {
      const res = await axios({
        method: 'GET',
        url: `api/tasks/${id}`,
      });
      const data = res.data;
      return data;
    },
    ...mapActions(['fetchTasks']),
  },
  computed: {
    ...mapGetters(['allTasks']),
  },
  // SampleData Here Will come from a Backend Eventually (Currently using json-server
  // https://www.npmjs.com/package/json-server)

  // As of now(15-12-22): I have created a correspoding api for this project here:
  // https://github.com/DenisBiwott/Task-Tracker-API
  // Either the above, `json-server` or the instance of the API hosted on cyclic here:
  // https://puce-kingfisher-tutu.cyclic.app/

  async created() {
    this.fetchTasks();
  },
};
</script>
