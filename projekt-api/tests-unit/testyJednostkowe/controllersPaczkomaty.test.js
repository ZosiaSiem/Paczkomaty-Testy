import { describe, it, expect, vi, beforeEach } from "vitest";
import * as c from "../../api/controllers/paczkomaty.js";
import Paczkomat from "../../api/models/paczkomat.js";

describe("Paczkomaty", () => {
  let res;

  beforeEach(() => {
    vi.clearAllMocks();
    res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    Paczkomat.find = vi.fn();
    Paczkomat.findById = vi.fn();
    Paczkomat.findByIdAndDelete = vi.fn();
    Paczkomat.findByIdAndUpdate = vi.fn();
  });

  it("Pobieram listę paczkomatów - dostałam dane", async () => {
    Paczkomat.find.mockResolvedValue([{ miasto: "Płock" }]);
    await c.paczkomaty_get_all({}, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Szukam paczkomatu po ID - znalazłam", async () => {
    Paczkomat.findById.mockResolvedValue({ miasto: "Sopot" });
    await c.paczkomaty_get_by_id({ params: { paczkomatId: "1" } }, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Szukam paczkomatu po ID - nie znalazłam", async () => {
    Paczkomat.findById.mockResolvedValue(null);
    await c.paczkomaty_get_by_id({ params: { paczkomatId: "1" } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("Aktualizuję paczkomat - zaktualizowałam", async () => {
    Paczkomat.findByIdAndUpdate.mockResolvedValue({ _id: "1" });
    await c.paczkomaty_update({ params: { paczkomatId: "1" }, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Aktualizuję paczkomat - nie znalazłam", async () => {
    Paczkomat.findByIdAndUpdate.mockResolvedValue(null);
    await c.paczkomaty_update({ params: { paczkomatId: "1" }, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("Usuwam paczkomat - usunęłam", async () => {
    Paczkomat.findByIdAndDelete.mockResolvedValue({ _id: "1" });
    await c.paczkomaty_delete({ params: { paczkomatId: "1" } }, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Usuwam paczkomat - nie znalazłam", async () => {
    Paczkomat.findByIdAndDelete.mockResolvedValue(null);
    await c.paczkomaty_delete({ params: { paczkomatId: "1" } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

