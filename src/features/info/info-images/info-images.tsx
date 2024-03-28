import { useEffect, useState } from "react";
import { Typography, Flex, Input } from "antd";
import styles from "./info-images.module.scss";
import y1 from "../../../assets/1.png";
import y2 from "../../../assets/2.png";
import y3 from "../../../assets/3.png";
import y4 from "../../../assets/4.png";
import y5 from "../../../assets/5.png";
import y6 from "../../../assets/6.png";

const { Text } = Typography;

const mockImgs = [
  { title: "Эффект лисий", src: y1 },
  { title: "Беличий еффект", src: y2 },
  { title: "Эффект открытого глаза", src: y3 },
  { title: "(Эффект открытого глаза)", src: y4 },
  { title: "Эффект натуральный", src: y5 },
  { title: "(Эффект натуральный)", src: y6 },
];

export const InfoImages = () => {
  const [search, setSearch] = useState("");
  const [imagesList, setImagesList] = useState(mockImgs);

  useEffect(() => {
    setImagesList(() =>
      mockImgs.filter(({ title }) => title.includes(search.trim())),
    );
  }, [search]);

  return (
    <Flex vertical gap={20}>
      <Input.Search
        placeholder="Поиск по названию картинки"
        allowClear
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {imagesList.map((img) => (
        <Flex vertical key={img.title}>
          <Text strong>{img.title}</Text>
          <img src={img.src} className={styles.img} />
        </Flex>
      ))}
    </Flex>
  );
};
