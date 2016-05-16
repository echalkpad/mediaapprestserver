module.exports = function(app) {
  var Member = app.loopback.getModel('member');
  console.log(Member.settings.acls);
};