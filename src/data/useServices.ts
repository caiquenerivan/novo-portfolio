import { useEffect, useState } from "react";
import api from "../services/api";

interface services {
    service_id: number;
    title_pt: string;
    title_en: string;
    desc_pt: string;
    desc_en: string;
    image: string;
}
const useServices = () => {
    const [services, setServices]  = useState<services[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchSkills = async () =>{
            try {
                const response = await api.get('/work-types')
                setServices(response.data)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido')
            } finally {
                setLoading(false)
            }
        }

        fetchSkills();
    }, []);

    return{services, loading, error}

};

export default useServices;