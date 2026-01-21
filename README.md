# Paczkomaty – Testy

Projekt zawiera aplikację webową oraz testy jednostkowe i testy end-to-end (E2E).

Repozytorium składa się z części backendowej, frontendowej oraz testowej - wykonanych przy użyciu narzędzia Playwright oraz Viest-a.

---

## Wymagania

Do uruchomienia projektu wymagane są:
- Node.js (zalecana wersja LTS)
- npm
- zainstalowane przeglądarki Playwright (`npx playwright install`)

---

## Uruchamianie projektu
Nalezy pobrać to repozytorium:
- git clone https://github.com/ZosiaSiem/Paczkomaty-Testy.git
## Połączenie z bazą 
 Naley utworzyć plik .env z następującymi informacjami:
DB_USER= /twojeImie/
DB_PASSWORD= /twojeHasło/
DB_NAME= /nazwaBazyDanych/
JWT_KEY= /secret/
Następnie połączyć projekt z bazą

### Uruchomienie backendu / bazy danych

Backend aplikacji znajduje się w folderze `projekt-api`.  
Aby uruchomić backend (oraz bazę danych, jeśli jest inicjowana wraz z aplikacją), należy przejść do odpowiedniego katalogu i wykonać polecenie:

```bash
cd projekt-api
npm start
````

---

### Uruchomienie frontendu

Frontend aplikacji znajduje się w folderze `frontend/frontend`.
Aby uruchomić aplikację frontendową należy wykonać:

```bash
cd frontend/frontend
npm run dev
```

Po uruchomieniu aplikacja będzie dostępna lokalnie (domyślnie pod adresem `http://localhost:3000`).

---

### Uruchamianie testów jednostkowych

Testy jednostkowe znajdują się w części backendowej projektu.
Aby je uruchomić, należy przejść do katalogu backendu i wykonać polecenie:

```bash
cd projekt-api
npm test
```

---

### Uruchamianie testów end-to-end (Playwright)

Testy end-to-end zostały zaimplementowane przy użyciu narzędzia Playwright i znajdują się w części frontendowej projektu.
Aby uruchomić testy E2E, należy wykonać:

```bash
cd frontend/frontend
npx playwright test
```
---

## Technologie

W projekcie wykorzystano:

* JavaScript / TypeScript
* Node.js
* React / Next.js (frontend)
* Playwright (testy E2E)
* npm

---

## Uwagi

* Przed uruchomieniem testów end-to-end należy upewnić się, że backend oraz frontend są uruchomione.
* Naley połączyć ten projekt z bazą danych (u mnie MongoDB)
