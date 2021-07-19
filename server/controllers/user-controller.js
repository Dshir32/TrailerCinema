const express = require("express");
const router = express.Router();
const userLogic = require("../business-logic/user-logic");

router.get('/current_user', async (req, res) => {
    const userCall = req.user;
    if(userCall){
        try {
            const user = await userLogic.getGoogleUserByUserId(userCall);
            res.status(200).json(user);
        }
        catch(err){
            res.status(500).send(err.message);
        }
    } else {
        res.status(401).send('err');
    }
});


module.exports = router;