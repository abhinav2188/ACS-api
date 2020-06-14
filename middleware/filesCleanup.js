const Service = require("../model/Service");

async function filesCleanup() {
    const files = await Service.find({serviceLogo:{$ne:""}},{serviceLogo:1,_id:0,products:1});
    return files;
}

module.exports = filesCleanup;