import { render, screen, fireEvent } from "@testing-library/react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/constants/game";
import type { GameState } from "@/types/game";
import { GameCanvas } from "./GameCanvas";

describe("GameCanvas Component", () => {
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
    isPaused: false,
    gameOver: false,
    gameWon: false,
    isLoading: false,
  };

  const mockCreatureSprites = {
    wizard_N_S: null,
    wizard_N_W_L: null,
    wizard_N_W_R: null,
    wizard_S_S: null,
    wizard_S_W_L: null,
    wizard_S_W_R: null,
    wizard_E_S: null,
  };

  const mockFloorTexture = new Image();
  const mockHealthPackSprite = new Image();

  const mockStartNextWave = jest.fn();
  const mockSetScore = jest.fn();
  const mockSetPlayerHealth = jest.fn();
  const mockSetPlayerCoins = jest.fn();
  const mockSetGameOver = jest.fn();
  const mockOnMouseMove = jest.fn();
  const mockOnMouseClick = jest.fn();
  const mockPlayCreatureDeath = jest.fn();
  const mockPlayPlayerShoot = jest.fn();
  const mockPlayPlayerHit = jest.fn();

  it("renders the canvas with correct dimensions", () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        creatureSprites={mockCreatureSprites}
        floorTexture={mockFloorTexture}
        healthPackSprite={mockHealthPackSprite}
        waveMessage="Wave 1"
        startNextWave={mockStartNextWave}
        setScore={mockSetScore}
        setPlayerHealth={mockSetPlayerHealth}
        setPlayerCoins={mockSetPlayerCoins}
        setGameOver={mockSetGameOver}
        onMouseMove={mockOnMouseMove}
        onMouseClick={mockOnMouseClick}
        playCreatureDeath={mockPlayCreatureDeath}
        playPlayerShoot={mockPlayPlayerShoot}
        playPlayerHit={mockPlayPlayerHit}
      />
    );

    const canvas = screen.getByRole("img", { name: /game element/i });
    expect(canvas).toHaveAttribute("width", CANVAS_WIDTH.toString());
    expect(canvas).toHaveAttribute("height", CANVAS_HEIGHT.toString());
  });

  it("handles mouse move events correctly", () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        creatureSprites={mockCreatureSprites}
        floorTexture={mockFloorTexture}
        healthPackSprite={mockHealthPackSprite}
        waveMessage="Wave 1"
        startNextWave={mockStartNextWave}
        setScore={mockSetScore}
        setPlayerHealth={mockSetPlayerHealth}
        setPlayerCoins={mockSetPlayerCoins}
        setGameOver={mockSetGameOver}
        onMouseMove={mockOnMouseMove}
        onMouseClick={mockOnMouseClick}
        playCreatureDeath={mockPlayCreatureDeath}
        playPlayerShoot={mockPlayPlayerShoot}
        playPlayerHit={mockPlayPlayerHit}
      />
    );

    const canvas = screen.getByRole("img", { name: /game element/i });
    fireEvent.mouseMove(canvas, { clientX: 100, clientY: 200 });

    expect(mockOnMouseMove).toHaveBeenCalled();
  });

  it("handles mouse click events correctly", () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        creatureSprites={mockCreatureSprites}
        floorTexture={mockFloorTexture}
        healthPackSprite={mockHealthPackSprite}
        waveMessage="Wave 1"
        startNextWave={mockStartNextWave}
        setScore={mockSetScore}
        setPlayerHealth={mockSetPlayerHealth}
        setPlayerCoins={mockSetPlayerCoins}
        setGameOver={mockSetGameOver}
        onMouseMove={mockOnMouseMove}
        onMouseClick={mockOnMouseClick}
        playCreatureDeath={mockPlayCreatureDeath}
        playPlayerShoot={mockPlayPlayerShoot}
        playPlayerHit={mockPlayPlayerHit}
      />
    );

    const canvas = screen.getByRole("img", { name: /game element/i });
    fireEvent.click(canvas, { clientX: 100, clientY: 200 });

    expect(mockOnMouseClick).toHaveBeenCalled();
  });

  it("toggles fullscreen mode correctly", () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        creatureSprites={mockCreatureSprites}
        floorTexture={mockFloorTexture}
        healthPackSprite={mockHealthPackSprite}
        waveMessage="Wave 1"
        startNextWave={mockStartNextWave}
        setScore={mockSetScore}
        setPlayerHealth={mockSetPlayerHealth}
        setPlayerCoins={mockSetPlayerCoins}
        setGameOver={mockSetGameOver}
        onMouseMove={mockOnMouseMove}
        onMouseClick={mockOnMouseClick}
        playCreatureDeath={mockPlayCreatureDeath}
        playPlayerShoot={mockPlayPlayerShoot}
        playPlayerHit={mockPlayPlayerHit}
      />
    );

    const fullscreenButton = screen.getByRole("button", { name: /fullscreen/i });
    fireEvent.click(fullscreenButton);

    // Check if the canvas is in fullscreen mode
    expect(document.fullscreenElement).toBeInTheDocument();
  });

  it("handles game state updates correctly", () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        creatureSprites={mockCreatureSprites}
        floorTexture={mockFloorTexture}
        healthPackSprite={mockHealthPackSprite}
        waveMessage="Wave 1"
        startNextWave={mockStartNextWave}
        setScore={mockSetScore}
        setPlayerHealth={mockSetPlayerHealth}
        setPlayerCoins={mockSetPlayerCoins}
        setGameOver={mockSetGameOver}
        onMouseMove={mockOnMouseMove}
        onMouseClick={mockOnMouseClick}
        playCreatureDeath={mockPlayCreatureDeath}
        playPlayerShoot={mockPlayPlayerShoot}
        playPlayerHit={mockPlayPlayerHit}
      />
    );

    // Simulate game state updates
    const updatedGameState = {
      ...mockGameState,
      score: 10,
      playerHealth: 95,
      playerCoins: 5,
    };

    render(
      <GameCanvas
        gameState={updatedGameState}
        creatureSprites={mockCreatureSprites}
        floorTexture={mockFloorTexture}
        healthPackSprite={mockHealthPackSprite}
        waveMessage="Wave 1"
        startNextWave={mockStartNextWave}
        setScore={mockSetScore}
        setPlayerHealth={mockSetPlayerHealth}
        setPlayerCoins={mockSetPlayerCoins}
        setGameOver={mockSetGameOver}
        onMouseMove={mockOnMouseMove}
        onMouseClick={mockOnMouseClick}
        playCreatureDeath={mockPlayCreatureDeath}
        playPlayerShoot={mockPlayPlayerShoot}
        playPlayerHit={mockPlayPlayerHit}
      />
    );

    expect(mockSetScore).toHaveBeenCalledWith(updatedGameState.score);
    expect(mockSetPlayerHealth).toHaveBeenCalledWith(updatedGameState.playerHealth);
    expect(mockSetPlayerCoins).toHaveBeenCalledWith(updatedGameState.playerCoins);
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
        startNextWave={mockStartNextWave}
        setScore={mockSetScore}
        setPlayerHealth={mockSetPlayerHealth}
        setPlayerCoins={mockSetPlayerCoins}
        setGameOver={mockSetGameOver}
        onMouseMove={mockOnMouseMove}
        onMouseClick={mockOnMouseClick}
        playCreatureDeath={mockPlayCreatureDeath}
        playPlayerShoot={mockPlayPlayerShoot}
        playPlayerHit={mockPlayPlayerHit}
      />
    );

    expect(screen.getByTestId("coin-particles")).toBeInTheDocument();
  });
});
