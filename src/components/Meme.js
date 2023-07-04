import { Button, Paper } from "@mantine/core";
import backendApi from "../services/backendApi.service";
import { useState } from "react";

export default function Meme(){

    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");

    function getNewThought() {
        backendApi.get("/api/utils/meme")
            .then(response => {
                setImageUrl(response.data.url);
                setTitle(response.data.title);
            })
            .catch(e => setImageUrl(""));
    }

    return (
      <Paper maw={600} shadow="xs" p="md">
        <div>
            <img src={imageUrl} alt={title} style={{maxHeight:"500px"}} />
        </div>
        <Button onClick={getNewThought}>Get a random meme</Button>
      </Paper>
    );
}