import skills, { skillsType } from "./skills";

interface Work {
    titlePt: string;
    titleEn: string;
    descriptionPt: string;
    descriptionEn: string;
    photo: string;
    linkGitHub: string;
    linkProject: string;
    color: string;
    skills: skillsType[];
    mainLanguage: skillsType;
}

const works: Work[] = ([
    {
        titlePt: "Blog Backend: Performance e Escalabilidade com Java e Spring",
        titleEn: "Blog Backend: Performance and Scalability with Java and Spring",
        descriptionPt: "Este projeto consiste no backend de um blog desenvolvido utilizando Java e o framework Spring, proporcionando uma estrutura robusta e escalável. Utilizei Spring Boot para a criação rápida de APIs RESTful e Spring Data para a eficiente manipulação de dados. O Git foi empregado para versionamento do código, garantindo controle e organização em todas as etapas do desenvolvimento. O foco principal foi construir uma base de dados segura e otimizada, assegurando que o front-end do blog funcione de maneira fluida, com alta performance e respostas rápidas.",
        descriptionEn: "This project consists of the backend of a blog developed using Java and the Spring framework, providing a robust and scalable structure. I used Spring Boot for the fast creation of RESTful APIs and Spring Data for efficient data handling. Git was employed for version control, ensuring organization and control throughout the development stages. The main focus was to build a secure and optimized database, ensuring that the blog's front-end runs smoothly, with high performance and quick responses.",
        photo: "link_para_foto.jpg",
        linkGitHub: "https://github.com/caiquenerivan/blog-do-nerivan-java",
        linkProject: "",
        skills: [skills.find((item) => item.name === "java") || { name: '', colorHexa: '' }, skills.find((item) => item.name === "git") || { name: '', colorHexa: '' }, skills.find((item) => item.name === "github") || { name: '', colorHexa: '' }],
        color: "sky-500",
        mainLanguage: skills.find((item) => item.name === "typescript") || { name: '', colorHexa: '' }
    },
]);

export default works;