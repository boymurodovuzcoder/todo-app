import { useState } from "react";
import { teal, cyan } from "@material-ui/core/colors";
import {
  Grid,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Divider,
  Fade,
  ClickAwayListener,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  ListItemSecondaryAction,
  Popper,
  Grow,
  MenuList,
  MenuItem,
  Tabs,
  Tab,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { CheckBox } from "@material-ui/icons";
import Modal from "../UI/Modal";

const useStyles = makeStyles((theme) => ({
  groupContainer: {
    position: "absolute",
    width: "65%",
    right: 0,
    bottom: 0,
    top: 63,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  infoContainer: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    margin: "0.3rem 0.5rem",
    boxShadow: theme.shadows[3],
    backgroundColor: cyan[100],
  },
  groupTitle: {
    fontSize: "2.5rem",
    color: theme.palette.secondary.main,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
    },
  },
  groupTitleContainer: {
    overflow: "auto",
    "&::-webkit-scrollbar": {
      height: 5,
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.grey[300],
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.main,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.primary.light,
    },
  },
  todos: {
    position: "absolute",
    bottom: 0,
    top: 102,
    width: "100%",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: 10,
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.grey[300],
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.main,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.primary.light,
    },
  },
  menuItem: {
    color: "#fff",
    fontWeight: 600,
    fontFamily: "Raleway",
  },
  listItem: {
    backgroundColor: teal[300],
  },
  searchInput: {
    [theme.breakpoints.down("md")]: {
      width: 180,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  icon: {
    fill: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  listText: {
    wordWrap: "break-word",
    marginRight: "1.5rem",
  },
}));

const arrays = [...new Array(30)].map((el) => [
  "Home",
  "Garden, Kitchen, Bedroom, Roof, Toilet",
]);

function TodoGroupContainer() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [openSearch, setOpenSearch] = useState(false);
  const [checked, setChecked] = useState([0]);
  const [openPopper, setOpenPopper] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [tab, setTab] = useState("todos");

  const handlePopper = (index) => (e) => {
    setOpenPopper(index);
    setAnchorEl(e.currentTarget);
  };
  const clickOpenPopper = (index) => (e) => {
    setOpenPopper((prev) => (prev === index ? null : index));
    setAnchorEl(e.currentTarget);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const editTodoHandler = (e) => {
    setOpenPopper(null);
    setAnchorEl(null);
    setModalType("EditTodo");
  };
  const deleteTodoHandler = (e) => {
    setOpenPopper(null);
    setAnchorEl(null);
    setModalType("DeleteTodo");
  };
  const handleClosePopper = () => {
    setOpenPopper(null);
    setAnchorEl(null);
  };
  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Grid container direction="column" className={classes.groupContainer}>
        <Paper square className={classes.infoContainer}>
          {/*--- ToolBar ---*/}
          <Grid container direction="column">
            <Grid item style={{ height: 50 }}>
              {openSearch && matchesXS ? (
                <ClickAwayListener onClickAway={() => setOpenSearch(false)}>
                  <TextField
                    className={classes.searchInput}
                    autoFocus
                    inputProps={{
                      style: {
                        padding: "8px 5px",
                      },
                    }}
                    style={{ marginTop: 10 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Type to search"
                  />
                </ClickAwayListener>
              ) : null}

              <Grid container alignItems="center" style={{ height: "100%" }}>
                {!(openSearch && matchesXS) ? (
                  <Grid
                    item
                    xs={4}
                    container
                    justify="flex-start"
                    alignItems="center"
                    className={classes.groupTitleContainer}
                  >
                    <Grid item>
                      <Typography variant="h3" className={classes.groupTitle}>
                        Locations
                      </Typography>
                    </Grid>
                  </Grid>
                ) : null}
                <Grid
                  item
                  container
                  xs={8}
                  justify="flex-end"
                  alignItems="center"
                >
                  <Grid item>
                    {!openSearch ? (
                      <IconButton
                        onClick={() => setOpenSearch(true)}
                        disableRipple
                      >
                        <SearchIcon color="secondary" />
                      </IconButton>
                    ) : !(openSearch && matchesXS) ? (
                      <ClickAwayListener
                        onClickAway={() => setOpenSearch(false)}
                      >
                        <TextField
                          className={classes.searchInput}
                          autoFocus
                          inputProps={{
                            style: {
                              padding: "8px 5px",
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <SearchIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Type to search"
                        />
                      </ClickAwayListener>
                    ) : null}
                  </Grid>

                  {!(matchesSM && openSearch) ? (
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ color: "#fff", boxShadow: "none" }}
                        onClick={() => setModalType("AddTodo")}
                      >
                        Add todo
                      </Button>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Grid item container justify={matchesXS ? "center" : null}>
              <Tabs onChange={handleTabChange} value={tab}>
                <Divider orientation="vertical" flexItem />
                <Tab
                  disableTouchRipple
                  value="todos"
                  label={
                    <Typography variant="body1" color="secondary">
                      Todos
                    </Typography>
                  }
                />
                <Divider orientation="vertical" flexItem />
                <Tab
                  disableTouchRipple
                  value="completed-todos"
                  label={
                    <Typography variant="body1" color="secondary">
                      Completed Todos
                    </Typography>
                  }
                />
                <Divider orientation="vertical" flexItem />
              </Tabs>
            </Grid>
          </Grid>
        </Paper>
        <Grid item className={classes.todos}>
          {/* --- Todos list --- */}
          <List style={{ marginLeft: "0.4rem" }}>
            {arrays.map((value, index) => {
              const labelId = `checkbox-list-label-${index}`;
              return (
                <div key={index}>
                  <Popper
                    placement="left"
                    style={{ zIndex: theme.zIndex.modal }}
                    open={openPopper === index}
                    anchorEl={anchorEl}
                    onMouseLeave={handleClosePopper}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: "right",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClosePopper}>
                            <MenuList id="menu-list-grow">
                              <MenuItem
                                onClick={editTodoHandler}
                                className={classes.menuItem}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={deleteTodoHandler}
                                className={classes.menuItem}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                  <ListItem
                    divider
                    className={classes.listItem}
                    onMouseLeave={handleClosePopper}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={handleToggle(value)}
                        color="secondary"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant="h6">{value[0]}</Typography>}
                      secondary={
                        <Typography variant="body1">{value[1]}</Typography>
                      }
                      className={classes.listText}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        disableRipple
                        onMouseOver={handlePopper(index)}
                        onClick={clickOpenPopper(index)}
                      >
                        <MoreHorizIcon
                          className={classes.icon}
                          style={{ fill: "#fff" }}
                        />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              );
            })}
          </List>
        </Grid>
      </Grid>
      <Modal type={modalType} />
    </>
  );
}

export default TodoGroupContainer;
