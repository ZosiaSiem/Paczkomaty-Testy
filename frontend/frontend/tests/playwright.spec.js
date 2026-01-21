import { test, expect } from '@playwright/test';

test.describe('Aplikacja Paczki - logowanie i CRUD', () => {
  // Test E2E umer 1
    test('Czy uzytkownik moze przełączać zakładki po zalogowaniu sie na strone?', async ({ page }) => {
      await page.goto('http://localhost:5173');  //uzytkownik wchodzi na strone
      await page.fill('input[type=email]', 'zosia@mail.com'); //rejestruje się
      await page.fill('input[type=password]', 'Pies123');
      await page.click('text=Zaloguj'); //następnie loguje się
      await page.click('text=Paczki'); //wyświetla zakładkę paczki
      await expect(page.getByRole('heading', { name: 'Paczki' })).toBeVisible(); //(jest widoczna)
      await page.click('text=Paczkomaty'); //klika i przechodzi do zakładki paczkomaty
      await expect(page.getByRole('heading', { name: 'Paczkomaty' })).toBeVisible(); //która równie jest widoczna
      await page.click('text=Kurierzy'); //następnie przechodzi do zakładki kurierzy
      await expect(page.getByRole('heading', { name: 'Kurierzy' })).toBeVisible(); //która również jest widoczna
    });
    // Test E2E umer 2
  test('Zalogowanie i wylogowanie użytkownika', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[type=email]', 'zosia@mail.com'); //uytkownik wpisuje swoje dane do logowania (tu zakładam ze uzytkownik ma juz konto)
    await page.fill('input[type=password]', 'Pies123');
    await page.click('text=Zaloguj'); //następnie klika przycisk zaloguj
    await page.click('text=Wyloguj'); //nastepnie juz zalogowany klika wyloguj
    await expect(page.getByRole('heading', { name: 'Logowanie' })).toBeVisible(); //sprawdzenie czy jest na stronie logowania (szukam nagłówka logowanie)
  });
  // Test E2E umer 3
  test('Błędne logowanie (użytkownik nie ma konta)', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[type=email]', 'wiki222@gmail.com'); //niezajestrowany uzytkownik chce się zalogować, więc wpisuje swoje dane )
    await page.fill('input[type=password]', 'kot321'); // i hasło
    await page.click('text=Zaloguj'); //klika zaloguj
    await expect(page.locator('text=/Błąd logowania|Błąd połączenia z serwerem|Błąd/')).toBeVisible(); //sprawdzam czy pojawia się komunikat o błędzie (funkcja locator szuka tego komunikatu)
  });
 // Test E2E umer 4
  test('Widoczność tabeli z paczkomatami', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[type=email]', 'zosia@mail.com'); //uzytkownik (ktory oczywiscie ma konto) wpisuje swoje dane do logowania
    await page.fill('input[type=password]', 'Pies123');
    await page.click('text=Zaloguj');
    await page.click('text=Paczkomaty'); //przechodzi do zakładki paczkomaty
    await expect(page.getByRole('heading', { name: 'Paczkomaty' })).toBeVisible(); //sprawdzam czy nagłówek paczkomaty jest widoczny
    await expect(page.locator('table')).toBeVisible(); //sprawdzam czy tabela z paczkomatami jest widoczna
  });
  // Test E2E umer 5
  test('Nie ma możliwości dodania kuriera po wylogowaniu', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[type=email]', 'zosia@mail.com'); //logowanie
    await page.fill('input[type=password]', 'Pies123');
    await page.click('text=Zaloguj');
    await page.click('text=Wyloguj'); //wylogowanie
    await expect(page.locator('input[name=imie]')).not.toBeVisible(); //sprawdzam czy pola do dodania kuriera nie są widoczne (znow za pomocą "locator-a")
  });
  // Test E2E umer 6
  test('Próba logowania gdy pola do logowania są puste', async ({ page }) => {
    await page.goto('http://localhost:5173'); // uzytkownik wchodzi na strone
    await page.click('text=Zaloguj'); //klika przycisk zaloguj bez wypełniania pól
    await expect(page.getByRole('heading', { name: 'Logowanie' })).toBeVisible(); //sprawdzam czy nadal jest na stronie logowania (logowanie nie powiodło się)
    await expect(page.locator('input[type=email]')).toBeVisible(); //pola logowania nadal są widoczne
  });

  // Test E2E umer 7
  test('Dodawanie nowego kuriera', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[type=email]', 'zosia@mail.com'); //logowanie
    await page.fill('input[type=password]', 'Pies123');
    await page.click('text=Zaloguj');
    await page.click('text=Kurierzy'); //klikamy w zakładkę kurierzy( tego mogłoby nie być - bo domyslnie po zaslogowaniu pojawia sie ta strona - ale wole mieć pewność ze test jest wykonany na własciwej stronie)
    await page.fill('input[name=imie]', 'Majka'); //uzytkownik wypełnia formularz dodawania kuriera
    await page.fill('input[name=nazwisko]', 'Zebra');
    await page.fill('input[name=email]', 'm.zebra@icloud.com');
    await page.fill('input[name=nrTelefonu]', '123456789');
    await page.click('text=Dodaj kuriera'); //klika przycisk dodaj kuriera
    await expect(page.getByRole('cell', { name: 'Majka' }).first()).toBeVisible(); //uyłam tu cell bo kurierzy są wyświetlani w tabeli, więc każda dana jest w swojej komórce i dzieki temu wyszukuje się 1 komórkę z imieniem "Majka" i sprawdzam czy jest widoczna
  });
  // Test E2E umer 8
  test('Edycja kuriera', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[type=email]', 'zosia@mail.com'); //logowanie
    await page.fill('input[type=password]', 'Pies123');
    await page.click('text=Zaloguj');
    await page.click('text=Kurierzy');
    await page.click('text=Edytuj'); //klika przycisk edytuj przy kurierze którego chcemy edytować 
    await page.fill('input[name=imie]', 'Filip');
    await page.click('text=Zapisz zmiany');
    await expect(page.locator('text=Filip')).toBeVisible(); //teraz powinien wyswietlic sie Filip po edycji 
  });
  // Test E2E umer 9
  test('Usunięcie kuriera', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[type=email]', 'zosia@mail.com'); //logowanie
    await page.fill('input[type=password]', 'Pies123'); 
    await page.click('text=Zaloguj');
    await page.click('text=Usuń'); //usuwa kuriera (zakładam ze to ten sam kurier co w poprzednim teście - Filip)
    await expect(page.locator('text=Filip')).not.toBeVisible(); //sprawdzam czy kurier Filip nie jest już widoczny na liście kurierów
  });
  // Test E2E umer 10
  test('Dodanie paczkomatu', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[type=email]', 'zosia@mail.com'); //logowanie
    await page.fill('input[type=password]', 'Pies123');
    await page.click('text=Zaloguj');
    await page.click('text=Paczkomaty'); //przechodzi do okna paczkomaty
    await page.fill('input[name=miasto]', 'Sopot'); //następnie wypełnia formularz dodawania paczkomatu
    await page.fill('input[name=adres]', 'ul. Mewowa 321');
    await page.fill('input[name=pojemnosc]', '120');
    await page.click('text=Dodaj paczkomat'); //klika przycisk dodaj paczkomat
    await expect(page.getByRole('cell', { name: 'Sopot' }).first()).toBeVisible(); //sprawdzam czy w tabeli pojawił się nowy paczkomat (szukam komórki z miastem Sopot) - tu tak samo jak z kurierem użyłam funkcji cell bo paczkomaty są w tabeli
  });
});
