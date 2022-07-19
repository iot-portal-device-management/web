import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Paper, Popper, Typography } from '@mui/material';
import { JSONTree } from 'react-json-tree';
import isString from 'lodash/isString';
import { isValidJsonString } from '../../utils/utils';

interface JsonDataGridCellExpandProps {
  header: string;
  width: number;
  value: string;
}

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

const JsonDataGridCellExpand = (props: JsonDataGridCellExpandProps) => {
  const { header = 'Data', width, value } = props;
  const wrapper = useRef<HTMLDivElement | null>(null);
  const cellDiv = useRef(null);
  const cellValue = useRef(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showFullCell, setShowFullCell] = useState(false);
  const [showPopper, setShowPopper] = useState(false);

  const handleMouseEnter = () => {
    setShowPopper(true);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    const handleKeyDown = (nativeEvent: KeyboardEvent) => {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showFullCell, setShowFullCell]);

  const renderJSONView = () => {
    if (isValidJsonString(value)) {
      return (
        <>
          <Typography variant="body2" style={{ padding: 8 }}>
            {header}
          </Typography>
          <Box sx={{ pb: 1 }}>
            <JSONTree data={JSON.parse(value)} theme={theme} invertTheme={false}/>
          </Box>
        </>
      );
    } else if (isString(value)) {
      return (
        <Typography variant="body2" style={{ padding: 8 }}>
          {value}
        </Typography>
      );
    }
  };

  const JSONView = useMemo(renderJSONView, [value]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: '100%',
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
          >
            {JSONView}
          </Paper>
        </Popper>
      )}
    </Box>
  );
};

export default memo(JsonDataGridCellExpand);
