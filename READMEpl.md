# Contact Manager

## Przegląd

**Contact Manager** to aplikacja webowa stworzona w celu efektywnego zarządzania kontaktami. Umożliwia dodawanie, edytowanie, usuwanie oraz przeglądanie kontaktów wraz z ich kategoryzacją i podkategoryzacją. Aplikacja składa się z **backendu** napisanego w ASP.NET Core oraz **frontendu** stworzonego w Angularze.

---

## Specyfikacja techniczna

### Backend

Backend został zaimplementowany przy użyciu ASP.NET Core i udostępnia RESTowe API do zarządzania kontaktami, kategoriami, podkategoriami oraz uwierzytelnianiem użytkowników.

#### Kluczowe klasy i metody

1. **Kontrolery**
   - **`AuthController`**
     - `Register(UserRegisterDto dto)`: Rejestruje nowego użytkownika.
     - `Login(UserLoginDto dto)`: Uwierzytelnia użytkownika i generuje token JWT.
   - **`ContactsController`**
     - `GetAllContacts()`: Pobiera wszystkie kontakty.
     - `GetContact(int id)`: Pobiera kontakt o podanym ID.
     - `CreateContact(Contact contact)`: Dodaje nowy kontakt.
     - `UpdateContact(int id, Contact updated)`: Aktualizuje istniejący kontakt.
     - `DeleteContact(int id)`: Usuwa kontakt.
   - **`CategoriesController`**
     - `GetCategories()`: Pobiera wszystkie kategorie.
     - `GetSubcategories(int categoryId)`: Pobiera podkategorie przypisane do danej kategorii.

2. **Modele**
   - **`Contact`**
     - Reprezentuje kontakt z właściwościami takimi jak:
       - **`FirstName`**: Imię kontaktu (wymagane).
       - **`LastName`**: Nazwisko kontaktu (wymagane).
       - **`Email`**: Adres e-mail kontaktu (wymagany, poprawny format).
       - **`Password`**: Hasło kontaktu (wymagane, min. 6 znaków).
       - **`CategoryId`**: ID kategorii przypisanej do kontaktu.
       - **`SubcategoryId`**: ID przypisanej podkategorii (opcjonalne).
       - **`OtherSubcategory`**: Własna nazwa podkategorii, jeśli nie pasuje żadna z predefiniowanych (opcjonalne).
       - **`Phone`**: Numer telefonu kontaktu (opcjonalnie).
       - **`BirthDate`**: Data urodzenia (opcjonalnie).
       - **`Id`**: Unikalny identyfikator kontaktu (klucz główny z autoinkrementacją).
   - **`Category`**
     - Reprezentuje kategorię i zawiera:
       - **`Id`**: Unikalny identyfikator (klucz główny z autoinkrementacją).
       - **`Name`**: Nazwa kategorii (wymagana).
       - **`Subcategories`**: Kolekcja podkategorii przypisanych do tej kategorii (typ `ICollection<Subcategory>`).
   - **`Subcategory`**
     - Reprezentuje podkategorię przypisaną do kategorii nadrzędnej. Właściwości:
       - **`Id`**: Unikalny identyfikator (klucz główny).
       - **`Name`**: Nazwa podkategorii (wymagana).
       - **`CategoryId`**: ID kategorii nadrzędnej (klucz obcy).
       - **`Category`**: Nawigacyjna właściwość wskazująca na kategorię nadrzędną.
   - **`User`**
     - Reprezentuje użytkownika systemu:
       - **`Id`**: Unikalny identyfikator użytkownika (klucz główny).
       - **`Email`**: Adres e-mail użytkownika (wymagany).
       - **`PasswordHash`**: Zahasłowane hasło użytkownika (wymagane).

3. **Warstwa danych**
   - **`AppDbContext`**
     - Konfiguruje kontekst bazy danych przy użyciu Entity Framework Core.
     - Zawiera `DbSet`y dla `Contacts`, `Categories`, `Subcategories` oraz `Users`.

4. **Uwierzytelnianie**
   - Uwierzytelnianie JWT zostało zaimplementowane z wykorzystaniem `Microsoft.AspNetCore.Authentication.JwtBearer`.

#### Wykorzystane biblioteki

