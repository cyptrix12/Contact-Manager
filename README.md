# Contact Manager

## Overview

The **Contact Manager** is a web application designed to help users manage their contacts efficiently. It provides features such as adding, editing, deleting, and viewing contacts, along with categorization and subcategorization. The application consists of a **backend** built with ASP.NET Core and a **frontend** built with Angular.

---

## Technical Specification

### Backend

The backend is implemented using ASP.NET Core and provides a RESTful API for managing contacts, categories, subcategories, and user authentication.

#### Key Classes and Methods

1. **Controllers**
   - **`AuthController`**
     - `Register(UserRegisterDto dto)`: Registers a new user.
     - `Login(UserLoginDto dto)`: Authenticates a user and generates a JWT token.
   - **`ContactsController`**
     - `GetAllContacts()`: Retrieves all contacts.
     - `GetContact(int id)`: Retrieves a specific contact by ID.
     - `CreateContact(Contact contact)`: Adds a new contact.
     - `UpdateContact(int id, Contact updated)`: Updates an existing contact.
     - `DeleteContact(int id)`: Deletes a contact.
   - **`CategoriesController`**
     - `GetCategories()`: Retrieves all categories.
     - `GetSubcategories(int categoryId)`: Retrieves subcategories for a specific category.

2. **Models**
- **`Contact`**
    - Represents a contact with properties such as:
      - **`FirstName`**: The first name of the contact (required).
      - **`LastName`**: The last name of the contact (required).
      - **`Email`**: The email address of the contact (required and must be in a valid format).
      - **`Password`**: The password for the contact (required, minimum 6 characters).
      - **`CategoryId`**: The ID of the category to which the contact belongs.
      - **`SubcategoryId`**: The ID of the subcategory to which the contact belongs (optional).
      - **`OtherSubcategory`**: A custom subcategory name if no predefined subcategory is applicable (optional).
      - **`Phone`**: The phone number of the contact (optional).
      - **`BirthDate`**: The birth date of the contact (optional).
      - **`Id`**: The unique identifier for the contact (auto-incremented primary key).
- **`Category`**
  - Represents a category in the system. It includes the following properties:
     - **`Id`**: The unique identifier for the category (auto-incremented primary key).
     - **`Name`**: The name of the category (required).
     - **`Subcategories`**: A collection of associated subcategories, represented as an `ICollection<Subcategory>`.

- **`Subcategory`**
  - Represents a subcategory that belongs to a specific category. It includes the following properties:
     - **`Id`**: The unique identifier for the subcategory (auto-incremented primary key).
     - **`Name`**: The name of the subcategory (required).
     - **`CategoryId`**: The ID of the parent category to which this subcategory belongs (foreign key).
     - **`Category`**: A navigation property representing the parent `Category`.

- **`User`**
  - Represents a user of the application. It includes the following properties:
     - **`Id`**: The unique identifier for the user (auto-incremented primary key).
     - **`Email`**: The email address of the user (required and must be in a valid format).
     - **`PasswordHash`**: The hashed password of the user (required).

3. **Data Layer**
   - **`AppDbContext`**
     - Configures the database context using Entity Framework Core.
     - Contains `DbSet` properties for `Contacts`, `Categories`, `Subcategories`, and `Users`.

4. **Authentication**
   - JWT-based authentication is implemented using `Microsoft.AspNetCore.Authentication.JwtBearer`.

#### Libraries Used

- **ASP.NET Core**: Framework for building the backend.
- **Entity Framework Core**: ORM for database interactions.
- **Microsoft.AspNetCore.Authentication.JwtBearer**: For JWT-based authentication.
- **BCrypt.Net-Next**: For password hashing.
- **Swashbuckle.AspNetCore**: For generating Swagger documentation.

---

### Frontend

The frontend is built using Angular and provides a user-friendly interface for interacting with the backend API.

#### Key Components and Features

1. **Components**
   - **`AppComponent`**
     - Root component that defines the main layout and navigation.
   - **`HomeComponent`**
     - Displays a welcome message and instructions for using the application.
   - **`LoginComponent`**
     - Allows users to log in and manage their session.
   - **`RegisterComponent`**
     - Allows users to register a new account.
   - **`ContactsListComponent`**
     - Displays a list of all contacts.
   - **`ContactAddComponent`**
     - Provides a form for adding a new contact.
   - **`ContactDetailsComponent`**
     - Displays and allows editing of a specific contact's details.

2. **Services**
   - **`AuthService`**
     - Handles user authentication (login, logout, registration).
   - **`ContactService`**
     - Handles CRUD operations for contacts, categories, and subcategories.

3. **Routing**
   - Configured in app.routes.ts to define navigation paths such as `/home`, `/login`, `/register`, `/contacts`, etc.

4. **Interceptors**
   - **`AuthInterceptor`**
     - Adds the JWT token to HTTP requests for authenticated endpoints.

#### Libraries Used

- **Angular**: Framework for building the frontend.
- **RxJS**: For reactive programming.
- **Zone.js**: For change detection.
- **Karma**: For unit testing.
- **Jasmine**: For writing test cases.

---

## Compilation and Setup Instructions

### Backend

1. **Prerequisites**
   - Install [.NET SDK](https://dotnet.microsoft.com/download).
   - Install SQLite (optional, for database inspection).
   - Install Entity Framework CLI (if not already installed):
     ```bash
     dotnet tool install --global dotnet-ef
     ```

2. **Setup**
   - Navigate to the backend directory:
     ```bash
     cd contact-manager-backend
     ```
   - Restore dependencies:
     ```bash
     dotnet restore
     ```
   - Apply migrations to set up the database:
     ```bash
     dotnet ef database update
     ```
   - Run the application:
     ```bash
     dotnet run --launch-profile https
     ```
   - The backend will be available at `http://localhost:5224`, `https://localhost:7243`.

3. **Swagger**
   - Access Swagger documentation at `http://localhost:5224/swagger`, `https://localhost:7243/swagger`.

---

### Frontend

1. **Prerequisites**
   - Install [Node.js](https://nodejs.org/).
   - Install Angular CLI:
     ```bash
     npm install -g @angular/cli
     ```

2. **Setup**
   - Navigate to the frontend directory:
     ```bash
     cd contact-manager-frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```
   - The frontend will be available at `http://localhost:4200`.


---

## Usage Instructions

1. **Register**
   - Navigate to `/register` and create a new account.

2. **Login**
   - Navigate to `/login` and log in with your credentials.

3. **Manage Contacts**
   - View all contacts on the `/contacts` page.
   - Add a new contact via `/contacts/add`.
   - Edit or delete a contact by clicking on it in the list.

4. **Logout**
    - Navigate to `/login` and log out.
    - Check contacts details without permission to edit.


---

## Additional Notes

- **CORS**: The backend is configured to allow requests from `http://localhost:4200`.
- **JWT Authentication**: Ensure the token is stored securely in `localStorage` and included in requests via the `AuthInterceptor`.
- **Database**: The application uses SQLite as the database. The database file is named `contacts.db` and is located in the backend directory.
