# Blog App

A simple blog application built with React, TypeScript, and Shadcn/UI. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- View a list of blog posts with pagination and search functionality.
- Create new blog posts with a WYSIWYG editor.
- Edit and delete existing blog posts.
- View individual blog posts with details and images.

## Technologies Used

- **React:** The core JavaScript library for building user interfaces.
- **TypeScript:** Provides static typing for improved code quality and maintainability.
- **Shadcn/UI:** A collection of accessible and customizable UI components.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **React Router:** Handles navigation and routing within the app.
- **React Hook Form:** Simplifies form management and validation.
- **Zod:** Provides schema validation for form data.
- **react-simple-wysiwyg:** A basic WYSIWYG editor for rich text editing.
- **react-lazyload:** Optimizes image loading by lazy loading images.
- **date-fns:** Provides convenient functions for working with dates.
- **Lucide React:** An icon library for React applications.
- **ESLint:** A static code analysis tool for identifying problematic patterns found in JavaScript code.

## Implementation Notes

- **State Management:** The application uses React's Context API for global state management (`BlogContext`).
- **Data Storage:** Blog posts are stored in the browser's local storage.
- **Form Validation:** `react-hook-form` and `zod` are used for form validation and schema definition.
- **WYSIWYG Editor:** The `react-simple-wysiwyg` library provides a basic WYSIWYG editor for creating and editing blog post content.
- **Lazy Loading:** `react-lazyload` is used to lazily load images, improving performance.

## Getting Started with the project

1.  **Clone the repository:**

    ```bash
    git clone [invalid URL removed]
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd blog-app
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Start the development server:**

    ```bash
    npm start
    # or
    yarn start  

    ```

    The app should now be running at `http://localhost:3000` in your browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

ESLint is configured to ensure code quality and consistency. Analyze the code for potential errors and style violations.

### `npm run lint:fix`

Automatically fix any fixable linting issues.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Screenshots

- **Blog Post List Page**

 <img width="369" alt="Screenshot 2024-08-10 at 11 39 12 2" src="https://github.com/user-attachments/assets/6885c3ec-43f2-4207-bbc3-5a7129fe210a">

- **Blog Post Detail Page**

<img width="353" alt="Screenshot 2024-08-10 at 11 41 00" src="https://github.com/user-attachments/assets/28171bd4-0bd9-45f3-bc30-621bfbd6adbd">

- **New/Edit Blog Post Page**
  
<img width="332" alt="Screenshot 2024-08-10 at 11 40 15" src="https://github.com/user-attachments/assets/b9cfa462-87a7-4888-958f-941ef9680a52">

- **Delete Confirmation Modal**

<img width="772" alt="Screenshot 2024-08-10 at 11 41 16" src="https://github.com/user-attachments/assets/0ba24b8e-f77b-4dc5-b6c8-96d20061d417">

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
