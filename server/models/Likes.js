

module.exports = (sequelize, dataTypes)=>{
    //creating a table
    const Likes= sequelize.define("Likes");

    return Likes;
};