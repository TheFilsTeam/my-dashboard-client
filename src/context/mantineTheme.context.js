import { MantineProvider } from '@mantine/core';

import React from 'react';
import { useMantineTheme } from '@mantine/core';

const greenTheme = {
	colorScheme: 'light',
	colors: {
		primary: '#4caf50',
		blue: [
			'#f1f8e9',
			'#c5e1a5',
			'#aed581',
			'#9ccc65',
			'#8bc34a',
			'#7cb342',
			'#40c057',
			'#558b2f',
			'#33691e',
		],
	},
	shadows: {
		xs: '0 0 0 1px rgba(76, 175, 80, .2)',
		sm: '0 1px 2px 0 rgba(76, 175, 80, .14), 0 1px 3px 0 rgba(76, 175, 80, .12)',
		md: '0 4px 5px -2px rgba(76, 175, 80, .2), 0 7px 10px 1px rgba(76, 175, 80, .14), 0 2px 16px 1px rgba(76, 175, 80, .12)',
		lg: '0 6px 10px -3px rgba(76, 175, 80, .2), 0 10px 14px 1px rgba(76,175,80,.14),0 4px18px3pxrgba(76,175,80,.12)',
		xl: '0 -4px -5px -3px rgba(76,175,80,.2),0 -7px -8px -4px rgba(76,175,80,.14),0 -10px -10px -5px rgba(76,175,80,.12)',
		inner:
			'inset -4px -4px -5px -3px rgba(76,175,80,.2),inset -7px -7px -8px -4px rgba(76,175,80,.14),inset -10px -10px -10px -5px rgba(76,175,80,.12)',
	},
	headings: {
		fontFamily: 'Roboto Slab',
		sizes: {
			h1: { fontSize: '3rem' },
			h2: { fontSize: '2.25rem' },
			h3: { fontSize: '1.75rem' },
			h4: { fontSize: '1.5rem' },
			h5: { fontSize: '1.25rem' },
			h6: { fontSize: '1rem' },
		},
	},
};

const redTheme = {
	colorScheme: 'light',
	colors: {
		primary: '#f44336', // Red primary color
		blue: [
			'#FFEBEE',
			'#FFCDD2',
			'#EF9A9A',
			'#E57373',
			'#EF5350',
			'#F44336',
			'#fa5252',
			'#D32F2F',
			'#C62828',
		],
	},

	shadows: {
		xs: '0 0 0 1px rgba(244, 67, 54, .2)', // Adjusted shadow color
		sm: '0 1px 2px 0 rgba(244, 67, 54, .14), 0 1px 3px 0 rgba(244, 67, 54, .12)', // Adjusted shadow color
		md: '0 4px 5px -2px rgba(244, 67, 54, .2), 0 7px 10px 1px rgba(244, 67, 54, .14), 0 2px 16px 1px rgba(244, 67, 54, .12)', // Adjusted shadow color
		lg: '0 6px 10px -3px rgba(244, 67, 54, .2), 0 10px 14px 1px rgba(244, 67, 54, .14), 0 4px 18px 3px rgba(244, 67, 54, .12)', // Adjusted shadow color
		xl: '0 -4px -5px -3px rgba(244, 67, 54, .2), 0 -7px -8px -4px rgba(244, 67, 54, .14), 0 -10px -10px -5px rgba(244, 67, 54, .12)', // Adjusted shadow color
		inner:
			'inset -4px -4px -5px -3px rgba(244, 67, 54, .2), inset -7px -7px -8px -4px rgba(244, 67, 54, .14), inset -10px -10px -10px -5px rgba(244, 67, 54, .12)', // Adjusted shadow color
	},
	headings: {
		fontFamily: 'Roboto Slab',
		sizes: {
			h1: { fontSize: '3rem' },
			h2: { fontSize: '2.25rem' },
			h3: { fontSize: '1.75rem' },
			h4: { fontSize: '1.5rem' },
			h5: { fontSize: '1.25rem' },
			h6: { fontSize: '1rem' },
		},
	},
};

export default function ThemeProvider(props) {
	return (
		<>
			<MantineProvider theme={redTheme}>{props.children}</MantineProvider>
		</>
	);
}

export { ThemeProvider, greenTheme };
