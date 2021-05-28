import { makeStyles } from '@material-ui/core/styles';

// ==============================================

const buttonStyles = makeStyles(() => ({
  root: {
    padding: '0 30px',
    height: '60px',
    width: '100%',
    borderRadius: '5px',
    border: 'none',
    color: 'var(--text-primary)',
    background: 'var(--translucent-primary)',
    // background: 'linear-gradient(90deg, var(--gradient-green-starting), var(--gradient-green-ending))',
    transition: 'all 0.3s ease',
    '&:hover': { 
      boxShadow: 'var(--hover-shadow)',
      transform: 'scaleX(1.01) scaleY(1.01)',
      color: 'var(--text-secondary)'
    }
  },
}));

const buttonStylesOrange = makeStyles(() => ({
  root: {
    padding: '0 30px',
    height: '60px',
    width: '100%',
    borderRadius: '5px',
    border: 'none',
    color: 'var(--text-primary)',
    background: 'linear-gradient(90deg, var(--gradient-orange-starting), var(--gradient-orange-ending))',
    transition: 'all 0.3s ease',
    '&:hover': { 
      boxShadow: 'var(--hover-shadow)',
      transform: 'scaleX(1.01) scaleY(1.01)',
      color: 'var(--text-secondary)'
    }
  },
  
}));

const buttonStylesGreen = makeStyles(() => ({
  root: {
    padding: '0 30px',
    height: '60px',
    width: '100%',
    borderRadius: '5px',
    border: 'none',
    color: 'var(--text-primary)',
    background: 'linear-gradient(90deg, var(--gradient-green-starting), var(--gradient-green-ending))',
    transition: 'all 0.3s ease',
    '&:hover': { 
      boxShadow: 'var(--hover-shadow)',
      transform: 'scaleX(1.01) scaleY(1.01)',
      color: 'var(--text-secondary)'
    }
  },
}));

const buttonStylesPurple = makeStyles(() => ({
  root: {
    padding: '0 30px',
    height: '60px',
    width: '100%',
    borderRadius: '5px',
    border: 'none',
    color: 'var(--text-primary)',
    background: 'linear-gradient(90deg, var(--gradient-purple-starting), var(--gradient-purple-ending))',
    transition: 'all 0.3s ease',
    '&:hover': { 
      boxShadow: 'var(--hover-shadow)',
      transform: 'scaleX(1.01) scaleY(1.01)',
      color: 'var(--text-secondary)'
    }
  },
}));

// ==============================================

const inputStyles = makeStyles({
  root: {
    '& .MuiInput-underline::before': {
      borderBottom: '2px solid var(--translucent-primary)',
    },
    '& .MuiFormLabel-root': { color: 'var(--text-primary)' },
    '& .MuiRadio-colorSecondary.Mui-checked': { color: 'var(--text-primary)' },
    '& .MuiRadio-colorSecondary': { color: 'var(--text-primary)' },
  },
});

// ==============================================

export {buttonStyles, buttonStylesOrange, buttonStylesGreen, buttonStylesPurple, inputStyles};