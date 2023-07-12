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
	Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import TimerBar from './Pomodoro/TimerBar';
import { TimerStatus } from '../services/timer.service';
import { IconLogout } from '@tabler/icons-react';
import { Spotify as SpotifyPlayer } from 'react-spotify-embed';

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
		label: 'Fun for breaks',
		link: '/fun',
	},
	{
		label: 'Whiteboard',
		link: '/whiteboard',
	},
	{
		label: 'Settings',
		link: '/settings',
	},
];

export function HeaderResponsive({
	timerService,
	timerTotal,
	loadNewSpotifyPlaylist,
	spotifyUrl,
}) {
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
				setActive(link.link);
				navigate(link.link);
				close();
			}}
		>
			{link.label}
		</a>
	));

	return (
		<>
			<Header height={HEADER_HEIGHT} mb={0} className={classes.root}>
				<Flex
					ml={15}
					className={classes.header}
					align="center"
					justify="space-between"
				>
					<Group spacing={5} className={classes.links}>
						<Image width={32} height={32} src="./favicon-32x32.png" />
						<Text mr={20}>Focus Dashboard</Text>
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
					<Group spacing={5}></Group>
					<div id="music-player" className="hoverme">
						<Image width={32} height={32} src="./spotify.png" />
						<div class="pop">
							<SpotifyPlayer link={spotifyUrl} />
						</div>
					</div>
					<Group spacing={5}>
						<span>
							{timerService.timerStatus === TimerStatus.InProgress &&
								`${timerService.getTime()}  ${timerService.getFriendlyType()}` +
									' | '}
						</span>
						<span>
							{user ? (
								<div>
									Welcome, <i>{user.name}</i>
								</div>
							) : (
								<Text mr={20}>
									<Link to={'/login'}>Login</Link> or{' '}
									<Link to={'/create-account'}>create</Link> an account
								</Text>
							)}
						</span>
						{user && (
							<a
								href="/logout"
								className={cx(classes.link)}
								title="Logout"
								onClick={(event) => {
									event.preventDefault();
									close();
									logOutUser();
								}}
							>
								<IconLogout />
							</a>
						)}
					</Group>
				</Flex>
				<TimerBar timerService={timerService} TimerStatus={TimerStatus} />
			</Header>

			<Container p="lg" m={0} fluid></Container>
		</>
	);
}
