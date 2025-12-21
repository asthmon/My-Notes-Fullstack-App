import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note";
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, SetContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api.get("/api/notes/").then((res) => res.data).then((data) => setNotes(data))
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Note deleted!");
            else alert("Delete fail!");
            getNotes();
        }).catch((err) => alert(err));
    };

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", { content, title }).then((res) => {
            if (res.status === 201) alert("Note Created!");
            else alert("Fail to make note!");
            getNotes();
        }).catch((err) => alert(err));
    }

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id} />)}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input type="text"
                    id="title"
                    name="title" required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} />
                <label htmlFor="content">Text:</label>
                <br />
                <textarea name="content" id="content"
                    equired value={content}
                    onChange={(e) => SetContent(e.target.value)}>
                </textarea>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Home;