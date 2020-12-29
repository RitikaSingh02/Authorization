import	React from 'react'
import Axios from 'axios';

function DashBoard() 
    {
        React.useEffect(() => {
            Axios({
                method: 'GET',
                url: "http://127.0.0.1:8000/dashboard/notice/",
                headers:{
                    'request_type':"view_previous",
                    'notice_for':"S",
                }
            }).then(
                response => {
                    if (response.status === 200) {
                        console.log(response.data);
                        // setUserData(response.data);
                        // history.push('/erp/dashboard');
                        <p>DASHBOARD</p>
                    }
                },
                response => {
                    if (response.status === 400) {
                        // dispatch({ type: 'error' });
                        console.log("error")
                    } else {
                        console.log('falied login');
                    }
                }
            );
        }, []);

        return (
            <div>
                <p>this is the dashboard</p>
             </div>)
    }
export default DashBoard