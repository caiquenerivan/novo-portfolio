import { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";

export interface skillsType {
    skill_id: number;
    name: string;
    color_hexa: string;
}

const useSkills = () => {
    const [skills, setSkill] = useState<skillsType[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await api.get('/skills', {
                    withCredentials: true // Se estiver usando cookies
                });
                setSkill(response.data);
                setError(null);
            } catch (err) {
                let errorMessage = 'Erro ao carregar habilidades'

                if (axios.isAxiosError(err)) {
                    errorMessage = err.response?.data?.message || err.message
                } else if (err instanceof Error) {
                    errorMessage = err.message
                }

                setError(errorMessage)
            } finally {
                setLoading(false)
            }
        }

        fetchSkills();
    }, []);

    return { skills, loading, error }

};

export default useSkills;