const findActivityById = (state, id) => {
    return state.activities.find(task => task.id == id);
}
const getSubTaskIndex = (activity,id,)=>{
    return activity.subTasks.findIndex(task => task.id == id);
}

export default {
    addNewSubTask({state},payload){
        const activity = findActivityById(state, payload.id);
        const id = new Date() + Math.random();
        activity.subTasks.push({
            id,
            desc: payload.desc,
            status: 'to-do',
        });
        console.log(activity.subTasks);
    },
    changeSubTaskStatus({state},payload){
        const activity = findActivityById(state, payload.activityId);
        const subTask = activity.subTasks[getSubTaskIndex(activity, payload.subTaskId)];
        switch(subTask.status){
            case 'to-do':
                subTask.status = 'in-progress'
                break;
            case 'in-progress':
                subTask.status = 'done'
                break;
            case 'done':
                subTask.status = 'to-do'
                break;
        }

    },
}