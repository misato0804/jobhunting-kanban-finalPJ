import React, {useEffect, useState} from 'react';
import FullCalendar, {EventClickArg} from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {DateClickArg} from "@fullcalendar/interaction";
import eventList from "../../data/events"
import EventDetail from "../../components/features/user/EventDetail";
import {Schedule} from "../../types/Schedule";
import {useSeekerContext} from "../../components/context/seekerContext";
import {useScheduleContext} from "../../components/context/scheduleContext";
import axios from "axios";
import {useCookies} from "react-cookie";

const Calendar = () => {

    const [selectedEvent, setSelectedEvent] = useState<EventClickArg >();
    const {seeker} = useSeekerContext();
    const {events, setEvents,getSchedule} = useScheduleContext();
    const handleClick = (arg: EventClickArg) => {
        setSelectedEvent(arg)
    }
    const [cookies] = useCookies();

    useEffect(() => {

       async function getEvent () {
            try {
                let res = await axios({
                    method: "get",
                    url: `http://localhost:8080/schedules/allSchedules/${seeker!.seeker_id}`,
                    withCredentials: true,
                    headers: {
                        authorization: `Bearer ${cookies.JWT_TOKEN}`
                    }
                })
                setEvents(res.data.schedules)
                console.log(events)
            } catch (e: any) {
                console.log(e)
            }
        }
        getEvent()
    }, [])

    console.log(events)

    return (
        <div className="relative z-5 h-[40rem]">
            <FullCalendar
                locale={"en"}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                slotDuration="00:15:00"
                weekends={true}
                selectable={true}
                allDayContent={true}
                buttonIcons={false}
                titleFormat={{
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }}
                headerToolbar={{
                    left: "prev,next,today",
                    center: "title",
                    right: 'dayGridMonth,timeGridWeek'
                }}
                businessHours={{
                    daysOfWeek: [1, 2, 3, 4, 5],
                    startTime: "0:00",
                    endTime: "24:00",
                }}
                eventTimeFormat={{hour: "numeric", minute: "2-digit"}}
                handleWindowResize={true}
                eventClick={handleClick}
                events={events}
                editable={true}
            />
            <div className="flex justify-center">
                {selectedEvent ? <EventDetail selectedEvent={selectedEvent}/>
                    :
                    <div className="w-[80%] px-6 py-3 border mt-2 shadow-xl font-thin bg-white rounded-xl">
                        <h3 className="py-10">Click event you want to see the detail</h3>
                    </div>}
            </div>
        </div>
    );
};

export default Calendar;