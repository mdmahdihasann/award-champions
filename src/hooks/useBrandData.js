"use client"

import { useEffect, useState } from "react";
import { useAuth } from "./useAuth"
import axios from "axios";

const useBrandData = () => {
    const { selectedTeam, auth } = useAuth();
    const [brandData, setBrandData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sourceData = selectedTeam ? selectedTeam : auth;
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/reports/territory-performance`,
                    {
                        params: {
                            work_area_t: sourceData?.data?.work_area_t,
                            designation_id: sourceData?.data?.designation_id,
                            gm_code: sourceData?.data?.gm_code,
                            team: sourceData?.data?.group_name,
                        }
                    })
                if (res.status === 200) {
                    setBrandData(res.data)
                }
            } catch (err) {                
                setError("Failed to load data");
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [sourceData])
    return {brandData, loading, error}
}

export default useBrandData;