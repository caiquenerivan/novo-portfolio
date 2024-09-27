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
]);

export default works;