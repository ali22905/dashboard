// hooks & other import staff
import { useState } from "react";
import { tokens } from "../../themes";
// full calendar
import FullCalendar from "@fullcalendar/react";
import { formatDate } from '@fullcalendar/core'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
// components
import Header from "../../components/Header";
import { Box, List, ListItem, ListItemText, Typography, useTheme, } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const dumy_events = [
  {
    id: 1,
    title: 'ali',
    start: "2023-05-28",
    end: "2023-05-29",
    allDay: true,
  },
  {
    id: 2,
    title: 'obad',
    start: "2023-06-08",
    end: "2023-05-19",
    allDay: true,
  },
  {
    id: 0,
    title: 'mama',
    start: "2023-06-05",
    end: "2023-06-13",
    allDay: true,
  },
]



const Calendar = () => {
  // styling
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  // states
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [selected, setSelected] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);


  const handleAlertClose = () => {
    setOpenAlert(false);
  };


  const handlePopClose = () => {
    setOpen(false);
    setTitle('');
  };

  const handleDateClick = (selected) => {
    setOpen(true)
    setSelected(selected)
  }


  const saveEvent = () => {
    console.log(selected)
    console.log(selected.dateStr)
    if (selected) {
      const event_title = title

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
    setSelected(null)
  }

  
  
  
  // to delete an event (task)

  const handleEventClick = (selected) => {
    setOpenAlert(true)
    setSelected(selected);
  }

  const confirmDelete = () => {
    if (selected) {
      selected.event.remove();
    }
    setOpenAlert(false);
    setSelected(null);
  }

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {/* format the date to a readable one */}
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            // the toolbar of the calendar
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            // the intial division of the calendar
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            // a maximum events per day
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            // to get the events that the full_counter_api is handling
            eventsSet={(events) => setCurrentEvents(events)}
          />
        </Box>
      </Box>
      <Dialog fullWidth="true" open={open} onClose={handlePopClose}>
        <div style={{backgroundColor: colors.greenAccent[100]}}>
          <DialogTitle sx={{color: colors.grey[900]}} >Title</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{color: colors.grey[900]}} >
              Please enter a title for this event
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="title"
              type="text"
              fullWidth
              variant="standard"
              sx={{
                color: colors.grey[900], 
                borderColor: '#000000',
              }}
              InputLabelProps = {{
                sx: {
                  color: colors.grey[900],
                }
              }}
              inputProps = {{
                sx: {
                  color: colors.blueAccent[700],
                }
              }}
              onChange={(e) => {setTitle(e.target.value)}}
              value={title}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopClose} sx={{color: colors.grey[900]}} >Cancel</Button>
            {/* <Button onClick={SaveEvent(selected)}>Save</Button> */}
            <Button onClick={saveEvent} sx={{color: colors.grey[900]}} >Save</Button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        fullWidth="true"
        open={openAlert}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{backgroundColor: colors.greenAccent[100]}}>
          <DialogTitle sx={{color: colors.grey[900]}} id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{color: colors.grey[900]}} id="alert-dialog-description">
              Are you sure you want to <span style={{color: 'red'}}>delete</span> this event
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{color: colors.grey[900]}} onClick={handleAlertClose}>Keep</Button>
            <Button sx={{color: 'red'}} onClick={confirmDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </Box>
  )
}

export default Calendar