import { Typography, Flex } from "antd";

const { Text } = Typography;

const mockText = [
  {
    title: "Блондинки (УГТ 10-7)",
    description: (
      <>
        <p>5+2 (70/30, 50/50) - теплый натуральный коричневый.</p>
        <p>
          5+3 (80/20) - теплый(нейтральный)коричневый 2+5 (70/30) - холодный
          натуральный коричневый.
        </p>
        <p>5+4,1 (90/10) - очень теплый натуральный коричневый.</p>
      </>
    ),
  },
  {
    title: "Русые(УГТ 7-5)",
    description: (
      <>
        <p>5+2 (50/50) - теплый натуральный коричневый.</p>
        <p>2+4 (50/50) - нейтральный холодно коричневый.</p>
        <p>
          2+6 (80/20) - теплый насыщенный коричневый( для нейтрализации зеленого
          оттенка добавить 4,1).
        </p>
      </>
    ),
  },
  {
    title: "Рыжие",
    description: (
      <>
        <p>4.1 - в чистом виде краску наносим в 2-3 слоя.</p>
        <p>5+4,1 (50/50) - светло рыжий.</p>
        <p>6+4,1 (60/40) - насыщеный рыжий.</p>
      </>
    ),
  },
  {
    title: "Шатенки( УГТ 4,5-3)",
    description: (
      <>
        <p>
          6+3 (70/30) - нейтральный насыщенный коричневый ( для нейтрализации
          зеленого оттенка добавить 4,1).
        </p>
        <p>6+2 (70/30) - нейтральный коричневый.</p>
        <p>4+3 (70/30) - нейтральный натуральный коричневый.</p>
      </>
    ),
  },
  {
    title: "Брюнетки (УГТ 3-1)",
    description: (
      <>
        <p>6+3(30/70) - насыщенный коричневый.</p>
        <p>2+3 (30/70) - очень насыщеный холодно коричневый.</p>
        <p>1+7 (30/70) - супер насыщенный коричневыйй.</p>
      </>
    ),
  },
];

export const InfoText = () => {
  return (
    <Flex vertical gap={20}>
      {mockText.map((txt, index) => (
        <Flex key={index} vertical>
          <Text strong>{txt.title}</Text>
          <Text style={{ marginTop: 10 }}>{txt.description}</Text>
        </Flex>
      ))}
    </Flex>
  );
};
