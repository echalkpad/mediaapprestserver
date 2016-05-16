module.exports = function (app) {
	var User = app.models.member;
	var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
	
	
    User.find({ where: { username: 'administrator' }, limit: 1 }, function (err, users) {
		if (err) throw (err);
		console.log(users);
		
		Role.find({ where: { name: 'admin' }, limit: 1 }, function (err, roles) {
		if (err) throw (err);
		console.log(roles);
		console.log(users);
		
			//make admin
            roles[0].principals.create({
              principalType: RoleMapping.USER,
              principalId: users[0].id
            }, function (err, principal) {
              if (err) throw (err);
			  console.log('added' + users[0].username+ 'to role admin');
            });
		
		
		
		});
		
		
		});
};