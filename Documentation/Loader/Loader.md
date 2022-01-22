# Loader

Component to show a loader spinner while something loads made with react-loader-spinner.<br/>
All you need to do is pass, as prop the word: 'full' if you want to show a fullscreen loader or let props empty and show a tiny spinner. <br/>

#### The functions are:

- `successAlert()`
- `errorAlert()`
- `infoAlert()`
- `questionAlert()`

#### Examples:

```jsx
import React from 'react';
import LoadSpinner from '../../LoaderSpiner';

const HomePage = () => {
  return (
    <div
      style={{
        width: '100%',
        heigth: '100vh',
      }}>
      <LoaderSpinner full />
    </div>
  );
};

export default HomePage;
```
