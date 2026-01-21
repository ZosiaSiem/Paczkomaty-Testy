import { describe, it, expect, vi, beforeEach } from "vitest"; //importuje potrzebne funkcje z vitest
import * as kontroler from "../../api/controllers/paczki.js"; //importuje cały kontroler paczki
import Paczka from "../../api/models/paczka.js"; //importuje model paczki

describe("Paczki", () => {
  let odpowiedzi; //tu zadeklarowałam zmienną która będzie symulować odpowiedź serwera dzieki czemu nie muszę za każdym razem tworzyć tego obiektu w każdym teście i odpalać serwera

  beforeEach(() => {
    vi.clearAllMocks();
    odpowiedzi = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    Paczka.findByIdAndUpdate = vi.fn();
    Paczka.findByIdAndDelete = vi.fn();
  }); //ta funkcja wykona się przed każdym testem abywyczyścić mocki i odpowiedzi bo inaczej mogą się mieszać dane między testami

  it("Czy aktualizacja paczek jest poprawna - powinno wzrócić kod 200", async () => {
    Paczka.findByIdAndUpdate.mockResolvedValue({ _id: "1" }); //tu uyłam mocka aby zasymulować że metoda findByIdAndUpdate zwraca obiekt z id 1
    await kontroler.paczki_update({ params: { paczkaId: "1" }, body: {} }, odpowiedzi); //wywołuje metodę kontrolera paczki_update (bo tak nazywa sie ta funkcja w kontrolerze paczki) z parametrami symulującymi żądanie i odpowiedź
    expect(odpowiedzi.status).toHaveBeenCalledWith(200); //sprawdzam czy odp. jest z kodem 200
  });

  it("Chce aktualizować paczkę ale jej nie ma w bazie", async () => {
    Paczka.findByIdAndUpdate.mockResolvedValue(null); // tu szuka paczki ale jej nie znajduje więc zwraca null
    await kontroler.paczki_update({ params: { paczkaId: "1" }, body: {} }, odpowiedzi); // następnie wywołuje metodę aktualizacji paczki aby sprawdzić czy odpowiedź jest poprawna
    expect(odpowiedzi.status).toHaveBeenCalledWith(404); //i oczekuje że odpowiedź będzie z kodem 404 bo paczka nie istnieje
  });

  it("Sprawdzanie poprawnego usuwania paczki", async () => {
    Paczka.findByIdAndDelete.mockResolvedValue({}); // tu symuluję, że paczka została usunięta
    await kontroler.paczki_delete({ params: { paczkaId: "1" } }, odpowiedzi); //wywołuje metodę usuwania paczki
    expect(odpowiedzi.status).toHaveBeenCalledWith(200); //sprawdzam czy odpowiedź ma kod 200 bo paczka została usunięta i powinien być taki kod odpowiedzi
  });

  it("Usuwanie paczki i sprawdzanie czy nie ma jej w bazie ", async () => {
    Paczka.findByIdAndDelete.mockResolvedValue(null);
    await kontroler.paczki_delete({ params: { paczkaId: "1" } }, odpowiedzi);
    expect(odpowiedzi.status).toHaveBeenCalledWith(404);
  });

  // Test 3 i 4 rozni sie tym ze w 3 szukamy paczki która istnieje a w 4 takiej paczki nie ma (nie istnieje w bazie)
});

