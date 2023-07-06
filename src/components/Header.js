import { useContext, useState } from 'react';
import {
	createStyles,
	Header,
	Container,
	Group,
	Burger,
	Paper,
	Transition,
	rem,
	Flex,
	Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import TimerBar from './Pomodoro/TimerBar';
import { TimerStatus } from '../services/timer.service';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
	root: {
		position: 'relative',
		zIndex: 1,
	},

	dropdown: {
		position: 'absolute',
		top: HEADER_HEIGHT,
		left: 0,
		right: 0,
		zIndex: 0,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopWidth: 0,
		overflow: 'hidden',

		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	header: {
		display: 'flex',
		justifyContent: 'flexStart',
		alignItems: 'center',
		height: '100%',
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	burger: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: `${rem(8)} ${rem(12)}`,
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},

		[theme.fn.smallerThan('sm')]: {
			borderRadius: 0,
			padding: theme.spacing.md,
		},
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
				.color,
		},
	},
}));

const links = [
	{
		label: 'Home',
		link: '/',
	},
	{
		label: 'Settings',
		link: '/settings',
	},
	{
		label: 'Fun for breaks',
		link: '/fun',
	},
	{
		label: 'Whiteboard',
		link: '/whiteboard',
	},
	{ label: 'Logout', link: '/logout' },
];

export function HeaderResponsive({ timerService, timerTotal }) {
	const [opened, { toggle, close }] = useDisclosure(false);

	const [active, setActive] = useState(window.location.pathname);
	const { classes, cx } = useStyles();
	const { user, logOutUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const items = links.map((link) => (
		<a
			key={link.label}
			href={link.link}
			className={cx(classes.link, {
				[classes.linkActive]: active === link.link,
			})}
			onClick={(event) => {
				event.preventDefault();
				if (link.label === 'Logout') {
					close();
					logOutUser();
				} else {
					setActive(link.link);
					navigate(link.link);
					close();
				}
			}}
		>
			{link.label}
		</a>
	));

	return (
		<>
			<Header height={HEADER_HEIGHT} mb={60} className={classes.root}>
				<Flex
					ml={15}
					className={classes.header}
					align="center"
					justify="space-between"
				>
					<Group spacing={5} className={classes.links}>
						<Image mr={20} width={32} height={32} src="./favicon-32x32.png" />
						{items}
					</Group>
					<Burger
						opened={opened}
						onClick={toggle}
						className={classes.burger}
						size="sm"
					/>

					<Transition
						transition="pop-top-right"
						duration={200}
						mounted={opened}
					>
						{(styles) => (
							<Paper className={classes.dropdown} style={styles}>
								{items}
							</Paper>
						)}
					</Transition>
					{timerService.remainingSeconds > 0 && (
						<Flex mr={20}>{timerService.getTime()}</Flex>
					)}
				</Flex>
				{/* <Container className={classes.header}>
					<Group spacing={5} className={classes.links}>
						{items}
					</Group>

					<Burger
						opened={opened}
						onClick={toggle}
						className={classes.burger}
						size="sm"
					/>

					<Transition
						transition="pop-top-right"
						duration={200}
						mounted={opened}
					>
						{(styles) => (
							<Paper className={classes.dropdown} withBorder style={styles}>
								{items}
							</Paper>
						)}
					</Transition>
				</Container> */}
				<TimerBar timerService={timerService} TimerStatus={TimerStatus} />
			</Header>

			<Container fluid>
				<Outlet />
			</Container>
		</>
	);
}
