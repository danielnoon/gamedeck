/**
 * Hello! This is a file to test the functionality of
 * GameDeck and experiment with new features.
 * As of now, GameDeck is in its very early stages,
 * so there is a lot missing from the core library.
 * Some features that will be added to the core will
 * go through incubation here, such as the physics
 * engine I am working on and the Camera API I want
 * to add at some point.
 */

import './index.html';
import { startGame } from '../lib/Game';
import { RotationScene } from './scenes/rotation';
import { Main } from './example';

const canvas = document.querySelector<HTMLCanvasElement>('#canvas-revolve')!;

const game = startGame(new Main(), { canvas });
game.input.setAlias('left', 'KeyA');
game.input.setAlias('right', 'KeyD');
game.input.setAlias('up', 'KeyW');
game.input.setAlias('down', 'KeyS');
game.input.setAlias('faster', 'ShiftLeft');
game.input.setAlias('jump', 'Space');

console.log(game);
