import { Box } from 'native-base';
import React from 'react';

const Decor = () => {
    return (
        <Box
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                style={{
                    position: 'absolute',
                    width: 200,
                    height: 200,
                    borderWidth: 48,
                    borderColor: 'rgba(255, 255, 255, .4)',
                    borderRadius: 100,
                    zIndex: -1
                }}
            ></Box>
            <Box
                style={{
                    position: 'absolute',
                    width: 400,
                    height: 400,
                    borderWidth: 48,
                    borderColor: 'rgba(255, 255, 255, .3)',
                    borderRadius: 200,
                    zIndex: -1
                }}
            ></Box>
            <Box
                style={{
                    position: 'absolute',
                    width: 600,
                    height: 600,
                    borderWidth: 48,
                    borderColor: 'rgba(255, 255, 255, .2)',
                    borderRadius: 300,
                    zIndex: -1
                }}
            ></Box>
            <Box
                style={{
                    position: 'absolute',
                    width: 800,
                    height: 800,
                    borderWidth: 48,
                    borderColor: 'rgba(255, 255, 255, .1)',
                    borderRadius: 400,
                    zIndex: -1
                }}
            ></Box>
            <Box
                style={{
                    position: 'absolute',
                    width: 1000,
                    height: 1000,
                    borderWidth: 48,
                    borderColor: 'rgba(255, 255, 255, .1)',
                    borderRadius: 500,
                    zIndex: -1
                }}
            ></Box>
        </Box>
    );
};

export default Decor;