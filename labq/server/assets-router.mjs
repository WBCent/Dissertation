//This file was added by my supervisor, I have no idea what it does or whether this was taken from the internet.

import express from "express";
const VITE_PORT = 5173;
const router = express.Router();
const imageRegex = /\/.+\.(svg|png|jpg|png|jpeg)$/; // You can add other image formats


const videoRegex = /\/.+\.(mp4|ogv)$/;

router.get(imageRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `http://localhost:${VITE_PORT}/src${filePath}`);
});

router.get(videoRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `http://localhost:${VITE_PORT}/src${filePath}`);
});

export { router };