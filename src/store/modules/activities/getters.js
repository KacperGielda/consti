export default {
    activeTasks(state) {
        return state.activeTasks;
    },
    activityById(state) {
        return (id) => {
            const activity = state.activities.find((task) => task.id === id);
            return activity;
        };
    },
    activities(state) {
        const active = [];
        const notActive = [];
        state.activities.forEach((activity) => {
            if (activity.isActive) active.push(activity);
            else notActive.push(activity);
        });
        return { active, notActive };
    },
    termsById(state) {
        return (id) => {
            const term = state.activeTasks.map((element) => {
                let activity = element.find((activity) => activity.id === id);
                if (activity) return activity;
                else return null;
            });
            // return JSON.parse(JSON.stringify(term)); //?????????
            return term;
        };
    },
    ocupiedTerms(state) {
        return (id, weekDay) => {
            const ocupiedTimeStamps = [];
            state.activeTasks[weekDay].forEach((activity) => {
                if (activity.id == id) return;
                ocupiedTimeStamps.push(activity.timeStamps);
            });
            return ocupiedTimeStamps;
        };
    },
};
