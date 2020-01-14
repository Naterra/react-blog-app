const dbName = 'react-blog-app';
const dbUserName = 'admin';
const dbUserPass = 'SuperAdmin5';
const dbPort = '63448';

module.exports = {
    "SERVER_URL": process.env.SITE_HOST,
    "serverPort": "",
    "mongo_URL":  `mongodb://${dbUserName}:${dbUserPass}@ds263448.mlab.com:${dbPort}/${dbName}`,
    "jwtSecret":  `apple`,
};
