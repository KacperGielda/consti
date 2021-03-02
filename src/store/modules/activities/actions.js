import router from '../../../router/index.js';

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
    return (doneCounter / tasks) * 100;
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
        calcTaskProgres(activity);
    },
    changeSubTaskStatus({ state, commit, dispatch }, payload) {
        const activity = findActivityById(state, payload.activityId);
        const subTask = activity.subTasks[getSubTaskIndex(activity, payload.subTaskId)];
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
                    },
                },
                { root: true }
            );
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
        };

        state.activities.push(activity);
        console.log(state.activities);
        return activity.id;
    },
    updateActiveTasks({ state }, payload) {
        const newDayPlan = state.activeTasks[payload.weekDay].filter((el) => el.id != payload.id);
        if (payload.show) newDayPlan.push({ id: payload.id, timeStamps: payload.timeStamps });
        newDayPlan.sort((a, b) => {
            if (a.timeStamps[0] < b.timeStamps[0]) return -1;
            else return 1;
        });
        state.activeTasks[payload.weekDay] = newDayPlan;
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
    },
    resetSubTasks({ state }, id) {
        const activity = findActivityById(state, id);
        activity.subTasks.forEach((subTask) => {
            subTask.status = "to-do";
        });
        activity.progress = 0;
    },
    deleteActivity({ state, commit, dispatch }, id) {
        id = Number(id);
        const activity = findActivityById(state, id);
        commit(
            "dialog/displayDialog",
            {
                msg: `Czy napewno chesz usunąć ${activity.title}?`,
                title: "Usuwanie",
                type: "choice",
                activity: activity.id,
                callback: () => {
                  router.push('/activities/');
                  for (let weekDay = 0; weekDay < 7; weekDay++ ){
                    dispatch('updateActiveTasks', {show: false, id, weekDay});
                  }
                  state.activities = state.activities.filter(el => el.id != id);
                },
            },
            { root: true }
        );
    },
};
