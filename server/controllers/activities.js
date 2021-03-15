

module.exports = {
    getActivities(req,res){
        res.json(req.user.activities)
    },
    putActivities(req, res){
        const user = req.user;
        const activities = req.body;
        console.log(Array.isArray(activities), activities);
        user.activities = activities;
        user.save({ validateBeforeSave: false }).then( user => {
            if (!user) return res.sendStatus(404);
            res.sendStatus(201);
        }
        ).catch(err => console.log(err));
        
    },
    addActivity(req, res){
        const user = req.user;
        const activity = req.body;
        user.activities.push(activity);
        user.save({ validateBeforeSave: false }).then( user => {
            if (!user) return res.sendStatus(404);
            res.sendStatus(201);
        }
        ).catch(err => console.log(err));
    },
    deleteActivity(req,res){
        const user = req.user;
        const {id} = req.params;
        console.log(user.activities);
        user.activities = user.activities.filter(activity => activity.id != id);
        console.log(user.activities);

        user.save({validate: false}).then(user => {
            if(!user) return res.sendStatus(404);
            res.sendStatus(204);
        }).catch(err => console.log(err));
    },
    updateActivity(req,res){
        const user = req.user;
        const {id} = req.params;
        console.log(req.body);
        const index = user.activities.findIndex(activity => activity.id == id);
        user.activities.set(index, {...req.body, id: Number(id),}); 
        console.log(user.activities[index]);
        user.save({runValidators: false}).then(user => {
            if(!user) return res.sendStatus(404);
            res.sendStatus(204);
        }).catch(err=> console.log(err)); 
    },
}