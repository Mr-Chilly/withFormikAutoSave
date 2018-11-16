# withFormikAutoSave

provides a Higher Order Component (HoC) to run a function after every Formik react form value update.

Based off Jared Palmers example gist: https://gist.github.com/jaredpalmer/56e10cabe839747b84b81410839829be


### crikey! stop talking and let me install it...
```javascript
// ok ok, calm down... 
yarn add withformikautosave
```

```javascript
import { compose } from 'redux';
import { withFormik } from 'formik';
import withFormikAutoSave from 'withFormikAutoSave';
import MightMorphinPowerForm from '../blah'; 

// Standard form using Formik's HoC
const formikEnhancer = withFormik({
  handleSubmit: () => 'Zordon will contact you in due course',
  displayName: 'RangerSignUpForm',
});


// Auto Save function
const AutoSaveEnhancer = withFormikAutoSave({
  onSave: (values, props) => {
    console.log(values, props);
    return new Promise(resolve => resolve()); // must return a promise
  },
});

export default compose(
  formikEnhancer,
  AutoSaveEnhancer
)(MightMorphinPowerForm);
```

## API

### `withFormikAutoSave(config)`

Wraps your formik form with a simple lifecycle component which will fire a `onSave` function whenever a value is updated.

#### config (Object)
* `onSave` (Function):  `((values, props) => Promise)`
The funciton to be carried out on every save, will be passed the full forms values and props. This means the props will (usually) have access to your `handleSubmit` function. Please note this function (currently) **must return** a Promise   

### Props decoration

Your form should be decorated with three additional props:
* `isAutoSaving` (bool) dictates if the `onSave` function is currently firing
*  `lastAutoSaved` (string) dateTime created when the `onSave` function last successfully returned without an error
* `autoSaveError` (object) Any current errors returned from the latest `onSave`


