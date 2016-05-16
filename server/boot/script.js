module.exports = function (app) {
	console.log('script.js');
	
	var cloudantDB = app.dataSources.cloudant;
	cloudantDB.autoupdate(['member', 'note', 'scribble', 'advertisementtype', 'color', 'document', 'product', 'price', 'publication', 'customer', 'ACL', 'Role', 'RoleMapping'], function (err) {
		if (err) throw (err);
	});
	
	cloudantDB.automigrate(['member'], function (err) {
		if (err) throw (err);
	});

	var User = app.models.member;
	//admin
    User.find({ where: { username: 'administrator' }, limit: 1 }, function (err, users) {
		if (err) throw (err);
		console.log(users);
		
		
      if (users.length == 0) {


        User.create([
          { username: 'administrator', email: 'admin@admin.com', password: 'admin', firstname: 'Admin', lastname: 'istrator' }
        ], function (err, users) {
          if (err) return debug(err);

          var Role = app.models.Role;
          var RoleMapping = app.models.RoleMapping;

         //Role.destroyAll();
          //RoleMapping.destroyAll();

          //create the admin role
          Role.create({
            name: 'admin'
          }, function (err, role) {
            if (err) return debug(err);
			console.log('added role admin');

            //make admin
            role[0].principals.create({
              principalType: RoleMapping.USER,
              principalId: users[0].id
            }, function (err, principal) {
              if (err) throw (err);
			  console.log('added' + users[0] + 'to role admin');
            });
          });
		  
		  //create UserContainer for user admin
		 
			var Container = app.models.container;

			Container.createContainer([
			  { 'name': 'administrator'}
			], function (err, containers) {
			  if (err) return debug(err);
			  
			  console.log(containers);
			});
		  
        })
		
		
     
      }
      else {
		console.log('admin already there');

      }

    });
	
	//user
		User.find({ where: { username: 'user' }, limit: 1 }, function (err, users) {
		if (err) throw (err);
		console.log(users);
      if (users.length == 0) {


        User.create([
          { username: 'user', email: 'user@user.com', password: 'user', firstname: 'User', lastname: 'One' }
        ], function (err, users) {
          if (err) return debug(err);

		  //create UserContainer for user user
		 
			var Container = app.models.container;

			Container.createContainer([
			  { 'name': 'user'}
			], function (err, containers) {
			  if (err) return debug(err);
			  
			  console.log(containers);
			});
		  
        })
		
		
     
      }
      else {
		console.log('user already there');
		
      }

    });
	
	//debug
	var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
	
	Role.find({ where: { name: 'admin' }, limit: 1 }, function (err, roles) {
		if (err) throw (err);
		console.log(roles);
		
		if (roles.length < 1){
			Role.create({
            name: 'admin'
          }, function (err, role) {
            if (err) return debug(err);
			console.log('added role admin');
		  });
		}	else{}
		
		
		
		});
	
	
    
};
