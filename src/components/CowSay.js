// var cowsay = require("cowsay");
// import cowsay from 'cowsay-browser';
// import cowsay from 'cowsay-browser';

import { Button, Paper } from '@mantine/core';
import { useEffect, useState } from 'react';
import backendApi from '../services/backendApi.service';

export default function CowSay() {
	const [thought, setThought] = useState('Wait! The cow will say something...');
	// useEffect(getNewThought, []);

	function getNewThought() {
		backendApi
			.get('/api/utils/cowsay')
			.then((response) => {
				const cowSayContent = response.data.text;
				setThought(cowSayContent);
				console.log(cowSayContent);
				return cowSayContent;
			})
			.catch((e) => setThought(e.Message));
	}

    function getNewThought(url) {
        backendApi.get(url)
            .then(response => {
                const cowSayContent = response.data.text;
                setThought(cowSayContent);
                console.log(cowSayContent);
                return cowSayContent;
            })
            .catch(e => setThought(e.Message));
    }

    return (
      <Paper maw={600} shadow="md" p="md">
        <pre style={{ textAlign: 'left'}}>{thought}</pre>
        <Button onClick={() => getNewThought("/api/utils/cowsay")} m={10}>New prediction</Button>
        <Button onClick={() => getNewThought("/api/utils/cowgroup")}>Wedding time!</Button>
      </Paper>
    );
}
