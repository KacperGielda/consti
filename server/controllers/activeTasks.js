module.exports = {
    getActiveTasks(req,res){
        res.json(req.user.activeTasks);
    },
    updateActiveDay(req,res){
        const user = req.user;
        const {weekDay} = req.params;
        console.log(req.body[0])
        user.activeTasks.set(Number(weekDay), req.body[0]);
        user.save().then( user => {
            if (!user) return res.sendStatus(404);
            res.sendStatus(201);
        }
        ).catch(err =>
            console.log(err)
        );
    },
    updateActiveTasks(req,res){
        const user = req.user;
        let { activeTasks } = req.body;
        // activeTasks = Object.keys(activeTasks).map((key) => [Number(key), activeTasks[key]]);
        console.log(Array.isArray(activeTasks), activeTasks, "eww");
        user.activeTasks = activeTasks;
        // res.json(activeTasks);   
        // user.activeTasks = activeTasks;
        user.save({validate: false}).then( user => {
            if (!user) return res.sendStatus(404);
            res.sendStatus(201);
        }
        ).catch(err =>{
            // console.log(err)
            return res.json({activeTasks, dupa:JSON.stringify(activeTasks)});
            // return res.sendStatus(404)
        }
        );
    }
}