import React, { useEffect, useState } from 'react'

export default function Todo() {

    const [todos, setTodos] = useState([])
    const [input, setInput] = useState("")

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savetodo = localStorage.getItem('todos')
        if(savetodo){
            setTodos(JSON.parse(savetodo))
        }

        setIsInitialized(true)
    }, [])

    useEffect(() => {
        if(isInitialized) {
            localStorage.setItem("todos", JSON.stringify(todos))
        }
    }, [todos, isInitialized])


    const handleAddTodo = () => {
        if (!input.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: input,
            completed: false,
        }

        setTodos([...todos, newTodo]);
        setInput("");
    }

    const handleDelete = (id) => {
        setTodos(
            todos.filter((todo) => todo.id !== id)
        )
    }

    const handleCheck = (id) => {
        setTodos(
            todos.map((todo) => todo.id === id ? {
                ...todo,
                completed: !todo.completed,
            } :
                todo
            )
        )
    }

    const startEdit = (todo) => {
        setEditingId(todo.id)
        setEditText(todo.text)
    }

    const editTodo = (id) => {
        setTodos(
            todos.map((todo) => todo.id === id ? {
                ...todo,
                text: editText
            } :
                todo
            )
        );
        setEditingId(null)
        setEditText("");
    }


    return (
        <div>
            <h1>Todo App</h1>

            <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />

            <button onClick={handleAddTodo}>Add Todo</button>


            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>

                        <input type="checkbox" checked={todo.completed} onChange={() => handleCheck(todo.id)} />


                        {editingId === todo.id ? (
                            <>

                            <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}/>

                            <button onClick={() => editTodo(todo.id)}>Save</button>
                            </>
                        ) :
                            (
                                <>

                                    <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
                                        {todo.text}
                                    </span>

                                    <button onClick={() => startEdit(todo)}>Edit</button>

                                </>
                            )
                        }



                        <button onClick={() => handleDelete(todo.id)}>Delete</button>

                    </li>

                ))}
            </ul>


        </div>
    )
}
