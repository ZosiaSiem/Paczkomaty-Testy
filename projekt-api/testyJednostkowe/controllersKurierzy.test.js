import { describe, it, expect, vi, beforeEach } from "vitest";
import * as kontrolerKurier from "../api/controllers/kurierzy.js";
import Kurier from "../api/models/kurier.js";

describe("Kurierzy", () => {
  let odpowiedz;

  beforeEach(() => {
    vi.clearAllMocks();
    odpowiedz = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    Kurier.find = vi.fn();
    Kurier.findById = vi.fn();
    Kurier.findByIdAndDelete = vi.fn();
    Kurier.findByIdAndUpdate = vi.fn();
  });

  it("Pobieram listę kurierów pomyślnie bo zwraca dane", async () => {
    Kurier.find.mockResolvedValue([{ imie: "Jan" }]);
    await kontrolerKurier.kurierzy_get_all({}, odpowiedz);
    expect(odpowiedz.status).toHaveBeenCalledWith(200);
  });

  it("Pobieram listę kurierów ale lista jest pusta", async () => {
    Kurier.find.mockResolvedValue([]);
    await kontrolerKurier.kurierzy_get_all({}, odpowiedz);
    expect(odpowiedz.status).toHaveBeenCalledWith(200);
  });

  it("Pobieram listę kurierów lecz wystąpił błąd serwera", async () => {
    Kurier.find.mockRejectedValue(new Error());
    await kontrolerKurier.kurierzy_get_all({}, odpowiedz);
    expect(odpowiedz.status).toHaveBeenCalledWith(500);
  });

  it("Szukam kuriera po ID nie znalazłam bo nie istnieje", async () => {
    Kurier.findById.mockResolvedValue(null);
    await kontrolerKurier.kurierzy_get_by_id({ params: { kurierId: "1" } }, odpowiedz);
    expect(odpowiedz.status).toHaveBeenCalledWith(404);
  });

  it("Szukam kuriera po ID znalazłam", async () => {
    Kurier.findById.mockResolvedValue({ imie: "Marysia" });
    await kontrolerKurier.kurierzy_get_by_id({ params: { kurierId: "1" } }, odpowiedz);
    expect(odpowiedz.status).toHaveBeenCalledWith(200);
  });

  it("Usuwam kuriera pomyślnie ", async () => {
    Kurier.findByIdAndDelete.mockResolvedValue({});
    await kontrolerKurier.kurierzy_delete({ params: { kurierId: "1" } }, odpowiedz);
    expect(odpowiedz.status).toHaveBeenCalledWith(200);
  });

  it("Usuwam kuriera (ale nie został usunięty bo nie istnieje)", async () => {
    Kurier.findByIdAndDelete.mockResolvedValue(null);
    await kontrolerKurier.kurierzy_delete({ params: { kurierId: "1" } }, odpowiedz);
    expect(odpowiedz.status).toHaveBeenCalledWith(404);
  });

  it("Aktualizuję kuriera pomyślnie", async () => {
    Kurier.findByIdAndUpdate.mockResolvedValue({ imie: "Adam" });
    await kontrolerKurier.kurierzy_update({ params: { kurierId: "1" }, body: {} }, odpowiedz);
    expect(odpowiedz.status).toHaveBeenCalledWith(200);
  });

  it("Aktualizuję kuriera lecz nie mona bo nie istnieje", async () => {
    Kurier.findByIdAndUpdate.mockResolvedValue(null);
    await kontrolerKurier.kurierzy_update({ params: { kurierId: "1" }, body: {} }, odpowiedz);
    expect(odpowiedz.status).toHaveBeenCalledWith(404);
  });
});

