import axios from 'axios';

const state = {
  // Tasks state
  tasks: [],
};

const getters = {
  allTasks: (state) => state.tasks,
};

const actions = {
  // Fetch all tasks
  async fetchTasks({ commit }) {
    const res = await axios({
      method: 'GET',
      url: `/api/tasks`,
    });
    const data = res.data;
    commit('setAllTasks', data);
  },

  // Toggle reminder
  async toggleReminder({ commit }, updTask) {
    // Using `map` to loop through the array of objects until one with id is found
    //When found get the value of the reminder key and set to the opposite boolean

    // Path the task in the backend
    const res = await axios(`api/tasks/${updTask.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      data: JSON.stringify(updTask),
    });
    const data = res.data;

    //  Commit action (We are accomodating `_id` because of MongoDB)
    commit('toggleReminder', data);
  },
};

const mutations = {
  setAllTasks: (state, data) => {
    state.tasks = data;
  },
  toggleReminder: (state, data) => {
    console.log(state.tasks);
    state.tasks = state.tasks.map((task) => {
      task.id === data.id ? { ...task, remider: data.reminder } : task;
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
