<template>
  <div :key="task.id" v-for="task in tasks">
    <!-- json-server uses generates a id key to identify the tasks whereas
    mongodb uses _id toggle-reminder  and delete-task emits are written
    as they are below to accomodate both -->
    <Task
      @toggle-reminder="$emit('toggle-reminder', task._id || task.id)"
      @delete-task="$emit('delete-task', task._id || task.id)"
      :task="task"
    />
  </div>
</template>

<script>
import Task from './Task';
export default {
  name: 'Tasks',
  props: {
    tasks: Array,
  },
  components: {
    Task,
  },
  emits: ['delete-task', 'toggle-reminder'],
};
</script>
