// Importy
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as controller from "../../api/controllers/paczki.js";
import Paczka from "../../api/models/paczka.js";

describe("Testy jednostkowe kontrolera paczki", () => {

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  };

  // Czyszczenie mocków przed każdym testem
  beforeEach(() => {
    vi.clearAllMocks();
    Paczka.find = vi.fn();
    Paczka.findById = vi.fn();
    Paczka.findByIdAndUpdate = vi.fn();
    Paczka.findByIdAndDelete = vi.fn();
  });

  // Test aktualizacji paczki
  it("Powinien zwrócić 200 po poprawnej aktualizacji paczki", async () => {
    const updatedPaczka = {
      _id: "1",
      kodPaczki: "AAA111",
      status: "dostarczona"
    };

    Paczka.findByIdAndUpdate.mockResolvedValue(updatedPaczka);

    const req = {
      params: { paczkaId: "1" },
      body: {
        kodPaczki: "AAA111",
        kurierId: "kurierId",
        paczkomatId: "paczkomatId",
        status: "dostarczona"
      }
    };

    await controller.paczki_update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Zaktualizowano paczke o numerze 1",
      updatedPaczka
    });
  });

  // Aktualizacja — paczka nie istnieje
  it("Powinien zwrócić 404, gdy paczka do aktualizacji nie istnieje", async () => {
    Paczka.findByIdAndUpdate.mockResolvedValue(null);

    const req = {
      params: { paczkaId: "999" },
      body: {}
    };

    await controller.paczki_update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Nie znaleziono paczki o numerze 999"
    });
  });

  // Usuwanie paczki
  it("Powinien zwrócić 200 po poprawnym usunięciu paczki", async () => {
    Paczka.findByIdAndDelete.mockResolvedValue({});

    const req = {
      params: { paczkaId: "1" }
    };

    await controller.paczki_delete(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Usunięto paczke o numerze 1"
    });
  });

  // Usuwanie — paczka nie istnieje
  it("Powinien zwrócić 404, gdy paczka do usunięcia nie istnieje", async () => {
    Paczka.findByIdAndDelete.mockResolvedValue(null);

    const req = {
      params: { paczkaId: "999" }
    };

    await controller.paczki_delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Nie znaleziono paczki o numerze 999"
    });
  });

  // Dodawanie nowej paczki
  it("Powinien zwrócić 201 po dodaniu nowej paczki", async () => {
    const nowaPaczka = {
      _id: "1",
      kodPaczki: "XYZ789",
      status: "oczekująca"
    };

    // Mock metody save dla nowej paczki
    const saveMock = vi.fn().mockResolvedValue(nowaPaczka);
    vi.spyOn(Paczka.prototype, "save").mockImplementation(saveMock);

    const req = {
      body: {
        kodPaczki: "XYZ789",
        kurierId: "kurierId",
        paczkomatId: "paczkomatId",
        status: "oczekująca"
      }
    };

    await controller.paczki_add_new(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Nowa przesyłka została dodana!",
      paczka: nowaPaczka
    });
  });

});
