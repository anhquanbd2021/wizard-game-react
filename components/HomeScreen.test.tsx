import { render, screen, fireEvent } from "@testing-library/react";
import { HomeScreen } from "./HomeScreen";
import type { LeaderboardEntry } from "@/types/game";

const mockTopScores: LeaderboardEntry[] = [
  {
    id: "1",
    player_name: "Player1",
    score: 500,
    waves_survived: 3,
    created_at: new Date().toISOString(),
  },
];

const mockAllScores: LeaderboardEntry[] = [
  ...mockTopScores,
  {
    id: "2",
    player_name: "Player2",
    score: 400,
    waves_survived: 2,
    created_at: new Date().toISOString(),
  },
];

describe("HomeScreen", () => {
  it("renders the title and menu items", () => {
    render(
      <HomeScreen
        onStartGame={() => {}}
        topScores={mockTopScores}
        allScores={mockAllScores}
        totalGamesPlayed={10}
        isLoadingScores={false}
      />
    );

    expect(screen.getByText(/mystic/i)).toBeInTheDocument();
    expect(screen.getByText(/realm defender/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start game/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /patch notes/i })).toBeInTheDocument();
  });

  it("handles start game button click", () => {
    const onStartGame = jest.fn();

    render(
      <HomeScreen
        onStartGame={onStartGame}
        topScores={mockTopScores}
        allScores={mockAllScores}
        totalGamesPlayed={10}
        isLoadingScores={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /start game/i }));
    expect(onStartGame).toHaveBeenCalled();
  });

  it("handles menu item hover and click", () => {
    const onStartGame = jest.fn();

    render(
      <HomeScreen
        onStartGame={onStartGame}
        topScores={mockTopScores}
        allScores={mockAllScores}
        totalGamesPlayed={10}
        isLoadingScores={false}
      />
    );

    fireEvent.mouseEnter(screen.getByRole("button", { name: /settings/i }));
    fireEvent.click(screen.getByRole("link", { name: /patch notes/i }));

    expect(screen.getByRole("button", { name: /settings/i })).toHaveClass(
      "bg-purple-600/80"
    );
  });

  it("renders leaderboard", () => {
    render(
      <HomeScreen
        onStartGame={() => {}}
        topScores={mockTopScores}
        allScores={mockAllScores}
        totalGamesPlayed={10}
        isLoadingScores={false}
      />
    );

    expect(screen.getByText(/leaderboard/i)).toBeInTheDocument();
  });

  it("renders game instructions", () => {
    render(
      <HomeScreen
        onStartGame={() => {}}
        topScores={mockTopScores}
        allScores={mockAllScores}
        totalGamesPlayed={10}
        isLoadingScores={false}
      />
    );

    expect(screen.getByText(/how to play/i)).toBeInTheDocument();
  });
});
```

### `hooks\useLeaderboard.test.ts`

hooks/useLeaderboard.test.ts
