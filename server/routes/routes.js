const router = require("express").Router();

router.post('/date',signup);
router.post('/accounttype',login);
router.delete('/accountno',deleteUser);
router.put('/accountname',updatePassword);
router.post('/accountbalance',forgotPassword);
router.post('/amounttopay',resetPassword);
router.post('/amounttendered',resetPassword);
router.post('/change',resetPassword);
router.post('/paymenttype',resetPassword);
router.post('/description',resetPassword);
router.post('/incomegroupcode',resetPassword);

module.exports= router;