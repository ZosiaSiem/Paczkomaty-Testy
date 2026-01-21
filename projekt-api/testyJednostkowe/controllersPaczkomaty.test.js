import { describe, it, expect, vi, beforeEach } from "vitest"; //importuje potrzebne funkcje z vitest
import * as kontrolerPaczkomaty from "../api/controllers/paczkomaty.js"; //importuje cały kontroler paczkomatów
import Paczkomat from "../api/models/paczkomat.js"; //importuje model paczkomatu

describe("Paczkomaty", () => {
  let odpowiedzi; //tu zadeklarowałam zmienną która będzie symulować odpowiedź serwera dzieki czemu nie muszę za każdym razem tworzyć tego obiektu w każdym teście i odpalać serwera

  beforeEach(() => {
    vi.clearAllMocks();
    odpowiedzi = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    Paczkomat.find = vi.fn();
    Paczkomat.findById = vi.fn();
    Paczkomat.findByIdAndDelete = vi.fn();
    Paczkomat.findByIdAndUpdate = vi.fn();
  }); //ta funkcja wykona się przed każdym testem aby wyczyścić mocki i odpowiedzi bo inaczej mogą się mieszać dane między testami

  it("Pobieram listę paczkomatów ", async () => {
    Paczkomat.find.mockResolvedValue([{ miasto: "Płock" }]);
    await kontrolerPaczkomaty.paczkomaty_get_all({}, odpowiedzi);
    expect(odpowiedzi.status).toHaveBeenCalledWith(200);
  });

  it("Szukam paczkomatu po ID znalazłam", async () => {
    Paczkomat.findById.mockResolvedValue({ miasto: "Sopot" });
    await kontrolerPaczkomaty.paczkomaty_get_by_id({ params: { paczkomatId: "1" } }, odpowiedzi);
    expect(odpowiedzi.status).toHaveBeenCalledWith(200);
  });

  it("Szukam paczkomatu po ID nie znalazłam bo nie istnieje", async () => {
    Paczkomat.findById.mockResolvedValue(null);
    await kontrolerPaczkomaty.paczkomaty_get_by_id({ params: { paczkomatId: "1" } }, odpowiedzi);
    expect(odpowiedzi.status).toHaveBeenCalledWith(404);
  });

  it("Aktualizuję paczkomat został zaktualizowany poprawnie", async () => {
    Paczkomat.findByIdAndUpdate.mockResolvedValue({ _id: "1" });
    await kontrolerPaczkomaty.paczkomaty_update({ params: { paczkomatId: "1" }, body: {} }, odpowiedzi);
    expect(odpowiedzi.status).toHaveBeenCalledWith(200);
  });

  it("Aktualizuję paczkomat błędnie", async () => {
    Paczkomat.findByIdAndUpdate.mockResolvedValue(null);
    await kontrolerPaczkomaty.paczkomaty_update({ params: { paczkomatId: "1" }, body: {} }, odpowiedzi);
    expect(odpowiedzi.status).toHaveBeenCalledWith(404);
  });
  // 2 powyzsze testy sprawdzają czy aktualizacja paczkomatu działa poprawnie i błędnie (gdy paczkomat nie istnieje)

  it("Usuwam paczkomat dostaje kod 200 czyli usunięty pomyślnie", async () => {
    Paczkomat.findByIdAndDelete.mockResolvedValue({ _id: "1" });
    await kontrolerPaczkomaty.paczkomaty_delete({ params: { paczkomatId: "1" } }, odpowiedzi);
    expect(odpowiedzi.status).toHaveBeenCalledWith(200);
  });

  it("Usuwam paczkomat i potem paczkomat nie został znaleziony", async () => {
    Paczkomat.findByIdAndDelete.mockResolvedValue(null);
    await kontrolerPaczkomaty.paczkomaty_delete({ params: { paczkomatId: "1" } }, odpowiedzi);
    expect(odpowiedzi.status).toHaveBeenCalledWith(404);
  });
});