- **ASP.NET Core** – framework backendowy
- **Entity Framework Core** – ORM do komunikacji z bazą
- **Microsoft.AspNetCore.Authentication.JwtBearer** – uwierzytelnianie JWT
- **BCrypt.Net-Next** – haszowanie haseł
- **Swashbuckle.AspNetCore** – dokumentacja Swagger

---

### Frontend

Frontend został zbudowany przy użyciu Angulara i oferuje wygodny interfejs do komunikacji z API backendowym.

#### Kluczowe komponenty i funkcje

1. **Komponenty**
   - **`AppComponent`** – komponent główny z układem i nawigacją
   - **`HomeComponent`** – strona powitalna z instrukcjami
   - **`LoginComponent`** – logowanie i zarządzanie sesją
   - **`RegisterComponent`** – rejestracja konta
   - **`ContactsListComponent`** – lista kontaktów
   - **`ContactAddComponent`** – formularz dodawania kontaktu
   - **`ContactDetailsComponent`** – szczegóły kontaktu z możliwością edycji

2. **Serwisy**
   - **`AuthService`** – logika logowania, wylogowania, rejestracji
   - **`ContactService`** – operacje CRUD dla kontaktów, kategorii i podkategorii

3. **Routing**
   - Skonfigurowany w `app.routes.ts`, obsługuje ścieżki `/home`, `/login`, `/register`, `/contacts` itd.

4. **Interceptory**
   - **`AuthInterceptor`** – automatyczne dodawanie tokena JWT do zapytań HTTP

#### Wykorzystane biblioteki

- **Angular** – framework frontendowy
- **RxJS** – programowanie reaktywne
- **Zone.js** – detekcja zmian
- **Karma** – testy jednostkowe
- **Jasmine** – framework do pisania testów

---

## Instrukcja uruchomienia i kompilacji

### Backend

1. **Wymagania wstępne**
   - Zainstaluj [.NET SDK](https://dotnet.microsoft.com/download)
   - (Opcjonalnie) Zainstaluj SQLite
   - Zainstaluj Entity Framework CLI (jeśli nie masz):
     ```bash
     dotnet tool install --global dotnet-ef
     ```

2. **Instalacja**
   - Przejdź do katalogu backendu:
     ```bash
     cd contact-manager-backend
     ```
   - Przywróć zależności:
     ```bash
     dotnet restore
     ```
   - Zastosuj migracje i utwórz bazę:
     ```bash
     dotnet ef database update
     ```
   - Uruchom aplikację:
     ```bash
     dotnet run --launch-profile https
     ```

   Aplikacja będzie dostępna pod:
   - `http://localhost:5224`
   - `https://localhost:7243`

3. **Swagger**
   - Dokumentacja API dostępna pod:
     - `http://localhost:5224/swagger`
     - `https://localhost:7243/swagger`

---

### Frontend

1. **Wymagania wstępne**
   - Zainstaluj [Node.js](https://nodejs.org/)
   - Zainstaluj Angular CLI:
     ```bash
     npm install -g @angular/cli
     ```

2. **Instalacja**
   - Przejdź do katalogu frontendowym:
     ```bash
     cd contact-manager-frontend
     ```
   - Zainstaluj zależności:
     ```bash
     npm install
     ```
   - Uruchom serwer deweloperski:
     ```bash
     npm start
     ```

   Frontend będzie dostępny pod: `http://localhost:4200`

---

## Instrukcja użytkowania

1. **Rejestracja**
   - Przejdź do `/register`, aby utworzyć konto.

2. **Logowanie**
   - Przejdź do `/login`, aby się zalogować.

3. **Zarządzanie kontaktami**
   - Zobacz listę kontaktów na `/contacts`.
   - Dodaj nowy kontakt przez `/contacts/add`.
   - Edytuj lub usuń kontakt, klikając go na liście.

4. **Wylogowanie**
   - Przejdź do `/login`, aby się wylogować.
   - Szczegóły kontaktu możesz przeglądać bez uprawnień do edycji.

---

## Uwagi dodatkowe

- **CORS**: Backend pozwala na zapytania z `http://localhost:4200`.
- **JWT**: Token JWT jest przechowywany w `localStorage` i dodawany automatycznie przez `AuthInterceptor`.
- **Baza danych**: Używana jest baza SQLite. Plik bazy to `contacts.db` i znajduje się w katalogu backendu.
