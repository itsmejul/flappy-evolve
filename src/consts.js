export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

let birdsPerEpoch = 100;
let inputFeatures = ["diff", "distance"];
let hiddenSize = 3;


export function getBirdsPerEpoch() { return birdsPerEpoch; }
export function setBirdsPerEpoch(val) { birdsPerEpoch = val; }

export function getInputFeatures() { return inputFeatures; }
export function setInputFeatures(val) { inputFeatures = val; }

export function getHiddenSize() { return hiddenSize; }
export function setHiddenSize(val) { hiddenSize = val; }