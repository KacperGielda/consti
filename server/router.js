const { Router } = require("express");

const auth = require('./controllers/auth.js');
const activities = require("./controllers/activities.js");
const subTasks = require("./controllers/subTasks.js");
const activeTasks = require("./controllers/activeTasks.js")


const router = Router();

router.post('/login', auth.login )
router.post('/register', auth.register )
router.post('/token', auth.refreshToken)
router.delete("/logout", auth.logout)

router.get('/all', auth.authenticateToken, (req, res)=>{res.json(req.user);});

//////////////////////////////////////////////////////////////////////////////////////////////////
//activities
//////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/activities', auth.authenticateToken, activities.getActivities);
router.post('/activities', auth.authenticateToken, activities.addActivity);
router.delete('/activities/:id', auth.authenticateToken, activities.deleteActivity);
router.put('/activities/:id', auth.authenticateToken, activities.updateActivity);

//////////////////////////////////////////////////////////////////////////////////////////////////
//subTasks
//////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/activities/:id/subtasks', auth.authenticateToken, subTasks.addSubTask);
router.delete('/activities/:activityId/subtasks/:subTaskId', auth.authenticateToken, subTasks.deleteSubTask);
router.put('/activities/:activityId/subtasks/:subTaskId', auth.authenticateToken, subTasks.updateSubTask);

//////////////////////////////////////////////////////////////////////////////////////////////////
//activeTasks
//////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/activetasks', auth.authenticateToken, activeTasks.getActiveTasks);
router.put('/activetasks/:weekDay', auth.authenticateToken, activeTasks.updateActiveDay);

module.exports = router;