import router from "../../../router/index.js";
import localForage from "localforage";

const findActivityById = (state, id) => {
  return state.activities.find((task) => task.id == id);
};
const getSubTaskIndex = (activity, id) => {
  return activity.subTasks.findIndex((task) => task.id == id);
};

const calcTaskProgres = (activity) => {
  const tasks = activity.subTasks.length;
  let doneCounter = 0;
  activity.subTasks.forEach((el) => {
    if (el.status == "done") doneCounter++;
  });
  console.log(tasks, doneCounter);
  if (doneCounter === 0) return 0;
  return Math.round((doneCounter / tasks) * 100);
};

const saveActivitiesLocaly = (state) => {
  localForage.setItem("activities", JSON.parse(JSON.stringify(state.activities)));
  localForage.setItem("lastModified", new Date());
};
const saveActiveTasksLocaly = (state) => {
  localForage.setItem("activeTasks", JSON.parse(JSON.stringify(state.activeTasks)));
  localForage.setItem("lastModified", new Date());
};

export default {
  addNewSubTask({ state }, payload) {
    const activity = findActivityById(state, payload.id);
    const id = new Date().getTime() + Math.random();
    activity.subTasks.push({
      id,
      desc: payload.desc,
      status: "to-do",
    });
    activity.progress = calcTaskProgres(activity);
    saveActivitiesLocaly(state);
  },
  changeSubTaskStatus({ state, commit, dispatch }, payload) {
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
    activity.progress = calcTaskProgres(activity);
    if (activity.progress === 100) {
      commit(
        "dialog/displayDialog",
        {
          msg: `Zadanie ${activity.title} jest już w pełni ukończone. Dezaktywować?`,
          title: "Zadanie ukończone",
          type: "choice",
          activity: activity.id,
          callback: () => {
            dispatch("deactivate", activity.id);
            saveActivitiesLocaly(state);
          },
        },
        { root: true }
      );
    }
    saveActivitiesLocaly(state);
  },
  createActivity({ state }) {
    const activity = {
      id: new Date().getTime() + Math.random(),
      date: new Date(2020, 2, 2),
      title: "",
      progress: 0,
      isActive: false,
      subTasks: [],
    };

    state.activities.push(activity);
    console.log(state.activities);
    saveActivitiesLocaly(state);
    return activity.id;
  },
  updateActiveTasks({ state }, payload) {
    const newDayPlan = state.activeTasks[payload.weekDay].filter(
      (el) => el.id != payload.id
    );
    const activity = findActivityById(state, payload.id);
    if (payload.show) {
      activity.isActive = true;
      newDayPlan.push({ id: payload.id, timeStamps: payload.timeStamps });
    }
    newDayPlan.sort((a, b) => {
      if (a.timeStamps[0] < b.timeStamps[0]) return -1;
      else return 1;
    });
    state.activeTasks[payload.weekDay] = newDayPlan;
    saveActiveTasksLocaly(state);
    saveActivitiesLocaly(state);
  },
  deactivate({ state }, id) {
    id = Number(id);
    const activity = findActivityById(state, id);
    activity.isActive = false;
    console.log(state.activeTasks);
    const newActiveTasks = [];
    state.activeTasks.forEach((weekDay) => {
      weekDay = weekDay.filter((el) => el.id !== id);
      newActiveTasks.push(weekDay);
    });
    state.activeTasks = newActiveTasks;
    saveActiveTasksLocaly(state);
    saveActivitiesLocaly(state);
  },
  resetSubTasks({ state }, id) {
    const activity = findActivityById(state, id);
    activity.subTasks.forEach((subTask) => {
      subTask.status = "to-do";
    });
    activity.progress = 0;
    saveActivitiesLocaly(state);
  },
  deleteActivity({ state, commit, dispatch }, id) {
    const del = () => {
      for (let weekDay = 0; weekDay < 7; weekDay++) {
        dispatch("updateActiveTasks", { show: false, id, weekDay });
      }
      state.activities = state.activities.filter((el) => el.id != id);
    };
    id = Number(id);
    const activity = findActivityById(state, id);
    if (activity.title == "") del();
    else
      commit(
        "dialog/displayDialog",
        {
          msg: `Czy napewno chesz usunąć ${activity.title}?`,
          title: "Usuwanie",
          type: "choice",
          activity: activity.id,
        },
        { root: true }
      );
  },
  deleteSubTask({ state }, payload) {
    const activity = findActivityById(state, payload.activityId);
    activity.subTasks = activity.subTasks.filter((el) => el.id != payload.id);
    activity.progress = calcTaskProgres(activity);
    saveActivitiesLocaly(state);
  },
  delActivity({ state, dispatch }, id) {
    console.log("asas", id);
    for (let weekDay = 0; weekDay < 7; weekDay++) {
      dispatch("updateActiveTasks", { show: false, id, weekDay });
      saveActivitiesLocaly(state);
      saveActiveTasksLocaly(state);
    }
    state.activities = state.activities.filter((el) => el.id != id);
    router.replace("/schedule");
    setTimeout(() => {
      router.replace("/activities");
    }, 1);
  },
  fetchData({state, rootGetters, dispatch}){
      const provider = rootGetters.dataProvider;
      switch(provider){
          case "local":
            localForage.getItem("activities").then(res => {
                if (res === {}) res = [];
                state.activities = res;
            })
           localForage.getItem("activeTasks ").then(res => {
            if (res === {}) res = [];
            state.activeTasks = res;
           });    
            break;
            case "server":
                dispatch("sendRequest", { url: "/api/activities" }, {root: true}).then(res => {
                    state.activities = res;
                });   
                dispatch("sendRequest", { url: "/api/activetasks" }, {root: true}).then(res => {
                    state.activities = res;
                });   

      }
    
  }
};
