import { getTopScores, getAllScores, getTotalGamesPlayed, recordGameStarted } from "./leaderboard";
import { supabase } from "@/lib/supabase";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
  },
}));

describe("leaderboard utilities", () => {
  it("fetches top scores", async () => {
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: [{ id: "1", player_name: "Player1", score: 500, waves_survived: 3, created_at: new Date().toISOString() }] }),
    });

    const topScores = await getTopScores();
    expect(topScores).toHaveLength(1);
  });

  it("fetches all scores", async () => {
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: [{ id: "1", player_name: "Player1", score: 500, waves_survived: 3, created_at: new Date().toISOString() }] }),
    });

    const allScores = await getAllScores();
    expect(allScores).toHaveLength(1);
  });

  it("gets total games played", async () => {
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: [{ total_games_played: 10 }] }),
    });

    const totalGamesPlayed = await getTotalGamesPlayed();
    expect(totalGamesPlayed).toBe(10);
  });

  it("records game started", async () => {
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: [{ total_games_played: 10 }] }),
      update: vi.fn().mockResolvedValue({ error: null }),
    });

    const success = await recordGameStarted();
    expect(success).toBe(true);
  });
});
```

These test files should cover the main functionalities of the provided components and hooks. Run these tests using Vitest to ensure full coverage. If there are any uncovered lines, you can add more specific assertions or edge cases as needed.