# Dashboard

## Description
This project is a React-based website that serves as a dashboard for analyzing data. It includes various widgets and pages to visualize and interpret data. The purpose of this project was to enhance my React skills. While I initially followed a course for part of the development, I expanded it by adding additional widgets and pages. Additionally, I implemented user authentication using Python and Django as a refresher for my backend skills.

## Installation
To set up the project on your local machine, follow these steps:
1. Open the console and run the following command: `npm install`
2. To run the application, type: `npm run`

## Technologies Used
- JavaScript
- React
- Material-UI (Mui)
- Nivo
- Axios
- Formik
- Yup
- React-Pro-Sidebar
- Redux
- React-Redux-Toolkit
- JWT (JSON Web Tokens)
- Python
- Django

## Features
The primary focus of this project is to display analyzed data in a chart format. It provides various widgets and pages for visualizing and interpreting data.

## Code Example
Here's an example code snippet from the calendar page:

```javascript
const saveEvent = () => {
  console.log(selected);
  console.log(selected.dateStr);
  if (selected) {
    const event_title = title;

    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title: event_title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
    setTitle('');
  }
  setOpen(false);
  setSelected(null);
};
```

## Contact Information
- Name: Ali Attia
- Email: aly2292005@gmail.com
- Phone Number: +201027393406