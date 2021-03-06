import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import { UpdatePassword } from 'redux/actions';

const useStyles = makeStyles( theme => ({
  root: {},
  textField: {
    marginTop: theme.spacing(2)
  },
}));

const schema = {
  oldPassword: {
    presence: { allowEmpty: false, message: '^Mật khẩu không để trống' },
  },
  password: {
    presence: { allowEmpty: false, message: '^Mật khẩu không để trống' },
    length: {
      maximum: 128,
      message: "^Mật khẩu tối đa 128 ký tự",
      minimum: 6,
      message: "^Mật khẩu tối thiểu 6 ký tự",
    },
    format: {
      pattern: "[a-zA-Z0-9]+",
      flags: "i",
      message: "^Chỉ bao gồm các ký tự số 0-9, chữ thường và hoa a-zA-Z"
    }
  },
  confirm: {
    equality: {
      attribute: "password",
      message: "^Mật khẩu không khớp!",
    },
  },
};

const Password = props => {
  const { className, loading, message, updatePassword, ...rest } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect( () => {
    setFormState(formState => ({
      ...formState,
      errors: !loading ? {message: message} : {}
    }));
  }, [loading]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;
  const hasErrorApi = field => formState.errors[field] ? true : false;

  const handleSubmit = event => {
    event.preventDefault();
    updatePassword(formState.values);
    setFormState(formState => ({...formState, isValid: false}));
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={ handleSubmit }>
        <CardHeader
          subheader="Thay đổi mật khẩu"
          title="Mật khẩu"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Mật khẩu hiện tại"
            name="oldPassword"
            type="password"
            required
            variant="outlined"
            error={hasError('oldPassword')}
            helperText={
              hasError('oldPassword') ? formState.errors.oldPassword[0] : null
            }
            onChange={handleChange}
          />
        </CardContent>
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Mật khẩu mới"
            name="password"
            type="password"
            required
            variant="outlined"
            error={hasError('password')}
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Nhập lại mật khẩu"
            name="confirm"
            style={{ marginTop: '1rem' }}
            type="password"
            required
            variant="outlined"
            error={hasError('confirm')}
            helperText={
              hasError('confirm') ? formState.errors.confirm[0] : null
            }
            onChange={handleChange}
          />
          <TextField
            className={classes.textField}
            error={true}
            fullWidth
            helperText={
              hasErrorApi('message') ? formState.errors.message : null
            }
            name="message"
            type="hidden"
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            disabled={!formState.isValid||loading}
          >
            {loading && <CircularProgress size={15} />} Cập nhật
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,

  updatePassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loading: state.dataNotifyRules.loadingSavePassword,
    message: state.dataNotifyRules.messagePassword,
});

const mapDispatchToProps = dispatch =>  ({
  updatePassword: password => dispatch(UpdatePassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Password)
