
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPostData } from '../redux/userSlice';
import { USER_API_END_POINT } from '../assets/EndPoint';

const useProductData = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                
                const res = await axios.get(`${USER_API_END_POINT}/getProducts`,{withCredentials:true});
                 console.log(res.data);
                 console.log("useProductData", res.data);
                if(res.data.success){
                    dispatch(setPostData(res.data.post))
                }
            
            } catch (error) {
                dispatch(setPostData([]));
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useProductData 