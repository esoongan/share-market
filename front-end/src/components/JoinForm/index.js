import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from 'react-select';
import { locations } from 'constant/locale';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  checkbox: {
    alignSelf: 'flex-start',
  },
}));

export default function JoinForm({
  username,
  email,
  password,
  onChangeField,
  onSelect,
  onSubmit,
}) {
  const classes = useStyles();
  const handleChangeField = e => {
    const { value, name } = e.target;
    onChangeField({ name, value });
  };
  // const handleSelect = ({ value }) => {
  //   const { onSelect } = this.props
  //   onSelect({ value })
  // }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          쉐어마켓 시작하기
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="userName"
                value={username}
                onChange={handleChangeField}
                autoComplete="name"
                name="userName"
                variant="outlined"
                required
                fullWidth
                label="아이디"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                value={email}
                onChange={handleChangeField}
                variant="outlined"
                required
                fullWidth
                label="이메일"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                value={password}
                onChange={handleChangeField}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                id="addr"
                options={locations}
                onChange={onSelect}
                placeholder="검색 또는 선택하세요."
                onSelectResetsInput={false}
                isSearchable
              />
            </Grid>
          </Grid>
          <Button
            onClick={onSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            가입하기
          </Button>
        </form>
      </div>
    </Container>
  );
}
