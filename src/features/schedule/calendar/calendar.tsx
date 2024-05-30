import React, { useMemo } from "react";
import {
  Calendar as DefaultCalendar,
  momentLocalizer,
  ToolbarProps,
  Views,
} from "react-big-calendar";
import moment from "moment";
import { Button, Flex } from "antd";

// import * as dates from "../../../constants/dates";
import styles from "./calendar.module.scss";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event } from "../types";

moment.locale("ru", {
  months:
    "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split(
      "_",
    ),
  monthsShort:
    "янв._февр._март_апр._май_июнь_июль._авг_сент._окт._нояб._дек.".split("_"),
  // monthsParseExact: true,
  // weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
  weekdaysShort: "вс._пн._вт._ср._чт._пт._сб.".split("_"),
  weekdaysMin: "вс._пн._вт._ср._чт._пт._сб.".split("_"),
  weekdays:
    "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
  // weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
});
const localizer = momentLocalizer(moment);

const CustomToolbar = (
  toolbar: ToolbarProps & {
    setOpenEventModal: React.Dispatch<React.SetStateAction<Event["id"] | null>>;
  },
) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToCurrent = () => {
    toolbar.onNavigate("TODAY");
  };

  const label = () => {
    return (
      <div>
        {toolbar.view !== "month" && (
          <span> {moment(toolbar.date).format("YYYY")} </span>
        )}
        <span>{toolbar.label}</span>
      </div>
    );
  };

  return (
    <Flex vertical gap={10} className={styles.toolbar}>
      <label>{label()}</label>

      <Flex gap={5}>
        <Button onClick={goToBack}>&#8249;</Button>
        <Button type="default" onClick={goToCurrent}>
          Сегодня
        </Button>
        <Button type="default" onClick={goToNext}>
          &#8250;
        </Button>

        <Button
          type="primary"
          ghost
          onClick={() => toolbar.setOpenEventModal("-")}
        >
          Записать
        </Button>
      </Flex>

      <Flex gap={5}>
        <Button
          type="default"
          onClick={() => toolbar.onView("day")}
          disabled={toolbar.view === "day"}
        >
          День
        </Button>
        <Button
          type="default"
          onClick={() => toolbar.onView("week")}
          disabled={toolbar.view === "week"}
        >
          Неделя
        </Button>
        <Button
          type="default"
          onClick={() => toolbar.onView("month")}
          disabled={toolbar.view === "month"}
        >
          Месяц
        </Button>
      </Flex>
    </Flex>
  );
};

function eventWrapper({ event, children }) {
  const wrapper = React.cloneElement(
    children,
    {},
    <Flex vertical>
      <span style={{ textDecoration: "line-through" }}>
        {event.client.label}
      </span>
    </Flex>,
  );
  return <div>{wrapper}</div>;
}

export function Calendar({
  setOpenEventModal,
  events,
}: {
  setOpenEventModal: React.Dispatch<React.SetStateAction<Event["id"] | null>>;
  events: Event[];
}) {
  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        eventWrapper: eventWrapper,
        // event: ({ event }) => {
        //   return (
        //     <div
        //       style={{ width: "100%" }}
        //       onClick={() => setOpenEventModal(true)}
        //     >
        //       <h1>{event.title}</h1>
        //     </div>
        //   );
        // },
        toolbar: (props) => (
          <CustomToolbar {...props} setOpenEventModal={setOpenEventModal} />
        ),
      },
      defaultDate: new Date(),
    }),
    [setOpenEventModal],
  );

  return (
    <DefaultCalendar
      style={{ height: "70vh" }}
      components={components}
      defaultDate={defaultDate}
      defaultView={Views.MONTH}
      events={events}
      localizer={localizer}
      // showMultiDayTimes
      onSelectEvent={(event) => setOpenEventModal(event.id)}
    />
  );
}
