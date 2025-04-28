# Advanced Job Application System

## Features and Screens

### Job List Screen

#### Job List
- Create a job list screen with dynamic data fetched from a mock API (e.g., using json-server or similar tools).
- Implement pagination to handle a large number of jobs.
- Add a search textbox above the list to filter the jobs based on the title, company name, and skills required.
- Each job listing should include an "Apply for Job" action.
- Show job details in a modal when clicking the job title in the list.

#### Job Details Modal
- **Logo of the company**
- **Job Title** (string)
- **Name of the company**
- **Experience Required** (number)
- **Skills Required** (string - show as tags)
- **Job Description** (string)
- **Apply for Job**

### Application Form
- Show the form to apply for a job when the user clicks the Apply button from the job list.
- The form should include the following attributes:
  - **First Name** (string)
  - **Last Name** (string)
  - **Email** (string)
  - **Skills** (Multi-select) - Use react-select or react-select/async with at least 30 data points for skills, and make this field searchable.
  - **About Me** (string) - Use a Rich Text Editor for this field.
- Implement Formik for form validation.
- After submission, mark the selected job as "applied", disable the apply button, and show an "applied" tag on the list.

### Confirmation & Error Handling
- Show a confirmation modal on successful job application submission.
- Implement error handling for form submission with appropriate feedback messages.

### View Job Application

#### Application Details
- Display job application details in a modal when the user clicks on the "applied" tag in the job list.
- Ensure the "About Me" section is properly formatted (bold, italic, etc.) as provided in the Rich Text Editor.
- Provide options to print and download the job application details as a PDF with a proper design.

### Additional Features

#### User Authentication
- Implement a basic user authentication system (mock authentication) with login and signup functionality.
- Protect certain routes (like applying for a job) to be accessible only by logged-in users.

#### Job Management (Admin)
- Create an admin panel for job management where admins can add, edit, or delete job postings.

## Tech Stack
- **TypeScript** for all development instead of JavaScript.
- **Redux (or similar)** for state management.
- **Bootstrap (or similar)** for UI components and styling.
- **Formik (or similar)** for form handling and validation.
- **React Router** for navigation and routing.
- **Rich Text Editor** like Draft.js or Quill for the "About Me" field.
- **PDF Generation** using libraries like jsPDF or similar.

## Development Practices
- Initialize Git for this project and ensure every major update has proper commits with descriptive messages.
- Ensure the application is responsive and works well on different screen sizes.
- Write unit tests for critical components and logic using Jest and React Testing Library.
- Implement eslint and prettier for code quality and consistency.

## Note
- Do not persist data with a back-end server; use reducers to handle the state within the application.
- Ensure that the application is well-documented, including setup instructions, architecture overview, and component structure.
