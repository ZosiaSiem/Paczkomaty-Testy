import { describe, it, expect, vi, beforeEach } from "vitest";
import * as c from "../../api/controllers/kurierzy.js";
import Kurier from "../../api/models/kurier.js";

describe("Kurierzy", () => {
  let res;

  beforeEach(() => {
    vi.clearAllMocks();
    res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    Kurier.find = vi.fn();
    Kurier.findById = vi.fn();
    Kurier.findByIdAndDelete = vi.fn();
    Kurier.findByIdAndUpdate = vi.fn();
  });

  it("Pobieram listę kurierów - dostałam dane", async () => {
    Kurier.find.mockResolvedValue([{ imie: "Jan" }]);
    await c.kurierzy_get_all({}, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Pobieram listę kurierów - lista pusta", async () => {
    Kurier.find.mockResolvedValue([]);
    await c.kurierzy_get_all({}, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Pobieram listę kurierów - błąd serwera", async () => {
    Kurier.find.mockRejectedValue(new Error());
    await c.kurierzy_get_all({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("Szukam kuriera po ID - nie znalazłam", async () => {
    Kurier.findById.mockResolvedValue(null);
    await c.kurierzy_get_by_id({ params: { kurierId: "1" } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("Szukam kuriera po ID - znalazłam", async () => {
    Kurier.findById.mockResolvedValue({ imie: "Jan" });
    await c.kurierzy_get_by_id({ params: { kurierId: "1" } }, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Usuwam kuriera - usunęłam", async () => {
    Kurier.findByIdAndDelete.mockResolvedValue({});
    await c.kurierzy_delete({ params: { kurierId: "1" } }, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Usuwam kuriera - nie znalazłam", async () => {
    Kurier.findByIdAndDelete.mockResolvedValue(null);
    await c.kurierzy_delete({ params: { kurierId: "1" } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("Aktualizuję kuriera - zaktualizowałam", async () => {
    Kurier.findByIdAndUpdate.mockResolvedValue({ imie: "Adam" });
    await c.kurierzy_update({ params: { kurierId: "1" }, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Aktualizuję kuriera - nie znalazłam", async () => {
    Kurier.findByIdAndUpdate.mockResolvedValue(null);
    await c.kurierzy_update({ params: { kurierId: "1" }, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

