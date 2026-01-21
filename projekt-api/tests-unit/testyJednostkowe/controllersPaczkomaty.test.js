// Importy
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as controller from "../../api/controllers/paczkomaty.js";
import Paczkomat from "../../api/models/paczkomat.js";

describe("Testy jednostkowe kontrolera paczkomaty", () => {

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  };

  // Czyszczenie mocków przed każdym testem
  beforeEach(() => {
    vi.clearAllMocks();
    Paczkomat.find = vi.fn();
    Paczkomat.findById = vi.fn();
    Paczkomat.findByIdAndDelete = vi.fn();
    Paczkomat.findByIdAndUpdate = vi.fn();
  });

  // Pobieranie wszystkich paczkomatów
  it("Powinien zwrócić 200 i listę paczkomatów", async () => {
    const paczkomatyMock = [
      { miasto: "Gdańsk" },
      { miasto: "Warszawa" }
    ];

    Paczkomat.find.mockResolvedValue(paczkomatyMock);

    await controller.paczkomaty_get_all({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Lista wszystkich paczkomatów",
      paczkomaty: paczkomatyMock
    });
  });

  // Dodawanie nowego paczkomatu
  it("Powinien zwrócić 201 po dodaniu nowego paczkomatu", async () => {
    const req = {
      body: {
        miasto: "Kraków",
        adres: "ul. Testowa 1",
        pojemnosc: 50
      }
    };

    const savedPaczkomat = {
      ...req.body,
      _id: "123"
    };

    Paczkomat.prototype.save = vi.fn().mockResolvedValue(savedPaczkomat);

    await controller.paczkomaty_add_new(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Nowy paczkomat został dodany!",
      paczkomat: savedPaczkomat
    });
  });

  // Pobieranie paczkomatu po ID
  it("Powinien zwrócić 200 i dane paczkomatu po ID", async () => {
    const req = {
      params: { paczkomatId: "123" }
    };

    const paczkomatMock = {
      miasto: "Sopot"
    };

    Paczkomat.findById.mockResolvedValue(paczkomatMock);

    await controller.paczkomaty_get_by_id(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Szczegóły paczkomatu o numerze 123",
      paczkomat: paczkomatMock
    });
  });

  // Pobieranie — paczkomat nie istnieje
  it("Powinien zwrócić 404, gdy paczkomat o podanym ID nie istnieje", async () => {
    const req = {
      params: { paczkomatId: "123" }
    };

    Paczkomat.findById.mockResolvedValue(null);

    await controller.paczkomaty_get_by_id(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Nie znaleziono paczkomatu"
    });
  });

  // Aktualizacja paczkomatu
  it("Powinien zwrócić 200 po poprawnej aktualizacji paczkomatu", async () => {
    const req = {
      params: { paczkomatId: "123" },
      body: {
        miasto: "Lublin",
        adres: "ul. Nowa 2",
        pojemnosc: 30
      }
    };

    const updatedPaczkomat = {
      ...req.body,
      _id: "123"
    };

    Paczkomat.findByIdAndUpdate.mockResolvedValue(updatedPaczkomat);

    await controller.paczkomaty_update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Zaktualizowano paczkomat o 123",
      updatedPaczkomat
    });
  });

  // Aktualizacja — paczkomat nie istnieje
  it("Powinien zwrócić 404, gdy paczkomat do aktualizacji nie istnieje", async () => {
    const req = {
      params: { paczkomatId: "123" },
      body: {
        miasto: "Lublin",
        adres: "ul. Nowa 2",
        pojemnosc: 30
      }
    };

    Paczkomat.findByIdAndUpdate.mockResolvedValue(null);

    await controller.paczkomaty_update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Nie znaleziono paczkomatu"
    });
  });

  // Usuwanie paczkomatu
  it("Powinien zwrócić 200 po poprawnym usunięciu paczkomatu", async () => {
    const req = {
      params: { paczkomatId: "123" }
    };

    Paczkomat.findByIdAndDelete.mockResolvedValue({ _id: "123" });

    await controller.paczkomaty_delete(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Usunięto paczkomat o numerze 123"
    });
  });

  // Usuwanie — paczkomat nie istnieje
  it("Powinien zwrócić 404, gdy paczkomat do usunięcia nie istnieje", async () => {
    const req = {
      params: { paczkomatId: "123" }
    };

    Paczkomat.findByIdAndDelete.mockResolvedValue(null);

    await controller.paczkomaty_delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      wiadomość: "Nie znaleziono takiego paczkomatu"
    });
  });

});
