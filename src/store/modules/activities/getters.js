export default {
    activeTasks(state) {
        return state.activeTasks;
    },
    taskById(state)  {
        return (id) => {
            return state.tasks.find((task) => task.id === id);
        };
    },
};
