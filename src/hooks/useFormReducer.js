import React, { useReducer } from 'react';

// @ts-ignore
const validateValue = (key, value, formValues, validators) => {
  if (validators.length > 0) {
    const errors = [];
    validators.forEach((validator) => {
      const error = validator(value, { ...formValues });
      if (error) {
        errors.push(error);
      }
    });
    if (errors.length > 0) {
      return errors[0];
    }
    return undefined;
  }
  return undefined;
};

const UPDATE_FORM = 'UPDATE_FORM';
const VALIDATE_FORM = 'VALIDATE_FORM';
const RESET_FORM = 'RESET_FORM';
const REMOVE_PRISTINE = 'REMOVE_PRISTINE';
const START_SUBMITTING = 'START_SUBMITTING';
const STOP_SUBMITTING = 'STOP_SUBMITTING';
const UPDATE_SUBMIT_ERROR = 'UPDATE_SUBMIT_ERROR';

const createFormReducer = (validators = {}, initialValues = {}) => {
  let formValues = {};
  Object.keys(initialValues).forEach((key) => {
    formValues = { ...formValues, [key]: { value: initialValues[key] } };
  });

  Object.keys(validators).forEach((key) => {
    const error = validateValue(
      key,
      formValues[key],
      { ...formValues },
      validators?.[key],
    );
    formValues = {
      ...formValues,
      [key]: { value: formValues[key]?.value, error },
    };
  });

  const initialState = {
    pristine: true,
    submitting: false,
    formValues: { ...formValues },
    hasError:
      Object.keys(formValues).filter((key) => !!formValues[key].error).length >
      0,
  };
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_FORM: {
        if (!action?.payload) {
          return state;
        }
        const { key, value, error: customError } = action.payload;
        let newValue = value;

        if (value === '') {
          newValue = null;
        }
        let error = validateValue(
          key,
          newValue,
          { ...state.formValues },
          validators?.[key],
        );
        if (customError) {
          error = customError;
        }
        const newFormValues = {
          ...state.formValues,
          [key]: { value: newValue, error },
        };
        const hasError =
          Object.keys(newFormValues).filter((k) => !!newFormValues[k].error)
            .length > 0;
        return {
          ...state,
          formValues: { ...newFormValues },
          hasError,
          submitError: undefined,
        };
      }
      case VALIDATE_FORM: {
        let newFormValues = { ...state.formValues };

        Object.keys(validators).forEach((key) => {
          const value = state.formValues[key]?.value;
          const error = validateValue(
            key,
            value,
            { ...state.formValues },
            validators?.[key],
          );
          newFormValues = { ...newFormValues, [key]: { value, error } };
        });
        const hasError =
          Object.keys(newFormValues).filter((key) => !!newFormValues[key].error)
            .length > 0;

        return {
          ...state,
          formValues: { ...newFormValues },
          hasError,
        };
      }
      case UPDATE_SUBMIT_ERROR: {
        if (!action?.payload) {
          return state;
        }
        const { error: submitError } = action.payload;
        return { ...state, submitError };
      }
      case REMOVE_PRISTINE:
        return { ...state, pristine: false };
      case START_SUBMITTING:
        return { ...state, submitting: true };
      case STOP_SUBMITTING:
        return { ...state, submitting: false };
      case RESET_FORM:
        return initialState;
      default:
        return state;
    }
  };
  return { reducer, initialState };
};

export const useFormReducer = (
  validators = {},
  initialValues = {},
  onChange,
) => {
  const { reducer, initialState } = createFormReducer(
    validators,
    initialValues,
  );
  const [state, dispatch] = useReducer(reducer, initialState);

  const validateForm = () => {
    // @ts-ignore
    dispatch({ type: VALIDATE_FORM });
  };

  const change = (key, value) => {
    // @ts-ignore
    dispatch({ type: UPDATE_FORM, payload: { key, value } });
    validateForm();
  };

  const reset = () => {
    // @ts-ignore
    dispatch({ type: RESET_FORM });
  };

  const dirty = () => {
    // @ts-ignore
    dispatch({ type: REMOVE_PRISTINE });
  };

  const startSubmitting = () => {
    // @ts-ignore
    dispatch({ type: START_SUBMITTING });
  };

  const stopSubmitting = () => {
    // @ts-ignore
    dispatch({ type: STOP_SUBMITTING });
  };

  const setSubmitError = (error) => {
    // @ts-ignore
    dispatch({
      type: UPDATE_SUBMIT_ERROR,
      payload: { key: 'submitError', error },
    });
  };

  const handleSubmit = (callback) => (event) => {
    event?.preventDefault();
    dirty();
    if (callback && !state.hasError && !state.submitting) {
      startSubmitting();
      const data = Object.keys(state.formValues).reduce(
        (acc, key) => ({ ...acc, [key]: state.formValues[key].value }),
        {},
      );
      setTimeout(() => {
        callback(data);
        stopSubmitting();
      }, 200);
    }
  };

  const handleChange = (value) => {
    if (onChange) {
      const data = Object.keys(state.formValues).reduce(
        (acc, key) => ({ ...acc, [key]: state.formValues[key].value }),
        {},
      );
      onChange(value, {
        change,
        values: { ...data, ...value },
      });
    }
  };
  const shouldError = (key) => {
    const res = !state.pristine && !!state.formValues?.[key].error;

    return res;
  };

  const connectField = (name, extraProps = {}) => (Field) => (
    <Field
      // eslint-disable-next-line react/jsx-props-no-spreading
      name={name}
      key={name}
      value={state.formValues?.[name]?.value?.toString() ?? ''}
      error={shouldError(name)}
      errorMessage={
        shouldError(name) ? state.formValues?.[name]?.error : undefined
      }
      onChange={(e) => {
        change(name, e);
      }}
      {...extraProps}
    />
  );

  return {
    ...state,
    change,
    reset,
    dirty,
    handleSubmit,
    setSubmitError,
    connectField,
    handleChange,
  };
};
