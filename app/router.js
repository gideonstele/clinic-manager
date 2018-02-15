

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

    const auth = app.middleware.auth();

    const { router, controller } = app;

    router.post('/login', controller.admin.login);
    router.get('/patient/find/ppid', auth, controller.patient.findOneByPersonId);
    router.post('/patient/create', auth, controller.patient.create);
    router.get('/patient/get/pid', auth, controller.patient.findOneByPersonId);
    router.post('/patient/find', auth, controller.patient.findByNameTel);
    router.post('/patient/find/pid', auth, controller.patient.findByPersonId);
    router.get('/patient/find/where', auth, controller.patient.findWhere);
    router.delete('/patient/remove/pid', auth, controller.patient.removeByPid);
    router.post('/visits/:pid/create', auth, controller.visits.create);

};
