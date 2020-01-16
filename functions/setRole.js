const admin = require('firebase-admin');

async function setCustomClaim(data, context) {
  if (context.auth.token.admin !== true) {
    return { error: 'Only Admins may grant privileges.' };
  }
  const customClaim = {};
  customClaim[data.role] = true;

  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, customClaim);
    })
    .then(() => {
      return {
        message: `Success ${data.email} has the role ${data.role} added`
      };
    })
    .catch(e => {
      return e;
    });
}
exports.handler = setCustomClaim;
