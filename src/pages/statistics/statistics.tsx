import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const labels = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const StatisticsPage = () => {
  return (
    <div>
      <Bar
        height="400px"
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Статистика дохода",
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              label: "Общая прибыль",
              data: labels.map(() => Math.random() * 1000),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Чистая прибыль",
              data: labels.map(() => Math.random() * 1000),
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        }}
      />

      <Bar
        height="400px"
        style={{ marginTop: 20 }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Статистика посещений",
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              label: "Посетили",
              data: labels.map(() => Math.round(Math.random() * 1000)),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Отменили",
              data: labels.map(() => Math.round(Math.random() * 1000)),
              backgroundColor: "rgb(255, 99, 132)",
            },
            {
              label: "Перенесли",
              data: labels.map(() => Math.round(Math.random() * 1000)),
              backgroundColor: "rgb(75, 192, 192)",
            },
          ],
        }}
      />
    </div>
  );
};
