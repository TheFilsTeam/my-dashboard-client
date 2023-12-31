import React from 'react';

import {
	AppShell,
	Header,
	/* Footer, */
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
	Collapse,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Outlet } from 'react-router-dom';

import { NavbarContent } from './NavbarContent';
import PomodoroSummary from './Pomodoro/PomodoroSummary';

export default function Shell(props) {
	const theme = useMantineTheme();

	//controls the navbar open/close

	const [openedNav, { toggle }] = useDisclosure(false, {
		onOpen: () => console.log('Opened'),
		onClose: () => console.log('Closed'),
	}); //manages open/close state

	return (
		<AppShell
			styles={{
				main: {
					background:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			/* navbar={<NavbarContent />} Added bellow */
			/* aside={
				<MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
					<Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
						<Text>Application sidebar</Text>
					</Aside>
				</MediaQuery>
			} */
			/* 	footer={
				<Footer height={40} p="md">
					<Container fluid>
						<p>
							Made with love by the Fils Team (Filipe Ferreira & Philippe
							Miossec)
						</p>
					</Container>
				</Footer>
			} */
			header={
				<Header height={{ base: 50, md: 70 }} p="md">
					<div
						style={{ display: 'flex', alignItems: 'center', height: '100%' }}
					>
						<Burger
							opened={openedNav}
							onClick={toggle}
							size="sm"
							color={theme.colors.gray[6]}
							mr="xl"
						/>

						<Text>Your beloved dashboard</Text>
						<PomodoroSummary timerService={props.timerService} />
					</div>
				</Header>
			}
		>
			<Collapse
				in={openedNav}
				transitionDuration={100}
				transitionTimingFunction="linear"
			>
				<NavbarContent />
			</Collapse>

			<Outlet />
		</AppShell>
	);
}
