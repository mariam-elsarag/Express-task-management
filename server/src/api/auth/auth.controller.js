import asyncWrapper from "../../utils/asyncWrapper.js";

export const login = asyncWrapper(async (req, res, next) => {
  console.log(k);
  res.status(200).json("k");
});
