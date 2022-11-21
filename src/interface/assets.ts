export enum GameParams {
  width = 800,
  height = 600,
}

export let round1: number = 1;

export function nextRound() {
  round1 += 1;
}
export function resetRound() {
  round1 = 1;
}

export let playerPositionX: number = 400;
export let playerPositionY: number = 800;

export function updatePlayerPosition(x: number, y: number) {
  playerPositionX = x;
  playerPositionY = y;
}

export let scoreStored: number = 0;

export function updateScore(x:number){
    scoreStored = x;
}
