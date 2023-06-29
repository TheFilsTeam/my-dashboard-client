import { useContext, useState } from 'react';
import {
	createStyles,
	Navbar,
	Group,
	Code,
	getStylesRef,
	rem,
} from '@mantine/core';
import {
	IconBellRinging,
	IconFingerprint,
	IconKey,
	IconSettings,
	Icon2fa,
	IconDatabaseImport,
	IconReceipt2,
	IconSwitchHorizontal,
	IconLogout,
	IconHome,
} from '@tabler/icons-react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router';
/* import { MantineLogo } from '@mantine/ds'; */

const useStyles = createStyles((theme) => ({
	header: {
		paddingBottom: theme.spacing.md,
		marginBottom: `calc(${theme.spacing.md} * 1.5)`,
		borderBottom: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
		}`,
	},

	footer: {
		paddingTop: theme.spacing.md,
		marginTop: theme.spacing.md,
		borderTop: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
		}`,
	},

	link: {
		...theme.fn.focusStyles(),
		display: 'flex',
		alignItems: 'center',
		textDecoration: 'none',
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[1]
				: theme.colors.gray[7],
		padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
		borderRadius: theme.radius.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,

			[`& .${getStylesRef('icon')}`]: {
				color: theme.colorScheme === 'dark' ? theme.white : theme.black,
			},
		},
	},

	linkIcon: {
		ref: getStylesRef('icon'),
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[2]
				: theme.colors.gray[6],
		marginRight: theme.spacing.sm,
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
				.color,
			[`& .${getStylesRef('icon')}`]: {
				color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
					.color,
			},
		},
	},
}));

const data = [
	{ link: '/', label: 'Home', icon: IconHome },
	// { link: '', label: 'Billing', icon: IconReceipt2 },
	// { link: '', label: 'Security', icon: IconFingerprint },
	// { link: '', label: 'SSH Keys', icon: IconKey },
	// { link: '', label: 'Databases', icon: IconDatabaseImport },
	// { link: '', label: 'Authentication', icon: Icon2fa },
	{ link: '/settings', label: 'Settings', icon: IconSettings },
];

export function NavbarContent() {
	const { logOutUser } = useContext(AuthContext);
	const { classes, cx } = useStyles();
	const [active, setActive] = useState('Billing');
	const navigate = useNavigate();

	const links = data.map((item) => (
		<a
			className={cx(classes.link, {
				[classes.linkActive]: item.label === active,
			})}
			href={item.link}
			key={item.label}
			onClick={(event) => {
				event.preventDefault();
				setActive(item.label);
				navigate(item.link);
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</a>
	));

	return (
		<Navbar width={{ sm: 200, lg: 300 }} p="md">
			<Navbar.Section grow>
				<Group className={classes.header} position="apart">
					{/* <MantineLogo size={28} /> */}
					<Code sx={{ fontWeight: 700 }}>Hello USERTODO</Code>
				</Group>
				{links}
			</Navbar.Section>

			<Navbar.Section
				style={{ marginBottom: '1rem' }}
				className={classes.footer}
			>
				{/* <a
					href="#"
					className={classes.link}
					onClick={(event) => event.preventDefault()}
				>
					<IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
					<span>Change account</span>
				</a> */}

				<a
					href="#"
					className={classes.link}
					onClick={(event) => { event.preventDefault();
						logOutUser();}}
				>
					<IconLogout className={classes.linkIcon} stroke={1.5} />
					<span>Logout</span>
				</a>
			</Navbar.Section>
		</Navbar>
	);
}
