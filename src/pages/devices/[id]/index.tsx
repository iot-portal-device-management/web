import { ReactElement } from 'react';
import { getSidebarLayout } from '../../../layouts';


const CreateDevicePag11 = () => {

  return (
    <>
        eeeeeee
    </>
  );
};

CreateDevicePag11.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Create device', page);
};

export default CreateDevicePag11;
