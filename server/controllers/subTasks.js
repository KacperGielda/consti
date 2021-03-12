module.exports = {
    addSubTask(req,res){
        const user = req.user;
        const {id} = req.params;
        const index = user.activities.findIndex(activity => activity.id == id);
        user.activities[index].subTasks.push(req.body);
        user.save().then( user => {
            if (!user) return res.sendStatus(404);
            res.sendStatus(201);
        }
        );
    },
    deleteSubTask(req,res){
        const user = req.user;
        const {activityId, subTaskId} = req.params;
        const index = user.activities.findIndex(activity => activity.id == activityId);
        user.activities[index].subTasks = user.activities[index].subTasks.filter(subTask => subTask.id != subTaskId);
        user.save().then( user => {
            if (!user) return res.sendStatus(404);
            res.sendStatus(204);
        }
        );
    },
    updateSubTask(req,res){
        const user = req.user;
        const {activityId, subTaskId} = req.params;
        const activityIndex = user.activities.findIndex(activity => activity.id == activityId);
        const subTaskIndex = user.activities[activityIndex].subTasks.findIndex(subTask => subTask.id == subTaskId);
        for (const [key, value] of Object.entries(req.body)){
            user.activities[activityIndex].subTasks[subTaskIndex][key] = value;
        }
        user.save().then( user => {
            if (!user) return res.sendStatus(404);
            res.sendStatus(204);
        }
        );
    },
}