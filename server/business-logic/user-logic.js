const dal = require("../data-access-layer/dal");

async function register(user){
    const sql = `insert into users(firstName, lastName, email, password, userNameId, profilrPicUrl) 
    values('${user.firstName}', '${user.lastName}', '${user.email}', '${user.password}','${user.userNameId}' , '${user.profilrPicUrl}')`; // 0 = not admin
    const info = await dal.executeAsync(sql);
    user.userId = info.insertId;
    return user;
} 

async function isUserExists(userNameId) {
    const sql = `SELECT * FROM users WHERE userNameId = '${userNameId}'`;
    const info = await dal.executeAsync(sql);
    if(info.length > 0) {
        return true;
    }
    return false;    
}

async function login(userNameId){
    const sql = `select *
    from users 
    where userNameId = '${userNameId}'`;
    const userData = await dal.executeAsync(sql);
    return userData[0]
}
// =======================================================================
async function getGoogleUserByProviderId(providerId) {
    const sql = `SELECT * FROM gfusers WHERE provider_id = ${providerId}`;
    const user = await dal.executeAsync(sql);
    if (user.length > 0) {
        return user[0];
    }
}

async function getGoogleUserByUserId(userId){
    const sql = `SELECT * FROM gfusers WHERE user_id = ${userId}`;
    const user = await dal.executeAsync(sql);
    if (user.length > 0) {
        return user[0];
    }

}


async function registerGoogleUser(provider_id, email, name, provider, provider_pic, token) {
    const sql = `INSERT INTO gfusers(provider_id, email, name, provider, provider_pic, token) 
    VALUES ('${provider_id}', '${email}', '${name}', '${provider}', '${provider_pic}', '${token}')`;
    await dal.executeAsync(sql);
    const user = await getGoogleUser(provider_id);
    return user;
}



module.exports = {
    register,
    isUserExists,
    login,
    getGoogleUserByProviderId,
    registerGoogleUser,
    getGoogleUserByUserId
}