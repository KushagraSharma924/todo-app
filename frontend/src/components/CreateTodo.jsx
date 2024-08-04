import { useState } from "react";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTodo = () => {
        if (!title || !description) {
            alert("Title and description cannot be empty");
            return;
        }

        fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(async (res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            const json = await res.json();
            alert("Todo added");
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
            alert("Failed to add todo");
        });
    };

    return (
        <div>
            <input
                id="title"
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
            /> 
            <br />

            <input
                id="desc"
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />

            <button
                style={{ padding: 10, margin: 10 }}
                onClick={handleAddTodo}
            >
                Add a todo
            </button>
        </div>
    );
}
