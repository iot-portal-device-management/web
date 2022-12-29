/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import FullWidthTextField from '../FullWidthTextField';
import FullWidthAutoComplete from '../FullWidthAutoComplete';
import { useState } from 'react';
import { useDeviceGroupOptions } from '../../hooks/deviceGroup/useDeviceGroupOptions';
import { useSavedDeviceCommandOptions } from '../../hooks/savedDeviceCommand/useSavedDeviceCommandOptions';

const CreateDeviceJobDetailsForm = () => {
  const [deviceGroupInputValue, setDeviceGroupInputValue] = useState('');
  const [savedDeviceCommandInputValue, setSavedDeviceCommandInputValue] = useState('');

  const {
    deviceGroupOptions,
    deviceGroupOptionsError,
    isDeviceGroupOptionsLoading,
  } = useDeviceGroupOptions(deviceGroupInputValue);

  const {
    savedDeviceCommandOptions,
    savedDeviceCommandOptionsError,
    isSavedDeviceCommandOptionsLoading,
  } = useSavedDeviceCommandOptions(savedDeviceCommandInputValue);

  return (
    <>
      <FullWidthTextField
        required
        id="name"
        name="name"
        label="Device job name"
        placeholder="Enter device job name"
      />
      <FullWidthAutoComplete
        required
        autoHighlight
        id="deviceGroupId"
        name="deviceGroupId"
        label="Device group"
        placeholder="Select a device group"
        options={deviceGroupOptions ?? []}
        isLoading={isDeviceGroupOptionsLoading}
        inputValue={deviceGroupInputValue}
        onInputChange={(event, value) => setDeviceGroupInputValue(value)}
        filterOptions={(x) => x}
      />
      <FullWidthAutoComplete
        required
        autoHighlight
        id="savedDeviceCommandId"
        name="savedDeviceCommandId"
        label="Saved device command"
        placeholder="Select a saved device command"
        options={savedDeviceCommandOptions ?? []}
        isLoading={isSavedDeviceCommandOptionsLoading}
        inputValue={savedDeviceCommandInputValue}
        onInputChange={(event, value) => setSavedDeviceCommandInputValue(value)}
        filterOptions={(x) => x}
      />
    </>
  );
};

export default CreateDeviceJobDetailsForm;
