import User from "../models/user.js";

export const getUsers = () => User.find({});

export const findUserByName = (name) => User.find({ name });

export const findUserByJob = (job) => User.find({ job });

export const findUserByNameAndJob = (name, job) => User.find({ name, job });

export const findUserById = (id) => User.findById(id);

export const addUser = (user) => new User(user).save();

export const deleteUserById = (id) => User.findByIdAndDelete(id);
