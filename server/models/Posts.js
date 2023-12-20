

module.exports = (sequelize, dataTypes)=>{
    //creating a table
    const Posts= sequelize.define("Posts",{
        title: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    });

    Posts.associate= (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        });

        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
        });
    };

    return Posts;
};