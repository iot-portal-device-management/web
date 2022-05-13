import axios from '../libs/axios';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';

type setErrorsType = Dispatch<SetStateAction<[]>>;
type setStatusType = Dispatch<SetStateAction<number | null>>;

interface createDeviceProps {
  name?: string;
  deviceCategory?: string;
}

export const useDevice = () => {
  const router = useRouter();

  // const csrf = () => axios.get('/sanctum/csrf-cookie');

  const createDevice = async ({ name, deviceCategory }: createDeviceProps) => {
    // await csrf();

    // setErrors([]);

    const payload = {
      name: name,
      deviceCategory: deviceCategory
    };

    axios
      .post('/api/devices', payload)
      .then(() => {
        // mutate()
      })
      .catch(error => {
        console.log(error)
        // if (error.response.status !== 422) throw error;
        //
        // setErrors(Object.values(error.response.data.errors).flat() as []);
      });
  };


  return {
    createDevice,
  };
};
