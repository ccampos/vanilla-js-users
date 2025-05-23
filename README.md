# Responsive User Directory

This project is a front-end coding assessment built using **HTML5**, **TypeScript**, **SASS**, and **Bootstrap 5**. It consumes a RESTful API to display a list of users, allowing filtering by name or email in real time. The page is fully responsive and built with performance and progressive design principles in mind.

---

## 🚀 Features

* Fetches and displays users from a REST API
* Responsive layout using Bootstrap 5
* Live search input for filtering users by name or email
* Styled with custom SASS and Bootstrap utility classes
* Clean TypeScript logic with interface definitions
* Loading state and error handling (optional)
* Progressive Web Design practices

---

## 🔧 Technologies

* HTML5
* TypeScript
* SASS (compiled to CSS)
* Bootstrap 5
* REST API: [JSONPlaceholder Users](https://jsonplaceholder.typicode.com/users)

---

## 📂 Project Structure

```
/index.html        → HTML structure
/style.scss        → Main styles (compiled to style.css)
/style.css         → Compiled output from SASS
/main.ts           → TypeScript logic (fetching, filtering, rendering)
/main.js           → Compiled output from TypeScript
```

---

## 🛠️ How to Run

1. Compile SASS:

   ```bash
   sass style.scss style.css
   ```

2. Compile TypeScript:

   ```bash
   tsc main.ts
   ```

3. Open `index.html` in your browser.

> ⚠️ Alternatively, use a Live Server extension (e.g., in VS Code) for easier local development.

---

## 📌 Notes

* API endpoints may differ during the live interview; this version uses a public mock API for preparation.
* The filtering function and DOM rendering logic are structured for clarity and scalability.

---

## 📄 License

This project is intended for assessment and demonstration purposes.
