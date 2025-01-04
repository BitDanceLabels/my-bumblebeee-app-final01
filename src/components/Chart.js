import React, { useEffect, useState } from "react";
import Column from "./Column";
import { Droppable, Draggable } from "react-drag-and-drop";

function Chart({ allInfo }) {
  const [chartData, setChartData] = useState({
    id: 1,
    name: "Toan",
    totalPoint: 10,
    w: 500,
    h: 500,
    data: []
  });
  const [update, setUpdate] = useState(0);

  // useEffect(() => {
  //   var xPosition = 0
  //   setChartData(prev => (
  //     {
  //       ...prev,
  //       data: allInfo?.map(item => {
  //         xPosition = xPosition + 80
  //         return (
  //           {
  //             ...item,
  //             x: xPosition,
  //             y: 0,
  //             w: 60,
  //             h: 50,
  //             isSelected: false,
  //             z: 2,
  //           }
  //         )
  //       })
  //     }
  //   ))
  // }, [allInfo])
  const updateColumn = (id, values, syncValues) => {
    setChartData(
      (prev) => (
        {
          ...prev,
          data: prev.data.map(item => {
            if (item.id === id) return { ...item, ...values };
            if (syncValues) return { ...item, ...syncValues };
            return item;
          })
        }
      )
    );
    setUpdate((prev) => prev + 1);
  };


  const renderedElements = chartData.data.map(item => (
    <>
      <Column key={item.name} coor={item} chartData={chartData} updateCoors={updateColumn} />
    </>
  ));

  const onDrop = (value) => {
    console.log(value)
    const dropId = parseInt(value.components); // id của elemnt được drop vào
    var xPosition = 0
    if (!chartData.data.find(col => col.id === dropId)) { // element chưa xuất hiện trong chart
      setChartData(prev => (
        {
          ...prev,
          data: [
            ...prev.data,
            {
              ...allInfo.find(item => item.id === dropId),
              x: xPosition,
              y: 0,
              w: 60,
              h: 50,
              isSelected: false,
              z: 2,
            }
          ]
        }
      ))
    }
  }


  return (
    <Droppable
      types={['components']} // <= allowed drop types
      onDrop={onDrop}

    >
      <div className="bg-repeat whitespace" id="boxDrop">
        <div className="coordinate">
          {/* O number */}
          <span className="position-absolute start-0 top-100 translate-middle">
            O
          </span>
          {/* X line */}
          {/* <div className="coordinate-x">
              <div className="arrow position-absolute top-50">
                <i className="fa-solid fa-arrow-right position-absolute top-50 start-100 translate-middle"></i>
              </div>
              <span className="position-absolute start-100 top-100 translate-middle">
                {}
              </span>
            </div> */}
          {/* Y line */}
          <div className="coordinate-y coordinate-vertical">
            <div className="arrow top-1/2">
              <i className="fa-solid fa-arrow-right absolute top-1/2 left-full"></i>
            </div>
            <span className="absolute start-full top-0">
              {chartData.totalPoint}
            </span>
          </div>
        </div>
        <div
          className=""
          style={{
            width: `${chartData.w}px`,
            height: `${chartData.h}px`,
            backgroundColor: "#F9F7F5",
          }}
        >
          {renderedElements}
        </div>
      </div>
      {/* <div className='w-full bg-transparent' style={{ height: 'calc(100vh - 99.6px)' }}></div> */}
    </Droppable>

  );




  //   const [draggedColumn, setDraggedColumn] = useState(null);

  //   const handleDragStart = (e, index) => {
  //     // setDraggedColumn(index);

  //   };
  //   return (
  //     <svg width={chartSize.w} height={chartSize.h} transform="scale(1, -1)" className="relative">
  //       <rect x="0" y="0" width="100%" height="100%" fill="#eee" />
  //       <text className="absolute chart__text">{chartData.totalPoint}</text>
  //       <line x1="0" y1="0" x2="0" y2={chartSize.h} stroke="#000"></line>
  //       <line x1="0" y1="0" x2={chartSize.w} y2="0" stroke="#000" />
  //       {chartData.item.map((column, index) => (
  //         <>
  //             <rect
  //             key={column.name}
  //             x={(column.x / 100) * chartSize.w}
  //             y={0}
  //             width="50"
  //             height={(column.item / chartData.totalPoint) * chartSize.h}
  //             fill="steelblue"
  //             onMouseDown={(e) => handleDragStart(e, index)}
  //             onMouseMove={(e) => handleDrag(index, e.movementX, e.movementY)}
  //             />
  //             <text 
  //                 x={column.x / 100 * chartSize.w}
  //                 y="20"
  //             >{column.name}</text>
  //         </>
  //       ))}
  //     </svg>
  //   );
}

export default Chart;
