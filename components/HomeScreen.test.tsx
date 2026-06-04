import { render, screen } from "@testing-library/react";
import { HomeScreen } from "./HomeScreen";

describe("HomeScreen Component", () => {
  const mockTopScores = [
    { id: "1", player_name: "Player1", score: 500, waves_survived: 3 },
    { id: "2", player_name: "Player2", score: 400, waves_survived: 2 },
    { id: "3", player_name: "Player3", score: 300, waves_survived: 1 },
  ];

  const mockAllScores = [
    ...mockTopScores,
    { id: "4", player_name: "Player4", score: 200, waves_survived: 1 },
  ];

  it("renders title and menu items correctly", () => {
    render(
      <HomeScreen
        onStartGame={() => {}}
        topScores={mockTopScores}
        allScores={mockAllScores}
        totalGamesPlayed={4}
        isLoadingScores={false}
      />
    );

    expect(screen.getByText(/mystic/i)).toBeInTheDocument();
    expect(screen.getByText(/realm defender/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /start game/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /patch notes/i })).toBeInTheDocument();
  });

  it("renders leaderboard correctly", () => {
    render(
      <HomeScreen
        onStartGame={() => {}}
        topScores={mockTopScores}
        allScores={mockAllScores}
        totalGamesPlayed={4}
        isLoadingScores={false}
      />
    );

    expect(screen.getByText(/leaderboard/i)).toBeInTheDocument();
    mockTopScores.forEach((score) => {
      expect(screen.getByText(score.player_name)).toBeInTheDocument();
      expect(screen.getByText(score.score.toString())).toBeInTheDocument();
    });
  });

  it("renders game instructions correctly", () => {
    render(
      <HomeScreen
        onStartGame={() => {}}
        topScores={mockTopScores}
        allScores={mockAllScores}
        totalGamesPlayed={4}
        isLoadingScores={false}
      />
    );

    expect(screen.getByText(/how to play/i)).toBeInTheDocument();
    expect(screen.getByText(/wasmove/i)).toBeInTheDocument();
    expect(screen.getByText(/mouseaim & cast spells/i)).toBeInTheDocument();
  });

  it("handles start game button click", () => {
    const onStartGame = jest.fn();

    render(
      <HomeScreen
        onStartGame={onStartGame}
        topScores={mockTopScores}
        allScores={mockAllScores}
        totalGamesPlayed={4}
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
        totalGamesPlayed={4}
        isLoadingScores={false}
      />
    );

    fireEvent.mouseEnter(screen.getByRole("button", { name: /settings/i }));
    fireEvent.click(screen.getByRole("link", { name: /patch notes/i }));

    expect(screen.getByRole("button", { name: /settings/i })).toHaveClass(
      "bg-purple-600/80"
    );
  });
});
