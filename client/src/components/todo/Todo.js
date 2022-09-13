import { useEffect } from "react";
import { useTodoContext } from "../../hooks/useTodoContext";
import ListItem from "./ListItem";
import TodoForm from './TodoForm';


const Todo = (props) => {
    const { items, dispatch } = useTodoContext();

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/todo');
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_ITEMS', payload: json })
            }
        }

        fetchItems();
    }, [])

    return (
        <div id={props.type + "-list-section"} className="section">
            <div className="todo invert-color">
                <h3>{props.type[0].toUpperCase() + props.type.substring(1)} List</h3>
                <TodoForm type={props.type} />
                <ul>
                    {
                        items && items.filter(i => i.list === props.type).map((item, index) => {
                            return <ListItem key={index} item={item} />;
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
export default Todo;