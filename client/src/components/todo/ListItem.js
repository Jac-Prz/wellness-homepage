import { useCalendarContext } from "../../hooks/useCalendarContext";
import { useTodoContext } from "../../hooks/useTodoContext";
import today from "../../modules/today";

const ListItem = ({ item }) => {

    const { dispatch: altDispatch } = useTodoContext();
    const { day, dispatch } = useCalendarContext();

    const deleteItem = async () => {
        const tasks = [...[item.item], ...day.completedTasks];
        console.log(tasks);
        const updateCalendar = async () => {
            const response = await fetch('/api/calendar/' + today(), {
                method: "PATCH",
                body: JSON.stringify({ completedTasks: tasks }),
                headers: { 'Content-Type': 'application/json' }
            })
            const json = await response.json();
            if (response.ok) {
                console.log(json);
            }
        }
        updateCalendar();
        dispatch({ type: 'SET_TODO_ITEM', payload: tasks })
        const response = await fetch('/api/todo/' + item._id, { method: 'DELETE' });
        const json = await response.json();
        if (response.ok) {
            console.log(json)
            altDispatch({ type: 'DELETE_ITEM', payload: json })
        }
    };

    return (
        <li onClick={deleteItem}>{item.item}</li>
    )
}
export default ListItem;