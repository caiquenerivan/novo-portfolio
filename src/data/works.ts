interface MainLanguage {
    name: string;
    colorHexa: string;
    colorName: string;
}

interface Work {
    titlePt: string;
    titleEn: string;
    descriptionPt: string;
    descriptionEn: string;
    photo: string;
    linkGitHub: string;
    linkProject: string;
    colorName: string;
    skills: string[]; // Array de strings
    mainLanguage: MainLanguage;
}

const works: Work[] = ([
    {
        titlePt: "Meu Projeto Incrível",
        titleEn: "My Incredible Project",
        descriptionPt: "Este é um projeto interessante que fiz usando várias tecnologias.",
        descriptionEn: "This is an interesting project I worked on using various technologies.",
        photo: "link_para_foto.jpg",
        linkGitHub: "https://github.com/usuario/projeto",
        linkProject: "https://meuprojeto.com",
        skills: ["TypeScript", "React", "CSS"],
        colorName: "sky-500",
        mainLanguage: {
            name: "TypeScript",
            colorHexa: "#0ea5e9",
            colorName: "sky-500",
        }
    },
    {
        titlePt: "Meu Segundo Projeto Incrível",
        titleEn: "My Second Incredible Project",
        descriptionPt: "Este é um projeto interessante que fiz usando várias tecnologias.",
        descriptionEn: "This is an interesting project I worked on using various technologies.",
        photo: "link_para_foto.jpg",
        linkGitHub: "https://github.com/usuario/projeto",
        linkProject: "https://meuprojeto.com",
        skills: ["Java", "Spring", "CSS"],
        colorName: "red-600",
        mainLanguage: {
            name: "Java",
            colorHexa: "#dc2626",
            colorName: "red-600"
        }
    },
    {
        titlePt: "Meu Terceiro Projeto Incrível",
        titleEn: "My Third Incredible Project",
        descriptionPt: "Este é um projeto interessante que fiz usando várias tecnologias.",
        descriptionEn: "This is an interesting project I worked on using various technologies.",
        photo: "link_para_foto.jpg",
        linkGitHub: "https://github.com/usuario/projeto",
        linkProject: "https://meuprojeto.com",
        skills: ["React Native", "Spring", "CSS"],
        colorName: "teal-500",
        mainLanguage: {
            name: "React Native",
            colorHexa: "#14b8a6",
            colorName: "teal-500"
        }
    },
    {
        titlePt: "Meu Quarto Projeto Incrível",
        titleEn: "My Fourth Incredible Project",
        descriptionPt: "Este é um projeto interessante que fiz usando várias tecnologias.",
        descriptionEn: "This is an interesting project I worked on using various technologies.",
        photo: "link_para_foto.jpg",
        linkGitHub: "https://github.com/usuario/projeto",
        linkProject: "https://meuprojeto.com",
        skills: ["Javascript", "HTML", "CSS"],
        colorName: "pink-500",
        mainLanguage: {
            name: "Javascript",
            colorHexa: "#ec4899",
            colorName: "pink-500"
        }
    },
    {
        titlePt: "Meu Quinto Projeto Incrível",
        titleEn: "My Fifth Incredible Project",
        descriptionPt: "Este é um projeto interessante que fiz usando várias tecnologias.",
        descriptionEn: "This is an interesting project I worked on using various technologies.",
        photo: "link_para_foto.jpg",
        linkGitHub: "https://github.com/usuario/projeto",
        linkProject: "https://meuprojeto.com",
        skills: ["React", "Spring", "CSS"],
        colorName: "amber-500",
        mainLanguage: {
            name: "React",
            colorHexa: "#f59e0b",
            colorName: "amber-500"
        }
    },
    {
        titlePt: "Meu Sexto Projeto Incrível",
        titleEn: "My Sixth Incredible Project",
        descriptionPt: "Este é um projeto interessante que fiz usando várias tecnologias.",
        descriptionEn: "This is an interesting project I worked on using various technologies.",
        photo: "link_para_foto.jpg",
        linkGitHub: "https://github.com/usuario/projeto",
        linkProject: "https://meuprojeto.com",
        skills: ["Flutter", "Spring", "CSS"],
        colorName: "purple-500",
        mainLanguage: {
            name: "Flutter",
            colorHexa: "#a855f7",
            colorName: "purple-500"
        }
    },
    {
        titlePt: "Meu Sétimo Projeto Incrível",
        titleEn: "My Seventh Incredible Project",
        descriptionPt: "Este é um projeto interessante que fiz usando várias tecnologias.",
        descriptionEn: "This is an interesting project I worked on using various technologies.",
        photo: "link_para_foto.jpg",
        linkGitHub: "https://github.com/usuario/projeto",
        linkProject: "https://meuprojeto.com",
        skills: ["Node", "Spring", "CSS"],
        colorName: "neutral-500",
        mainLanguage: {
            name: "Node",
            colorHexa: "#a3a3a3",
            colorName: "neutral-500"
        }
    },
    {
        titlePt: "Meu Oitavo Projeto Incrível",
        titleEn: "My Eighth Incredible Project",
        descriptionPt: "Este é um projeto interessante que fiz usando várias tecnologias.",
        descriptionEn: "This is an interesting project I worked on using various technologies.",
        photo: "link_para_foto.jpg",
        linkGitHub: "https://github.com/usuario/projeto",
        linkProject: "https://meuprojeto.com",
        skills: ["Java", "Spring"],
        colorName: "red-600",
        mainLanguage: {
            name: "Java",
            colorHexa: "#Dc2626",
            colorName: "red-600"
        }
    },
    {
        titlePt: "Meu Nono Projeto Incrível",
        titleEn: "My Nineth Incredible Project",
        descriptionPt: "Este é um projeto interessante que fiz usando várias tecnologias.",
        descriptionEn: "This is an interesting project I worked on using various technologies.",
        photo: "link_para_foto.jpg",
        linkGitHub: "https://github.com/usuario/projeto",
        linkProject: "https://meuprojeto.com",
        skills: ["React Native", "React", "CSS"],
        colorName: "teal-500",
        mainLanguage: {
            name: "React Native",
            colorHexa: "#14b8a6",
            colorName: "teal-500"
        }
    },
    
    {
        titlePt: "Meu Decimo Projeto Incrível",
        titleEn: "My Tenth Incredible Project",
        descriptionPt: "Este é um projeto interessante que fiz usando várias tecnologias.",
        descriptionEn: "This is an interesting project I worked on using various technologies.",
        photo: "link_para_foto.jpg",
        linkGitHub: "https://github.com/usuario/projeto",
        linkProject: "",
        skills: ["React Native", "React", "CSS"],
        colorName: "teal-500",
        mainLanguage: {
            name: "React Native",
            colorHexa: "#14b8a6",
            colorName: "teal-500"
        }
    },
]);

export default works;