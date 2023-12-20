

module.exports = (sequelize, dataTypes)=>{
    //creating a table
    const Comments= sequelize.define("Comments",{
        commentBody: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    });

    return Comments;
};