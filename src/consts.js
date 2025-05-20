export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

let birdsPerEpoch = 100;

export function getBirdsPerEpoch() { return birdsPerEpoch; }
export function setBirdsPerEpoch(val) { birdsPerEpoch = val; }