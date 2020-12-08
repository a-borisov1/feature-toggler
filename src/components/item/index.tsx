import React, { useState } from 'react';
import moment from 'moment';

import Popover from '@material-ui/core/Popover';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClearAll from '@material-ui/icons/ClearAll';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { translations } from '../../locale/locale_picker';

import { IListItem } from '../main';

import './style.scss';

interface IItem {
  activeByDefault: boolean;
  _key: string;
  value: string;
  onDelete: (key: string) => void;
  labels?: string[];
  createdAt?: number;
  featuresList: IListItem[];
  setFeaturesList: (featuresList: IListItem[]) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  })
);

export const Item: React.FC<IItem> = ({
  activeByDefault,
  value,
  _key,
  onDelete,
  labels,
  createdAt,
  featuresList,
  setFeaturesList,
}) => {
  const [active, setActive] = useState<boolean>(activeByDefault);
  const [currentValue, setCurrentValue] = useState<string>(value);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleDelete = () => {
    active ? setOpen(true) : onDelete(value);
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleErase = () => {
    setCurrentValue('');
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentValue(e.currentTarget.value);
    const changedFeaturesList = featuresList.map((elem) =>
      elem.key === _key ? { ...elem, value: e.currentTarget.value } : elem
    );
    setFeaturesList(changedFeaturesList);
  };

  const opened = !!anchorEl;
  return (
    <div className={`item ${active ? 'active' : ''}`}>
      <Switch
        checked={active}
        onChange={() => setActive(!active)}
        name="checkedB"
        color="primary"
      />
      <div className="item__info">
        <TextField
          className="item__text"
          value={currentValue}
          onChange={(e) => handleChange(e)}
        />
        <p className="item__date">
          {translations['Created at']}
          {moment(createdAt ?? '').format('DD.MM.YY')}
        </p>
      </div>

      <div className="item__labels">
        {labels?.map((elem) => {
          return (
            <div className="item__labels__label" key={elem}>
              {elem}
            </div>
          );
        })}
      </div>
      <div className="item__controls">
        <IconButton
          onClick={handleErase}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          className="item__controls__button_edit"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <ClearAll color="primary" />
        </IconButton>
        <Popover
          id="mouse-over-popover"
          open={opened}
          anchorEl={anchorEl}
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>Press to erase feature title</Typography>
        </Popover>
        <IconButton
          className="item__controls__button_delete"
          onClick={handleDelete}
        >
          <DeleteForeverIcon color={active ? 'disabled' : 'secondary'} />
        </IconButton>
      </div>
      <Snackbar open={open} autoHideDuration={2600} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Set this feature inactive first!
        </Alert>
      </Snackbar>
    </div>
  );
};
