# Alerts

Service for alerts, made with Sweetalert2.<br/>
All you need to do is pass, as first argument, the `title` of the alert and, as second argument, a `text` description for the alert.

#### The functions are:

- `successAlert()`
- `errorAlert()`
- `infoAlert()`
- `questionAlert()`

#### Examples:

```jsx
import { successAlert, errorAlert, infoAlert, questionAlert } from './Services/alertsService';

<button onClick={() => successAlert('Done', 'Task completed successfully')}>Success</button>

<button onClick={() => errorAlert('Oops...', 'Something went wrong!')}>Error</button>

<button onClick={() => infoAlert('Info', 'A message with information')}>Info</button>

<button onClick={() => questionAlert(
  'Deleting files',
  'Are you sure you want to delete permanently this file?',
).then((isAnswerConfirmed) => {
  if (isAnswerConfirmed) {
    successAlert('Deleted!', 'Your file has been deleted.');
  } else {
    infoAlert('Cancelled', 'Your file is safe');
  }
})}>Question</button>
```
