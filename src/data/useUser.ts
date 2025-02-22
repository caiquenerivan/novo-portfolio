import { useEffect, useState } from "react";
import api from "../services/api";

export interface user {
    user_id?: number;
    username: string;
    password: string;
    role?: string;
    foto?: string;
    about_pt?: string;
    about_en?: string;
    work_title_pt?: string;
    work_title_en?: string;
    email: string;
}

const useUser = () => {
    const [user, setUser]  = useState<user>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchSkills = async () =>{
            try {
                const response = await api.get('/users/username/caiquenerivan')
                setUser(response.data)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido')
            } finally {
                setLoading(false)
            }
        }

        fetchSkills();
    }, []);

    return{user, loading, error}

};

export default useUser;