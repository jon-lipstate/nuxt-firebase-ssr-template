const admin = require('firebase-admin');
exports.handler = setCustomClaim;

async function setCustomClaim(data, context) {
  if (context.auth.token.admin !== true) {
    return { error: 'Only Admins may grant privileges.' };
  }
  const customClaim = {};
  customClaim[data.role] = true;
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    await admin.auth().setCustomUserClaims(user.uid, customClaim);
    return {
      message: `Success ${data.email} has the role ${data.role} added`
    };
  } catch (error) {
    return error;
  }
}
