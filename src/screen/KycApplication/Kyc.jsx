import React, { useEffect } from 'react'

export default function Kyc() {


    const [kycApplications, setKycApplications] = useState([]);



    const fetchKycApplications = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/kyc", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                setKycApplications(data.kyc);
            } else {
                console.error("Error fetching kyc applications:", data.message);
            }
        } catch (error) {
            console.error("Error fetching kyc applications:", error);
        }
    }


    useEffect(() => {
        fetchKycApplications();
    },[]);



  return (
    <div>
      
    </div>
  )
}
