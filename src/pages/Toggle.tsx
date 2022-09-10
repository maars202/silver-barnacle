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
  // background: isDragging ? "lightgreen" : "grey",
  background: isDragging ? "lightgreen" : "",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "",
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
      <div style={{ display: "flex" }} className="">
        <DragDropContext onDragEnd={onDragEnd} class="bg-orange-300" style={{backgroundColor: "purple"}}>
          {state.map((el, ind) => (<div>
            <div className='grid justify-items-center p-4'>
              {/* <div class="font-bold text-sky-500">Tier {ind}</div> */}
              <h1 class="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-sky-400 to-purple-600 hover:underline hover:scale-125">
              Level {ind + 1}</h1>
              </div>
            <Droppable key={ind} droppableId={`${ind}`} class="bg-green-300" >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  // style={getListStyle({background: "orange", padding: 1, width:1})}
                  {...provided.droppableProps}
                  // style="w-20"
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                      class="bg-yellow-200"
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          // style={getItemStyle(
                          //   snapshot.isDragging,
                          //   provided.draggableProps.style
                          // )}
                          className=''
                        >
                          <div className='flex flex-col rounded-lg'
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                            
                          >
                            {/* <div className='grid justify-items-center text-orange-600'>{item.file.name}</div> */}
                            
                            {/* <img src={URL.createObjectURL(item.file)} className="rounded-lg hover:scale-105"></img> */}


                            <div class="my-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src={URL.createObjectURL(item.file)} alt=""/>
    </a>
    <div class="p-5 grid justify-items-center">
        {/* <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a> */}
        <button type="button"
                                      onClick={() => {
                                        const newState = [...state];
                                        newState[ind].splice(index, 1);
                                        setState(
                                          newState.filter(group => group.length)
                                        );
                                      }}
                                      class="inline-flex items-center mt-2 pl-2 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  
                                  </button>
    </div>
</div>


                            {/* <button
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
                            </button> */}


                            {/* <div class="grid justify-items-end">
                                <button type="button"
                                      onClick={() => {
                                        const newState = [...state];
                                        newState[ind].splice(index, 1);
                                        setState(
                                          newState.filter(group => group.length)
                                        );
                                      }}
                                      class="inline-flex items-center mt-2 pl-2 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  
                                  </button>
                              </div> */}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default Toggle;