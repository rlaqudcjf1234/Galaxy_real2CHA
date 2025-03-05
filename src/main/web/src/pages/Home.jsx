import { useEffect, useRef, useState } from 'react';
import { authenticatedRequest as axios } from '../plugins/axios';

function Home() {
    const ref = useRef(null);
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchFormData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/embedded/iaudEmbedded", {
                params: {
                    "audServerUrl": "http://192.168.1.1:8087",
                    "rCode": "REP2EF26871094F4F13AE1E88D2860F7364"
                }
            });
            const doc = ref.current?.contentDocument;
            if (!doc) {
                return;
            }
            doc.open();
            doc.write(response.data);
            doc.close();
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchFormData();
    }, []);

    return (
        <div className="container">
            <div>
                <iframe style={{ width: "100%", height: "1280px" }} ref={ref} />
            </div>
        </div>
    );
}

export default Home;