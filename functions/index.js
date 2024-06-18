const { initializeApp } = require('firebase-admin/app');
initializeApp()

exports.OptimizeImage = require("./src/OptimizeImage")
exports.PromptingISR = require("./src/PromptingISR")