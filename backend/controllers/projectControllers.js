const Project = require("../models/Project");
const User = require("../models/User");

const createProject = async (req, res, next) => {
  try {
    const project = new Project({
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      user: req.user._id,
    });
    const createdProject = await project.save();
    return res.json(createdProject);
  } catch (error) {
    next(error);
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      const err = new Error("User not found...");
      err.statusCode = 404;
      next(err);
    }
    const result = await Project.find({ user: user._id });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    let project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user._id,
    });

    if (!project) {
      const err = new Error("Project not found...");
      err.statusCode = 404;
      next(err);
    }
    return res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};
const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user._id,
    });

    if (!project) {
      const err = new Error("Project not found...");
      err.statusCode = 404;
      next(err);
    }

    project.name = req.body?.name || project.name;
    await project.save();

    return res.status(200).json({
      _id: project._id,
      latitude: project.latitude,
      longitude: project.longitude,
      name: project.name,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
};
