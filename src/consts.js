export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

let birdsPerEpoch = 100;
let inputFeatures = ["diff", "distance"];


export function getBirdsPerEpoch() { return birdsPerEpoch; }
export function setBirdsPerEpoch(val) { birdsPerEpoch = val; }

export function getInputFeatures() { return inputFeatures; }
export function setInputFeatures(val) { inputFeatures = val; }