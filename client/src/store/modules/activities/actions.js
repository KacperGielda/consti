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
  if (doneCounter === 0) return 0;
  return Math.round((doneCounter / tasks) * 100);
};
const sendDeactivationPrompt = (activity, commit) => {
  if (activity.progress === 100) {
    commit(
      "dialog/displayDialog",
      {
        msg: `Zadanie ${activity.title} jest już w pełni ukończone. Dezaktywować?`,
        title: "Zadanie ukończone",
        type: "choice-deactivate",
        activity: activity.id,
      },
      { root: true }
    );
  }
};

const saveActivitiesLocaly = async (state) => {
  localForage.setItem(
    "activities",
    JSON.parse(JSON.stringify(state.activities))
  );
  localForage.setItem("lastModified", new Date());
};
const saveActiveTasksLocaly = async (state) => {
  localForage.setItem(
    "activeTasks",
    JSON.parse(JSON.stringify(state.activeTasks))
  );
  localForage.setItem("lastModified", new Date());
};

export default {
  fetchData({ state, rootGetters, dispatch }) {
    const provider = rootGetters.dataProvider;
    switch (provider) {
      case "local":
        localForage.getItem("activities").then((res) => {
          if (!res) res = [];
          state.activities = res;
        });
        localForage.getItem("activeTasks").then((res) => {
          if (!res) res = [[], [], [], [], [], [], [], []];
          state.activeTasks = res;
        });
        break;
      case "server":
        dispatch(
          "sendRequest",
          { url: "/api/activities" },
          { root: true }
        ).then((res) => {
          state.activities = res.data;
          saveActivitiesLocaly(state, dispatch);
        });
        dispatch(
          "sendRequest",
          { url: "/api/activetasks" },
          { root: true }
        ).then((res) => {
          state.activeTasks = res.data;
          saveActiveTasksLocaly(state, dispatch);
        });
    }
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //activities
  //////////////////////////////////////////////////////////////////////////////////////////////////

  createActivity({ state, dispatch, rootGetters }) {
    const activity = {
      id: new Date().getTime() + Math.random(),
      date: new Date(2020, 2, 2),
      title: "",
      progress: 0,
      isActive: false,
      subTasks: [],
    };

    state.activities.push(activity);
    saveActivitiesLocaly(state, dispatch);
    if (rootGetters.canSendRequest) {
      dispatch(
        "sendRequest",
        {
          url: `/api/activities/`,
          method: "post",
          data: {
            ...activity,
          },
        },
        { root: true }
      );
    }
    return activity.id;
  },

  changeTitle({ state, dispatch, rootGetters }, { id, title}) {
    if(!title || title == "") return;
    const activity = findActivityById(state, id);
    (activity.title = title), saveActivitiesLocaly(state, dispatch);

    if (rootGetters.canSendRequest) {
      dispatch(
        "sendRequest",
        {
          url: `/api/activities/${activity.id}`,
          method: "put",
          data: {
            ...activity,
          },
        },
        { root: true }
      );
    }
  },

  deleteActivity({ state, commit, dispatch }, id) {
    id = Number(id);
    const activity = findActivityById(state, id);
    if (activity.title == "") dispatch('delActivity',id);
    else commit(
        "dialog/displayDialog",
        {
          msg: `Czy napewno chesz usunąć ${activity.title}?`,
          title: "Usuwanie",
          type: "choice-delete",
          activity: activity.id,
        },
        { root: true }
      );
  },
  delActivity({ state, dispatch, rootGetters }, id) {
    for (let weekDay = 0; weekDay < 7; weekDay++) {
      dispatch("updateActiveTasks", { show: false, id, weekDay, save: false });
    }
    state.activities = state.activities.filter((el) => el.id != id);
    saveActivitiesLocaly(state, dispatch);
    saveActiveTasksLocaly(state, dispatch);

    if (rootGetters.canSendRequest) {
      dispatch(
        "sendRequest",
        { url: `/api/activities/${id}`, method: "delete" },
        { root: true }
      );
    }

    router.replace("/schedule");
    setTimeout(() => {
      router.replace("/activities");
    }, 1);
  },

  deactivate({ state, dispatch, rootGetters }, id) {
    id = Number(id);
    const activity = findActivityById(state, id);
    activity.isActive = false;
    const newActiveTasks = [];
    state.activeTasks.forEach((weekDay) => {
      weekDay = weekDay.filter((el) => el.id !== id);
      newActiveTasks.push(weekDay);
    });
    state.activeTasks = newActiveTasks;
    saveActiveTasksLocaly(state, dispatch);
    saveActivitiesLocaly(state, dispatch);
    if (rootGetters.canSendRequest) {
      dispatch(
        "sendRequest",
        {
          url: `/api/activetasks`,
          method: "put",
          data: {
            ...state.activeTasks,
          },
        },
        { root: true }
      );
      dispatch(
        "sendRequest",
        {
          url: `/api/activities/${activity.id}`,
          method: "put",
          data: {
            ...activity,
          },
        },
        { root: true }
      );
    }
    router.push('/activities');
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //activeTasks
  //////////////////////////////////////////////////////////////////////////////////////////////////

  updateActiveTasks(
    { state, dispatch, rootGetters },
    { weekDay, timeStamps, show, id, save = true }
  ) {
    const newDayPlan = state.activeTasks[weekDay].filter((el) => el.id != id);
    const activity = findActivityById(state, id);
    if (show) {
      activity.isActive = true;
      newDayPlan.push({ id, timeStamps });
    }
    newDayPlan.sort((a, b) => {
      if (a.timeStamps[0] < b.timeStamps[0]) return -1;
      else return 1;
    });
    state.activeTasks[weekDay] = newDayPlan;
    if (save) {
      saveActiveTasksLocaly(state, dispatch);
      saveActivitiesLocaly(state, dispatch);
      if (rootGetters.canSendRequest) {
        dispatch(
          "sendRequest",
          {
            url: `/api/activetasks/${weekDay}`,
            method: "put",
            data: {
              ...newDayPlan,
            },
          },
          { root: true }
        );
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //subTasks
  //////////////////////////////////////////////////////////////////////////////////////////////////

  addNewSubTask({ state, dispatch, rootGetters }, payload) {
    const activity = findActivityById(state, payload.id);
    const id = new Date().getTime() + Math.random();
    activity.subTasks.push({
      id,
      desc: payload.desc,
      status: "to-do",
    });
    activity.progress = calcTaskProgres(activity);
    saveActivitiesLocaly(state, dispatch);
    if (rootGetters.canSendRequest) {
      dispatch(
        "sendRequest",
        {
          url: `/api/activities/${activity.id}/subtasks`,
          method: "post",
          data: {
            id,
            desc: payload.desc,
            status: "to-do",
          },
        },
        { root: true }
      );
    }
  },
  changeSubTaskStatus({ state, commit, dispatch, rootGetters }, payload) {
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
    if (rootGetters.canSendRequest) {
      dispatch(
        "sendRequest",
        {
          url: `/api/activities/${activity.id}/subtasks/${payload.subTaskId}`,
          method: "patch",
          data: {
            status: subTask.status,
          },
        },
        { root: true }
      );
    }
    saveActiveTasksLocaly(state, dispatch);
    activity.progress = calcTaskProgres(activity);
    sendDeactivationPrompt(activity, commit);
    //   if (activity.progress === 100) {
    //     commit(
    //       "dialog/displayDialog",
    //       {
    //         msg: `Zadanie ${activity.title} jest już w pełni ukończone. Dezaktywować?`,
    //         title: "Zadanie ukończone",
    //         type: "choice-deactivate",
    //         activity: activity.id,
    //       },
    //       { root: true }
    //       );
    // }
    saveActivitiesLocaly(state, dispatch);
  },

  resetSubTasks({ state, dispatch, rootGetters }, id) {
    const activity = findActivityById(state, id);
    activity.subTasks.forEach((subTask) => {
      subTask.status = "to-do";
    });
    activity.progress = 0;
    saveActivitiesLocaly(state, dispatch);
    if (rootGetters.canSendRequest) {
      dispatch(
        "sendRequest",
        {
          url: `/api/activities/${activity.id}`,
          method: "put",
          data: {
            ...activity,
          },
        },
        { root: true }
      );
    }
  },

  deleteSubTask({ state, dispatch, rootGetters, commit }, payload) {
    const activity = findActivityById(state, payload.activityId);
    activity.subTasks = activity.subTasks.filter((el) => el.id != payload.id);
    activity.progress = calcTaskProgres(activity);
    sendDeactivationPrompt(activity, commit);
    saveActivitiesLocaly(state, dispatch);
    if (rootGetters.canSendRequest) {
      dispatch(
        "sendRequest",
        {
          url: `/api/activities/${activity.id}/subtasks/${payload.id}`,
          method: "delete",
        },
        { root: true }
      );
      // dispatch('sendRequest',{url:`/activities/124/subtasks/1`, method:'delete', }, {root: true});
    }
  },
};
