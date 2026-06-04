import { render, screen, fireEvent } from "@testing-library/react";
import { GameCanvas } from "./GameCanvas";
import type { GameState } from "@/types/game";

const mockGameState: GameState = {
  player: {
    position: { x: 0, y: 0 },
    collisionRadius: 10,
    width: 20,
    height: 20,
    speed: 5,
    health: 100,
    maxHealth: 100,
    angle: 0,
    sprites: {},
  },
  projectiles: [],
  creatures: [],
  obstacles: [],
  healthPacks: [],
  score: 0,
  currentWave: 1,
  creaturesToSpawnThisWave: 5,
  creaturesRemainingInWave: 5,
  crystalParticles: [],
  gameOver: false,
  gameWon: false,
  isPaused: false,
};

const mockCreatureSprites = {};
const mockFloorTexture = null;
const mockHealthPackSprite = null;

describe("GameCanvas", () => {
  it("renders the canvas element", () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        creatureSprites={mockCreatureSprites}
        floorTexture={mockFloorTexture}
        healthPackSprite={mockHealthPackSprite}
        waveMessage="Wave 1"
        startNextWave={() => {}}
        setScore={() => {}}
        setPlayerHealth={() => {}}
        setPlayerCoins={() => {}}
        setGameOver={() => {}}
        onMouseMove={() => {}}
        onMouseClick={() => {}}
        playCreatureDeath={() => {}}
        playPlayerShoot={() => {}}
        playPlayerHit={() => {}}
      />
    );
    expect(screen.getByRole("img", { name: /game canvas/i })).toBeInTheDocument();
  });

  it("toggles fullscreen mode", async () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        creatureSprites={mockCreatureSprites}
        floorTexture={mockFloorTexture}
        healthPackSprite={mockHealthPackSprite}
        waveMessage="Wave 1"
        startNextWave={() => {}}
        setScore={() => {}}
        setPlayerHealth={() => {}}
        setPlayerCoins={() => {}}
        setGameOver={() => {}}
        onMouseMove={() => {}}
        onMouseClick={() => {}}
        playCreatureDeath={() => {}}
        playPlayerShoot={() => {}}
        playPlayerHit={() => {}}
      />
    );

    const fullscreenButton = screen.getByRole("button", { name: /fullscreen/i });
    fireEvent.click(fullscreenButton);
    // Fullscreen API is not mockable in JSDOM, so we check for the button text change
    expect(screen.getByRole("button", { name: /exit fullscreen/i })).toBeInTheDocument();
  });

  it("handles mouse move and click events", () => {
    const onMouseMove = jest.fn();
    const onMouseClick = jest.fn();

    render(
      <GameCanvas
        gameState={mockGameState}
        creatureSprites={mockCreatureSprites}
        floorTexture={mockFloorTexture}
        healthPackSprite={mockHealthPackSprite}
        waveMessage="Wave 1"
        startNextWave={() => {}}
        setScore={() => {}}
        setPlayerHealth={() => {}}
        setPlayerCoins={() => {}}
        setGameOver={() => {}}
        onMouseMove={onMouseMove}
        onMouseClick={onMouseClick}
        playCreatureDeath={() => {}}
        playPlayerShoot={() => {}}
        playPlayerHit={() => {}}
      />
    );

    const canvas = screen.getByRole("img", { name: /game canvas/i });
    fireEvent.mouseMove(canvas, { clientX: 100, clientY: 100 });
    expect(onMouseMove).toHaveBeenCalled();

    fireEvent.click(canvas);
    expect(onMouseClick).toHaveBeenCalled();
  });

  it("renders coin particles", () => {
    const gameStateWithParticles = {
      ...mockGameState,
      crystalParticles: [
        { id: "1", x: 50, y: 50, vx: 0, vy: 0, alpha: 1, scale: 1, crystals: 1 },
      ],
    };

    render(
      <GameCanvas
        gameState={gameStateWithParticles}
        creatureSprites={mockCreatureSprites}
        floorTexture={mockFloorTexture}
        healthPackSprite={mockHealthPackSprite}
        waveMessage="Wave 1"
        startNextWave={() => {}}
        setScore={() => {}}
        setPlayerHealth={() => {}}
        setPlayerCoins={() => {}}
        setGameOver={() => {}}
        onMouseMove={() => {}}
        onMouseClick={() => {}}
        playCreatureDeath={() => {}}
        playPlayerShoot={() => {}}
        playPlayerHit={() => {}}
      />
    );

    expect(screen.getByTestId("coin-particles")).toBeInTheDocument();
  });
});
```

### `components\GameOverlay.test.tsx`

components/GameOverlay.test.tsx
