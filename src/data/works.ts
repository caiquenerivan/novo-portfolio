import skills, { skillsType } from "./skills";

interface Work {
    titlePt: string;
    titleEn: string;
    descriptionPt: string;
    descriptionEn: string;
    photo: string;
    linkGitHub: string;
    linkProject: string;
    skills: skillsType[];
    mainLanguage: skillsType;
}

const works: Work[] = ([
    {
        titlePt: "Blog Backend: Performance e Escalabilidade com Java e Spring",
        titleEn: "Blog Backend: Performance and Scalability with Java and Spring",
        descriptionPt: "Este projeto consiste no backend de um blog desenvolvido utilizando Java e o framework Spring, proporcionando uma estrutura robusta e escalável. Utilizei Spring Boot para a criação rápida de APIs RESTful e Spring Data para a eficiente manipulação de dados. ",
        descriptionEn: "This project consists of the backend of a blog developed using Java and the Spring framework, providing a robust and scalable structure. I used Spring Boot for the fast creation of RESTful APIs and Spring Data for efficient data handling.",
        photo: "https://i.imgur.com/opiuHHW.png",
        linkGitHub: "https://github.com/caiquenerivan/blog-do-nerivan-java",
        linkProject: "",
        skills: [skills.find((item) => item.name === "java") || { name: '', colorHexa: '' }, skills.find((item) => item.name === "git") || { name: '', colorHexa: '' }, skills.find((item) => item.name === "github") || { name: '', colorHexa: '' }],
        mainLanguage: skills.find((item) => item.name === "java") || { name: '', colorHexa: '' }
    },
    {
        titlePt: "Landing Page - Personal Trainr",
        titleEn: "Landing Page - Personal Trainr",
        descriptionPt: `Landing page do Personal Trainr que conecta personal trainers e alunos, promovendo treinos personalizados com praticidade e eficiência.`,
        descriptionEn: `Personal Trainr landing page connecting trainers and clients, offering personalized workout plans with ease and efficiency.`,
        photo: "https://i.imgur.com/opiuHHW.png",
        linkGitHub: "",
        linkProject: "",
        skills: [skills.find((item) => item.name === "reactjs") || { name: '', colorHexa: '' }, skills.find((item) => item.name === "typescript") || { name: '', colorHexa: '' }, skills.find((item) => item.name === "git") || { name: '', colorHexa: '' }, skills.find((item) => item.name === "github") || { name: '', colorHexa: '' }],
        mainLanguage: skills.find((item) => item.name === "reactjs") || { name: '', colorHexa: '' }
    },
    {
        titlePt: "Personal Trainr",
        titleEn: "Personal Trainr",
        descriptionPt: `O projeto Personal Trainr conecta personal trainers e alunos em uma plataforma interativa, facilitando a criação e acompanhamento de treinos personalizados, tornando o fitness mais acessível e eficiente.`,
        descriptionEn: `The Personal Trainr project connects trainers and clients through an interactive platform, enabling personalized workout plans and progress tracking, making fitness more accessible and efficient.`,
        photo: "https://i.imgur.com/opiuHHW.png",
        linkGitHub: "https://github.com/caiquenerivan/personal-trainr-react",
        linkProject: "",
        skills: [skills.find((item) => item.name === "java") || { name: '', colorHexa: '' }, skills.find((item) => item.name === "typescript") || { name: '', colorHexa: '' }, skills.find((item) => item.name === "AWS") || { name: '', colorHexa: '' }, skills.find((item) => item.name === "react native") || { name: '', colorHexa: '' }],
        mainLanguage: skills.find((item) => item.name === "typescript") || { name: '', colorHexa: '' }
    },
]);

export default works;