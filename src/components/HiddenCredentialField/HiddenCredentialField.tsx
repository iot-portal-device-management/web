import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';

interface HiddenCredentialFieldProps {
  label: string;
  credential?: string;
}

const HiddenCredentialField = ({ label, credential, ...rest }: HiddenCredentialFieldProps) => {
  const [copied, setCopied] = useState(false);
  const [showCredential, setShowCredential] = useState(false);

  const handleClickShowCredential = () => {
    setShowCredential(!showCredential);
  };

  const handleClickCopy = () => {
    if (credential) {
      copy(credential);
      setCopied(true);
    }
  };

  return (
    <TextField
      fullWidth
      margin="normal"
      disabled
      label={label}
      type={showCredential ? 'text' : 'password'}
      defaultValue={credential}
      InputProps={{
        endAdornment: (
          <>
            <Tooltip
              arrow
              title={showCredential ? 'Click to hide' : 'Click to reveal'}
              TransitionProps={{ onExited: () => setCopied(false) }}
            >
              <InputAdornment position="end">
                <IconButton
                  aria-label={`toggle ${label} visibility`}
                  edge="end"
                  onClick={handleClickShowCredential}
                >
                  {showCredential ? <VisibilityOffTwoToneIcon/> : <VisibilityTwoToneIcon/>}
                </IconButton>
              </InputAdornment>
            </Tooltip>
            <Tooltip
              arrow
              title={copied ? 'Copied' : 'Click to copy'}
              TransitionProps={{ onExited: () => setCopied(false) }}
            >
              <InputAdornment position="end">
                <IconButton
                  aria-label="click to copy"
                  edge="end"
                  onClick={handleClickCopy}
                >
                  <ContentCopyTwoToneIcon/>
                </IconButton>
              </InputAdornment>
            </Tooltip>
          </>
        )
      }}
      {...rest}
    />
  );
};

export default HiddenCredentialField;
