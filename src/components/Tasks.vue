<template>
    <div :key="task._id" v-for="task in tasks">
        <Task
            @toggle-reminder="$emit('toggle-reminder', task._id)"
            @delete-task="$emit('delete-task', task._id)"
            :task="task"/>
    </div>

    
</template>ß

<script>
import Task from './Task'
export default {
    name: 'Tasks',
    props: {
        tasks: Array,
    },
    components: {
        Task
    },
    emits: ['delete-task', 'toggle-reminder']
}
</script>