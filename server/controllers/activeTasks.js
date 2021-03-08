module.exports = {
    getActiveTasks(req,res){
        res.json(req.user.activeTasks);
    },
    updateActiveDay(req,res){
        const user = req.user;
        const {weekDay} = req.params;
        user.activeTasks.set(Number(weekDay), req.body);
        user.save().then( user => {
            if (!user) return res.sendStatus(404);
            res.sendStatus(201);
        }
        );
    }
}