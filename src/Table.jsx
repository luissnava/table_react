
/**
 * Componente Tabla
 * @param {array} items Es un arragle bidimensional, el primer elemento del segundo arreglo es el encabezado
 * @param {function} selectItem Función que recibe para cargar los datos del elemento indicado
 * @returns 
 */
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import data from "../database/productos.json"


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  // padding: 1,
  border: isDragging ? '1px solid #FA5555' : 'none',
  ...draggableStyle,
});


function Table(props) {

  const [items, setItems] = useState(data.tabla)
  if (data.tabla) {
    const tabla = Object.values(items);
    // tabla.map((objeto)=>{
    //   console.log(objeto,objeto.id);

    //   objeto.columns.map((columna)=>{
    //     console.log(columna);
    //   })
    // })

    const onDragEnd = (result) => {
      if (!result.destination) {
        return;
      }
  
      const itemsReorder = reorder(tabla,result.source.index,result.destination.index);
      
      setItems(itemsReorder);
    };
    return (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
  
          <Droppable droppableId="droppable" direction="horizontal">
              {
                  (droppableProvided,snapshot) =>(
                      <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className="flex w-full">
                          {tabla.map((objeto, index) => (
                          <Draggable key={objeto.id} draggableId={String(objeto.id)} index={index}>
                          {
                            (draggableProvided,snapshot) => (
                                <div key={objeto.id} {...draggableProvided.draggableProps} ref={draggableProvided.innerRef}  className="flex flex-col items-center justify-start w-36" style={getItemStyle(
                                  snapshot.isDragging,
                                  draggableProvided.draggableProps.style
                                )}>
                                    {
                                      objeto.columns.map((columna,index2) => (
                                        columna === "name" || columna === "stock" || columna === "descripcion" || columna == "producto" || columna === "caracteristicas" ? <div key={index2} {...draggableProvided.dragHandleProps} className="w-full text-center bg-white border-r border-gray-200 py-3" >{columna}</div>:
                                        <div key={index2} className="w-full text-center py-4" style={index2%2 === 0 ? {background: "#F6F8F9"}: {background: "#F0F0F0"}}>{columna}</div>
                                      ))
                                      
                                    }
                                </div>
                            )
                          }
                          </Draggable>
                          ))}
                          {droppableProvided.placeholder}
                      </div>
                      
                  )
              }
          </Droppable>
  
        </DragDropContext>

      </>
    )
    
  }
  else{
    <h1>No cargo la Api</h1>
  }
}


export default Table;