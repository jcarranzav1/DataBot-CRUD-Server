const UserModel = require('./model');

async function getId(req, res, next) {
  const { params = {} } = req;
  const { id = '' } = params;

  try {
    const data = await UserModel.findById(id);
    const message = `${UserModel.moUserame} not found`;
    if (!data) {
      next({
        message,
        statusCode: 404,
        level: 'warn',
      });
    }

    req.doc = data;
    next();
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const users = await UserModel.find();
    return res.json({
      data: users,
    });
  } catch (err) {
    return next(err);
  }
}

async function createUser(req, res, next) {
  const { body = {} } = req;
  const statusCode = 200;
  try {
    const newUser = new UserModel(body);
    const data = await newUser.save();
    return res.json({
      data,
      meta: {
        statusCode,
      },
    });
  } catch (err) {
    return next(err);
  }
}
async function updateUser(req, res, next) {
  const { body = {}, doc = {} } = req;
  Object.assign(doc, body);
  try {
    const data = await doc.save();
    return res.json({
      data,
    });
  } catch (err) {
    return next(err);
  }
}

async function deleteUser(req, res, next) {
  const { doc = {} } = req;

  try {
    const data = await doc.remove();
    return res.json({
      data,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getId,
  getAll,
  createUser,
  updateUser,
  deleteUser,
};
