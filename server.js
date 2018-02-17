var express = require('express');
var jwt = require('jwt-simple');
var _ = require('lodash');
var bcrypt = require('bcrypt');
var app = express();

app.use(require('body-parser').json());

var users = [{
    username: 'dickeyxxx',
    password: '$2a$10$AU2fJ3iMe3bavcGTqtIan.b2bkOvQj98its/Ubd6dtFIeOuGtdsR6'
}];

var secretKey = 'supersecretkey';

function findUserByUsername(username) {
    return _.find(users, {
        username: username
    });
}

function validateUser(user, password, cb) {
    return bcrypt.compareSync(password, user.password, cb);
}

app.post('/session', function (req, res) {
    var user = findUserByUsername(req.body.username);
    validateUser(user, req.body.password, function (err, valid) {
        if (err || !valid) {
            return res.send(401);
        }
        var token = jwt.encode({
            username: username
        }, secretKey);
        res.json(token);
    });
});

app.get('/user', function (req, res) {
    var token = req.headers['x-auth'];
    var user = jwt.decode(token, secretKey);
    res.json(user);
});

app.listen(3000, function () {
    console.log('Server listening on port:', 3000);
});