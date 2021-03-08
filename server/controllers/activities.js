
module.exports = {
    getActivities(req,res){
        res.json(req.user.activities)
    },
    addActivity(req, res){
        const user = req.user;
        user.activities.push(req.body);
        user.save().then( user => {
            if (!user) return res.sendStatus(404);
            res.sendStatus(201);
        }
        );
    },
    deleteActivity(req,res){
        const user = req.user;
        const {id} = req.params;
        user.activities = user.activities.filter(activity => activity.id != id);
        user.save().then(user => {
            if(!user) return res.sendStatus(404);
            res.sendStatus(204);
        });
    },
    updateActivity(req,res){
        const user = req.user;
        const {id} = req.params;
        const index = user.activities.findIndex(activity => activity.id == id);
        user.activities.set(index, {...req.body, id: Number(id)}); 
        user.save().then(user => {
            if(!user) return res.sendStatus(404);
            res.sendStatus(204);
        }); 
    },
}