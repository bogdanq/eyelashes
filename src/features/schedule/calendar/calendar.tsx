import React, { useMemo } from "react";
import {
  Calendar as DefaultCalendar,
  momentLocalizer,
  ToolbarProps,
  Views,
} from "react-big-calendar";
import moment from "moment";
import { Button, Flex } from "antd";

import * as dates from "../../../constants/dates";
import styles from "./calendar.module.scss";

import "react-big-calendar/lib/css/react-big-calendar.css";

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

const events = [
  {
    id: 2,
    title: "Иванов Иван Иванович",
    desc: "Big conference for important people",
    start: new Date(2024, 2, 21, 10, 30),
    end: new Date(2024, 2, 21, 11, 30),
  },
  {
    id: 14,
    title: "Иванов Иван Иванович",
    desc: "Big conference for important people",
    start: new Date(2024, 2, 21, 12, 30),
    end: new Date(2024, 2, 21, 13, 30),
  },
];

const CustomToolbar = (
  toolbar: ToolbarProps & {
    setOpenEventModal: React.Dispatch<React.SetStateAction<boolean>>;
  },
) => {
  console.log("toolbar", toolbar, toolbar.view);
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
          onClick={() => toolbar.setOpenEventModal(true)}
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

function eventWrapper(props) {
  // Some data that you might have inserted into the event object
  const event = props.event;

  const wrapper = React.cloneElement(
    props.children,
    {},
    <Flex vertical>
      <span style={{ textDecoration: "line-through" }}>{event.title}</span>
    </Flex>,
  );
  return <div>{wrapper}</div>;
}

export function Calendar({
  setOpenEventModal,
}: {
  setOpenEventModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { components, defaultDate, max } = useMemo(
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
      defaultDate: new Date(2024, 2, 21),
      max: dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours"),
    }),
    [setOpenEventModal],
  );

  return (
    <DefaultCalendar
      style={{ height: "70vh" }}
      components={components}
      // max={max}
      defaultDate={defaultDate}
      defaultView={Views.WEEK}
      events={events}
      localizer={localizer}
      // showMultiDayTimes
      onSelectEvent={(event) => console.log(event)}
    />
  );
}
