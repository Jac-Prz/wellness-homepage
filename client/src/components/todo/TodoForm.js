import {  useState } from "react";
import { useTodoContext } from "../../hooks/useTodoContext";

const TodoForm = (props) => {
    const {dispatch} = useTodoContext()
    const [newItem, setNewItem] = useState("");
    const [error, setError] = useState(null);

    const submitItem = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/todo', {
            method: 'POST',
            body: JSON.stringify({item: newItem, list: props.type}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
         if(!response.ok){
            setError(json.error)
         }
         if(response.ok){
            setError(null);
            console.log("new item added ", json)
            setNewItem("");
            dispatch({type: 'CREATE_ITEM', payload: json})
         }
        
    }

    return (
        <form onSubmit={submitItem}>
            <input type="text" onChange={e => setNewItem(e.target.value)} value={newItem} autoComplete="off"></input>
            <button type="submit">+</button>
            {error && <div className="error">error</div>}
        </form>
    )
}
export default TodoForm;