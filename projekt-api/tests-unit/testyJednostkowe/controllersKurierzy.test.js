import { describe, it, expect, vi, beforeEach } from "vitest";
import * as controller from "../../api/controllers/kurierzy.js";
import Kurier from "../../api/models/kurier.js";

describe("Testy jednostkowe controlera kurierzy (7)", () => {

    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
        Kurier.find = vi.fn();
        Kurier.findById = vi.fn();
        Kurier.findByIdAndDelete = vi.fn();
        Kurier.findByIdAndUpdate = vi.fn();
    });

    // Test 1: pobranie wszystkich kurierów
    it("Powinien zwrócić status 200 i listę kurierów", async () => {
        Kurier.find.mockResolvedValue([
            { imie: "Jan", nazwisko: "Kowalski" }
        ]);
        await controller.kurierzy_get_all({}, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    // Test 2: pobranie kuriera po ID — brak kuriera
    it("Powinien zwrócić 404, gdy kurier o podanym ID nie istnieje", async () => {
        Kurier.findById.mockResolvedValue(null);
        const req = {
            params: { kurierId: "123" }
        };
        await controller.kurierzy_get_by_id(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });

    // Test 3: usunięcie kuriera
    it("Powinien zwrócić 200 po poprawnym usunięciu kuriera", async () => {
        Kurier.findByIdAndDelete.mockResolvedValue({});
        const req = {
            params: { kurierId: "456" }
        };
        await controller.kurierzy_delete(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    // Test 4: brak kurierów w bazie
    it("Powinien zwrócić 200 i pustą tablicę, gdy brak kurierów", async () => {
        Kurier.find.mockResolvedValue([]);
        await controller.kurierzy_get_all({}, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            wiadomość: "Lista wszystkich kurierów",
            kurierzy: []
        });
    });

    // Test 5: błąd bazy danych przy pobieraniu kurierów
    it("Powinien zwrócić 500, gdy wystąpi błąd serwera", async () => {
        const error = new Error("DB error");
        Kurier.find.mockRejectedValue(error);
        await controller.kurierzy_get_all({}, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error });
    });

    // Test 6: aktualizacja kuriera
    it("Powinien zwrócić 200 i dane zaktualizowanego kuriera", async () => {
        const updatedKurier = {
            _id: "789",
            imie: "Adam",
            nazwisko: "Nowak",
            email: "adam@example.com",
            nrTelefonu: "123456789"
        };

        Kurier.findByIdAndUpdate.mockResolvedValue(updatedKurier);
        const req = {
            params: { kurierId: "789" },
            body: updatedKurier
        };

        await controller.kurierzy_update(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            wiadomość: "Zaktualizowano kuriera o numerze 789",
            updatedKurier
        });
    });

    // Test 7: aktualizacja — kurier nie istnieje
    it("Powinien zwrócić 404, gdy aktualizowany kurier nie istnieje", async () => {
        Kurier.findByIdAndUpdate.mockResolvedValue(null);
        const req = {
            params: { kurierId: "999" },
            body: {}
        };
        await controller.kurierzy_update(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            wiadomość: "Nie znaleziono kuriera"
        });
    });

});
