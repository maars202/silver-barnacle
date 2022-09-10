// import React, { useState } from "react";
import React, {useRef, useEffect, useState} from 'react'
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = (count, file, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    file: file, 
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`
  }));

//   console.log("full: ", full)



const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
    console.log("new result: ", result)
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

function Toggle() {
    const inputRef = useRef(null);
  // const [state, setState] = useState([getItems(10), getItems(5, 10)]);
  const [state, setState] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>()
  let list = new DataTransfer();
  const [selectedImages, setSelectedImages] = useState<DataTransfer | null>(list)

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setState([...state, getItems(1, event.target.files[0])]);

    // let selectNew = selectedFile;
    // selectNew.push(event.target.files[0])
    // console.log(selectNew)
    // setSelectedFile(selectNew);

    
// let file = new File(["content"], "filename.jpg");
selectedImages?.items.add(event.target.files[0]);
setSelectedImages(selectedImages);
if (selectedImages != undefined){
  for (let i of selectedImages?.files){
    console.log("i: ", i.name)
    // getItems(1, i);
    setState([...state, getItems(1, i)]);
  }
}

console.log("existing selectedImages: ", selectedImages?.files)
// let myFileList = list.files
// getItems(1, )


  };

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
    //   console.log("newState: ", newState)
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
        // console.log("newState 2: ", newState)
      setState(newState.filter(group => group.length));
    }
    console.log("state: ", state)

  }

  return (
    <div>

      {/* {selectedImages?.files.map((file)=>{
        return <div>{file.name}</div>
      })} */}

<span className="block font-medium text-[#ABAEB0] text-sm mb-2">Upload Images under Different Tiers</span>
  <label className="block">
  
    <span className="sr-only">Choose profile photo</span>
    <input type="file" className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-pink-600
      hover:file:bg-violet-100
    "
    ref={inputRef}
    accept="image/*"
    onChange={onFileInputChange}
    />
  </label>


      {/* <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button> */}
      <button type="button" 
      onClick={() => {
        setState([...state, []]);
      }}
      class="text-gray-900 my-3 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">
      Add NFT tier</button>
      {/* <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1, null)]);
        }}
      >
        Add new item
      </button> */}
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div className='flex flex-col'
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                          >
                            <div className='grid justify-items-center'>{item.file.name}</div>
                            
                            <img src={URL.createObjectURL(item.file)}/>
                            <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(
                                  newState.filter(group => group.length)
                                );
                              }}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default Toggle;