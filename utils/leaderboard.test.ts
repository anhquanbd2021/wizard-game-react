import { describe, it, expect } from "vitest";
import {
  getTopScores,
  getAllScores,
  recordGameStarted,
  getTotalGamesPlayed,
  getScoreRank,
} from "./leaderboard";

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

describe("Leaderboard Utilities", () => {
  it("fetches top scores correctly", async () => {
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: [{ id: "1", player_name: "Player1", score: 500, waves_survived: 3, created_at: new Date().toISOString() }] }),
    });

    const topScores = await getTopScores();
    expect(topScores).toHaveLength(1);
  });

  it("fetches all scores correctly", async () => {
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: [{ id: "1", player_name: "Player1", score: 500, waves_survived: 3, created_at: new Date().toISOString() }] }),
    });

    const allScores = await getAllScores();
    expect(allScores).toHaveLength(1);
  });

  it("records game started correctly", async () => {
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: [{ total_games_played: 10 }] }),
      update: vi.fn().mockResolvedValue({ error: null }),
    });

    const success = await recordGameStarted();
    expect(success).toBe(true);
  });

  it("fetches total games played correctly", async () => {
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: [{ total_games_played: 10 }] }),
    });

    const totalGamesPlayed = await getTotalGamesPlayed();
    expect(totalGamesPlayed).toBe(10);
  });

  it("gets score rank correctly", async () => {
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockResolvedValue({ count: 2 }),
    });

    const rank = await getScoreRank(400);
    expect(rank).toBe(3);
  });
});
