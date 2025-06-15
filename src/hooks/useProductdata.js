
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPostData, setPostData_forFilter } from '../redux/userSlice';
import { USER_API_END_POINT } from '../assets/EndPoint';
import toast from 'react-hot-toast';

const useProductData = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                
                const res = await axios.get(`${USER_API_END_POINT}/getProducts`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setPostData(res.data.post))
                    dispatch(setPostData_forFilter(res.data.post))
                }
            
            } catch (error) {
                dispatch(setPostData([]));
                dispatch(setPostData_forFilter([]));
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useProductData 