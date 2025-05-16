// utils
import AppErrors from "../../utils/appErrors.js";
import asyncWrapper from "./../../utils/asyncWrapper.js";
import { uploadSingleImage } from "../../utils/uploadImage.js";
import serializeBody from "./../../utils/serizlizeBody.js";

// constant
import errorMessages from "../../constants/errorMessages.js";
import Project from "./project.model.js";
import { isValidDate } from "../../validation/isValidDate.validate.js";
import Team from "../team/team.model.js";
import { projectValidation } from "../../validation/project.validator.js";
import ApiFeature from "../../utils/apiFeatures.js";
import task from "./../tasks/task.model.js";

const projectSerializer = (project) => {
  return {
    projectId: project._id,
    name: project.name,
    description: project.description,
    status: project.status,
    image: project.image || null,
    progress: project.progress,
    team: project.team,
    start_date: new Date(project.start_date).toLocaleString("en", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    end_date: new Date(project.end_date).toLocaleString("en", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    createdAt: new Date(project.createdAt).toLocaleString("en", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

export const createProject = asyncWrapper(async (req, res, next) => {
  const user = req.user._id;
  const required = ["name", "start_date", "end_date"];
  const allowed = ["status", "description", "team"];
  const filterData = serializeBody(req.body, next, required, allowed);
  if (!filterData) {
    return;
  }
  // validation
  let validationError = projectValidation(filterData, next);
  if (!validationError) {
    return;
  }
  // accept file
  if (req.file) {
    try {
      filterData.image = await uploadSingleImage(
        req.file.buffer,
        "/mediafiles/projects",
        "image"
      );
    } catch (err) {
      throw err;
    }
  }
  filterData.created_by = user;

  // validate team is this creator team and team exist
  let team;
  if (filterData.team) {
    team = await Team.findOne({ _id: filterData.team, created_by: user });
    if (!team) {
      return next(new AppErrors(errorMessages.team.no_team, 400));
    }
  }
  const project = await Project.create(filterData);
  if (filterData.team) {
    team.projects.push(project._id);
    await team.save({ validateBeforeSave: false });
  }
  res.status(201).json(projectSerializer(project));
});

// update project
export const updateProject = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = req.user._id;
  const allowed = [
    "status",
    "description",
    "team",
    "name",
    "start_date",
    "end_date",
  ];
  const filterData = serializeBody(req.body, next, [], allowed);
  if (!filterData) {
    return;
  }

  // validation
  let validationError = projectValidation(filterData, next, true);
  if (!validationError) {
    return;
  }
  const project = await Project.findOne({ _id: id, created_by: user });
  if (!project) {
    return next(new AppErrors(errorMessages.project.not_found));
  }
  // accept file
  if (req.file) {
    try {
      if (project.image) {
        await deleteSignleImage(project.image);
      }
      filterData.image = await uploadSingleImage(
        req.file.buffer,
        "/mediafiles/projects",
        "image"
      );
    } catch (err) {
      throw err;
    }
  }
  // validate team is this creator team and team exist
  let team;
  if (filterData.team) {
    team = await Team.findOne({ _id: filterData.team, created_by: user });
    if (!team) {
      return next(new AppErrors(errorMessages.team.no_team, 400));
    }
  }
  let projectData = project;
  if (Object.keys(filterData)?.length > 0) {
    Object.keys(filterData).forEach((key) => {
      project[key] = filterData[key];
    });
    projectData = await project.save();
  }
  res.status(200).json(projectSerializer(projectData));
});

// get projects
export const getProjects = asyncWrapper(async (req, res, next) => {
  const user = req.user._id;
  const feature = new ApiFeature(Project.find({ created_by: user }), req.query)
    .search(["name"])
    .paginate(10);

  const projects = await feature.getPaginations(Project, req);
  if (projects.results.length > 0) {
    projects.results = projects.results.map((item) => projectSerializer(item));
  }
  res.status(200).json(projects);
});

// get project details
export const getProjectDetails = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const project = await Project.findOne({ _id: id });
  if (!project) {
    return next(new AppErrors(errorMessages.project.not_found, 404));
  }

  res.status(200).json(projectSerializer(project));
});

// delete project
export const deleteProject = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = req.user._id;

  const project = await Project.findOneAndDelete({ _id: id, created_by: user });
  if (!project) {
    return next(new AppErrors(errorMessages.project.not_found, 400));
  }
  await task.deleteMany({ project_id: id });
  res.status(204).send();
});
