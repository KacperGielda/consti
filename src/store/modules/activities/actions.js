const findActivityById = (state, id) => {
  return state.activities.find((task) => task.id == id);
};
const getSubTaskIndex = (activity, id) => {
  return activity.subTasks.findIndex((task) => task.id == id);
};

// const calcTaskProgres = (activity) => {
//   const tasks = activity.subTasks.length();
//   let doneCounter = 0;
//   activity.subTasks.forEach(
//     el => {
//       if (el.status == "done") doneCounter++;
//     }
//   );
//   return tasks / doneCounter * 100;
// }

export default {
  addNewSubTask({ state }, payload) {
    const activity = findActivityById(state, payload.id);
    const id = new Date().getTime() + Math.random();
    activity.subTasks.push({
      id,
      desc: payload.desc,
      status: "to-do",
    });
    console.log(activity.subTasks);
  },
  changeSubTaskStatus({ state }, payload) {
    const activity = findActivityById(state, payload.activityId);
    const subTask =
      activity.subTasks[getSubTaskIndex(activity, payload.subTaskId)];
    switch (subTask.status) {
      case "to-do":
        subTask.status = "in-progress";
        break;
      case "in-progress":
        subTask.status = "done";
        break;
      case "done":
        subTask.status = "to-do";
        break;
    }
  },
  createActivity({ state }) {

    const activity = {
      id: new Date().getTime() + Math.random(),
      date: new Date(2020, 2, 2),
      title: "",
      progress: 0,
      isActive: false,
      subTasks: [],
    }

    state.activities.push(activity);
    console.log(state.activities);
    return activity.id;
  },
  updateActiveTasks({ state }, payload) {
    const newDayPlan = state.activeTasks[payload.weekDay].filter(el => el.id != payload.id);
    if (payload.show) newDayPlan.push({ id: payload.id, timeStamps: payload.timeStamps });
    newDayPlan.sort((a, b) => {
      if (a.timeStamps[0] < b.timeStamps[0])
        return -1;
      else return 1;
    })
    state.activeTasks[payload.weekDay] = newDayPlan;
  }
};
