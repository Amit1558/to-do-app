import {useRef, useState } from 'react';
import './App.css';

let index = 0;

function App() {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(true);
  const [save, setSave] = useState(false);
  const inputRef = useRef();
  const addToDo = (e) => {
    e.preventDefault();
    setList([...list, task]);
    inputRef.current[0].value = '';
  }

  const onEdit = (ele) => {
    setTask(list[ele]);
    index = ele;
    setEdit(false);
    setSave(true);
  }

  const onClickEdit = (e) => {
    e.preventDefault();
    setEdit(true);
    setSave(false);
    const temp = [...list];
    temp[index] = inputRef.current[0].value
    console.log(temp);
    setList(temp);
  }

  const onDelete = (ele) => {
    const temp = [...list];
    const result = temp.filter((item) => {
      if (item !== list[ele]) {
        return item;
      }
    })
    setList(result);
  }

  const renderList = () => {
    return (
      <div className='a-list'>
          {
            list.map((ele, index) => {
              return (
                <div className='a-todo-list'>
                  <div className='a-title' key={index}>{ele}</div>
                  <div className='a-button-container'>
                    <button className='a-edit' onClick={(e) => { onEdit(index) }}>✏️</button>
                    <button className='a-edit'onClick={(e) => { onDelete(index) }}>🗑️</button>
                  </div>
                </div>
              )
            })}
      </div>
    )
  }

  return (
    <div className="App">
      <div className='a-conatiner'>
        <div className='a-title'>
          <span>What's the plan for today?</span>
        </div>
        <div>
          <form ref={inputRef} className='a-input'>
            <input name='user' className='a-input-conatiner' placeholder='Add a todo' value={task} onChange={(e) => { setTask(e.target.value) }} ></input>
            <button disabled={save} className="a-save" type='submit' onClick={(e) => addToDo(e)}>
            Save
            </button>
            <button disabled={edit} className="a-edit" onClick={(e) => onClickEdit(e)}>
            Edit
            </button>
          </form>
        </div>
        {renderList()}
      </div>
    </div>
  );
}

export default App;
