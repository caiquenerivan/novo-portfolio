import { useEffect, useState } from "react";
import api from "../services/api";
import { skillsType } from "./useSkills";

interface works {
    title_pt: string;
    title_en: string;
    description_pt: string;
    description_en: string;
    photo: string;
    link_github: string;
    link_project: string;
    skills: skillsType[];
    main_language_id: number;
}

const useWorks = () => {
    const [works, setWorks]  = useState<works[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchSkills = async () =>{
            try {
                const response = await api.get('/works')
                setWorks(response.data)
                console.log(response.data);
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido')
            } finally {
                setLoading(false)
            }
        }

        fetchSkills();
    }, []);

    return{works, loading, error}

};

export default useWorks;