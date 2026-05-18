import { Box, Typography, Container } from "@mui/material";
import img1 from "../../../assets/firstblock.png";
import img2 from "../../../assets/secondclock.png";
import img3 from "../../../assets/thirdblock.png";
const sections = [
  { title: "Собирай образы из вещей", text: "DressUp позволяет создавать комбинации из  ваших предметов на белом фоне или на вашей фотографии, вы выбираете предмет одежды  и переносите его к комбинации, так же можно выбрать категорию, например на прогулку или в офис", image: img1, reverse: false },
  { title: "Храни свой гардероб", text: "Вы можете сохранять каждый элемент вашего гардероба, удаляя у него фон для улучшенного создания комбинаций, а так же описывать его с помощью категорий, состава, погоды и других маркеров", image: img2, reverse: true },
  { title: "Получай советы под свой стиль", text: "В разделе советы можно найти разные статьи на тему подбора одежды, сочитания цветов и фактур, лучших материалов и всего что поможет вам улучшить качество учета гардероба", image: img3, reverse: false },
];

const styles = {
  sectionWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: 4,
    p: { xs: 4, md: 6 },
    mt: { xs: 4, md: 6 },
    mb: { xs: 6, md: 12 },
    boxShadow: 3,
    maxWidth: "1200px",
    mx: "auto",
    width: "90%",
  },
  sectionContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    justifyContent: "space-between",
    mb: { xs: 6, md: 10 },
    gap: { xs: 3, md: 6 },
  },
  imageBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
    textAlign: "center",
  },
  sectionImage: {
    width: { xs: "120px", sm: "150px", md: "180px" },
    height: { xs: "120px", sm: "150px", md: "180px" },
    objectFit: "contain",
    mb: 2,
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
    color: "#5C4E40",
    mb: 1,
  },
  sectionText: {
    color: "#487886",
    fontSize: { xs: "0.9rem", sm: "1rem" },
    maxWidth: { xs: "100%", md: "500px" },
    textAlign: { xs: "center", md: "left" },
  },
};

const FeaturesSection = () => {
  return (
    <Box sx={styles.sectionWrapper}>
      <Container maxWidth="lg">
        {sections.map((section, index) => (
          <Box
            key={index}
            sx={{
              ...styles.sectionContainer,
              flexDirection: { xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" },
            }}
          >
            {/* Картинка + заголовок */}
            <Box sx={styles.imageBox}>
              <Box component="img" src={section.image} alt={section.title} sx={styles.sectionImage} />
              <Typography sx={styles.sectionTitle}>{section.title}</Typography>
            </Box>

            {/* Текст рядом */}
            <Typography sx={styles.sectionText}>{section.text}</Typography>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default FeaturesSection;
