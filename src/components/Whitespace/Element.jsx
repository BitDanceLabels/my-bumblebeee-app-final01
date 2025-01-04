import Xarrow, { useXarrow } from "react-xarrows";
import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ContextMenu from "../Input/ContextMenu";

// import { useSelector } from "react-redux";
export const BoxContext = React.createContext(null);
export const useBoxContext = () => {
  return useContext(BoxContext);
};
function Box(props, ref) {
  // const dispatch = useDispatch()
  // STATES AND STYLES AND VARIABLES
  const style = {
    zIndex: props.coor.z,
    width: `${props.coor.w}px`,
    height: `${props.coor.h}px`,
  };

  // const ref = useRef(null);
  const leftResize = useRef(null);
  const rightResize = useRef(null);
  const topResize = useRef(null);
  const bottomResize = useRef(null);
  const topleftResize = useRef(null);
  const toprightResize = useRef(null);
  const bottomleftResize = useRef(null);
  const bottomrightResize = useRef(null);

  const handleBoxChange = (newValue, isValid) => {
    const status = {
      value: newValue,
      isValid: isValid,
    };
    props.updateCoors(props.coor.type, props.coor.id, status);
  };
  useEffect(() => {
    props.setBoxSelected((pre) => {
      if (pre?.type === props.coor.type && pre.id === props.coor.id) {
        return props.coor;
      }
      return pre;
    });
  }, [props.coor]);

  // FUNCTIONS
  const wsSize = () => {
    const workspace = document.querySelector(".whitespace");
    let rect;
    if (workspace) {
      rect = workspace.getBoundingClientRect();
      return { w: rect.width, h: rect.height };
    }
    return { w: 0, h: 0 };
  };
  // Turn the saved postion into absolute position
  const coorAbsolute = () => {
    if (wsSize().w && wsSize().h) {
      const xAbsolute = props.coor.x;
      // const yAbsolute = wsSize().h - props.coor.h - props.coor.y;
      const yAbsolute =
        wsSize().h / props.wsScale - props.coor.h - props.coor.y;
      return { x: xAbsolute, y: yAbsolute };
    }
    return { x: 0, y: 0 };
  };
  // Turn the new absolute pos into saved relative pos
  const coorRelative = (x, y, h) => {
    // //console.log(x, y, h);
    // x, y is the absolute x,y passed in
    if (wsSize().w && wsSize().h) {
      const xRelative = x;
      // const yRelative = wsSize().h - h - y;
      const yRelative = wsSize().h / props.wsScale - h - y;

      return { x: xRelative, y: yRelative };
    }
    return { x: 0, y: 0 };
  };
  const getRef = (s) => {
    console.trace();
    if (["--left", "--top"].includes(s)) {
      return parseFloat(ref.current.style.getPropertyValue(s).slice(0, -2));
    }
    return 0;
  };

  const updateArrow = useXarrow();
  // EVENT FUNCTIONS-------

  // USE EFFECTS
  useEffect(() => {
    // Select the box
    let startMouseX, startMouseY;
    let startX, startY;
    const handleMouseMove = (e) => {
      e.stopPropagation();
      if (!ref.current) return;
      let dx, dy;
      // New position of element
      dx = (e.clientX - startMouseX) / props.wsScale + startX;
      dy = (e.clientY - startMouseY) / props.wsScale + startY;
      updateArrow();
      // Update element position
      ref.current.style.setProperty("--left", `${dx}px`);
      ref.current.style.setProperty("--top", `${dy}px`);
    };

    const handleTouchMove = (e) => {
      e.stopPropagation();
      let dx, dy;
      // New position of element
      dx = (e.touches[0].pageX - startMouseX) / props.wsScale + startX;
      dy = (e.touches[0].pageY - startMouseY) / props.wsScale + startY;
      updateArrow();

      // Update element position
      ref.current.style.setProperty("--left", `${dx}px`);
      ref.current.style.setProperty("--top", `${dy}px`);
    };
    // When user loosen the pointer
    const handleMouseUp = (e) => {
      // Clean up event listeners
      e.stopPropagation();
      if (!ref.current) {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        return;
      }
      ref.current.classList.remove("box-selected");
      document.removeEventListener("mousemove", handleMouseMove);
      // Update state
      const newXY = coorRelative(
        getRef("--left"),
        getRef("--top"),
        props.coor.h
      );
      // //console.log(newXY);
      props.updateCoors(
        props.coor.type,
        props.coor.id,
        {
          x: newXY.x,
          y: newXY.y,
          isSelected: true,
        },
        { isSelected: false }
      );
      props.setBoxSelected(props.coor);
      // props.setBoxRef(ref);
      props.openCustomize(props.type, props.coor.children);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleTouchEnd = (e) => {
      // Clean up event listeners
      e.stopPropagation();
      ref.current.classList.remove("box-selected");
      document.removeEventListener("touchmove", handleTouchMove);
      // ref.current.firstChild.classList.remove("touch-none");

      // Update state
      const newXY = coorRelative(
        getRef("--left"),
        getRef("--top"),
        props.coor.h
      );
      props.updateCoors(
        props.coor.type,
        props.coor.id,
        {
          x: newXY.x,
          y: newXY.y,
          isSelected: true,
        },
        { isSelected: false }
      );
      props.setBoxSelected(props.coor);
      // props.setBoxRef(ref);
      props.openCustomize(props.type, props.coor.children);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    const handleMouseDown = (e) => {
      // if (e.target !== e.currentTarget) return;
      e.stopPropagation();
      if (ref.current && !ref.current.contains(e.target)) return;
      startX = getRef("--left");
      startY = getRef("--top");
      ref.current.classList.add("box-selected");
      startMouseX = e.clientX;
      startMouseY = e.clientY;

      // Attach event listeners
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleTouchStart = (e) => {
      // if (e.target !== e.currentTarget) return;
      e.stopPropagation();
      if (ref.current && !ref.current.contains(e.target)) return;
      startX = getRef("--left");
      startY = getRef("--top");
      ref.current.classList.add("box-selected");
      startMouseX = e.touches[0].pageX;
      startMouseY = e.touches[0].pageY;

      props.setBoxSelected(props.coor);
      //props.setBoxRef(ref);
      // Attach event listeners
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    };

    ref.current.addEventListener("mousedown", handleMouseDown);
    ref.current.addEventListener("touchstart", handleTouchStart);

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mousedown", handleMouseDown);
        ref.current.removeEventListener("touchstart", handleTouchStart);
      }
    };
  }, [props.coor, props.wsScale]);

  useEffect(() => {
    ref.current.style.setProperty("--left", `${coorAbsolute().x}px`);
    ref.current.style.setProperty("--top", `${coorAbsolute().y}px`);
  }, [props.coor]);

  useEffect(() => {
    // handling resizing boxes
    // Return is there isnt any box selected
    if (!props.coor.isSelected) return;
    const right = rightResize.current;
    const left = leftResize.current;
    const bottom = bottomResize.current;
    const top = topResize.current;
    const topleft = topleftResize.current;
    const topright = toprightResize.current;
    const bottomleft = bottomleftResize.current;
    const bottomright = bottomrightResize.current;
    const box = ref.current;
    // let styles;
    // if (box) styles = box.getComputedStyle(box);
    let x = 0;
    let y = 0;
    let width = props.coor.w;
    let height = props.coor.h;

    // Right resize
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width += dx;
      width = width > props.coor.mw ? width : props.coor.mw;
      box.style.width = `${width}px`;
      updateArrow();
    };
    const onMouseUpRightResize = (event) => {
      props.updateCoors(props.coor.type, props.coor.id, {
        w: parseInt(box.style.width.slice(0, -2)),
      });
      document.removeEventListener("mousemove", onMouseMoveRightResize);
      document.removeEventListener("mouseup", onMouseUpRightResize);
    };

    const onMouseDownRightResize = (event) => {
      event.stopPropagation();
      x = event.clientX; // set the mouse position at the time clicked
      // box.style.left = props.coor.left;
      // box.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // touch right resize
    const onTouchMoveRightResize = (event) => {
      const dx = event.touches[0].pageX - x;
      x = event.touches[0].pageX;
      width += dx;
      width = width > props.coor.mw ? width : props.coor.mw;
      box.style.width = `${width}px`;
    };
    const onTouchUpRightResize = (event) => {
      props.updateCoors(props.coor.type, props.coor.id, {
        w: parseInt(box.style.width.slice(0, -2)),
      });
      document.removeEventListener("touchmove", onTouchMoveRightResize);
      document.removeEventListener("touchend", onTouchUpRightResize);
    };
    const onTouchDownRightResize = (event) => {
      event.stopPropagation();
      x = event.touches[0].pageX; // set the mouse position at the time clicked
      // box.style.left = props.coor.left;
      // box.style.right = null;
      document.addEventListener("touchmove", onTouchMoveRightResize);
      document.addEventListener("touchend", onTouchUpRightResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - y;
      y = event.clientY;
      height += dy;
      height = height > props.coor.mh ? height : props.coor.mh;

      box.style.height = `${height}px`;
      updateArrow();
    };
    const onMouseUpBottomResize = (event) => {
      const newY = props.coor.y - (height - props.coor.h);
      props.updateCoors(props.coor.type, props.coor.id, {
        h: parseInt(box.style.height.slice(0, -2)),
        y: newY,
      });
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
      document.removeEventListener("mouseup", onMouseUpBottomResize);
    };
    const onMouseDownBottomResize = (event) => {
      event.stopPropagation();
      y = event.clientY; // set the mouse position at the time clicked
      // box.style.left = props.coor.left;
      // box.style.right = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };
    //touch bottom resize
    const onTouchMoveBottomResize = (event) => {
      const dy = event.touches[0].pageY - y;
      y = event.touches[0].pageY;
      height += dy;
      height = height > props.coor.mh ? height : props.coor.mh;

      box.style.height = `${height}px`;
    };
    const onTouchUpBottomResize = (event) => {
      const newY = props.coor.y - (height - props.coor.h);
      props.updateCoors(props.coor.type, props.coor.id, {
        h: parseInt(box.style.height.slice(0, -2)),
        y: newY,
      });
      document.removeEventListener("touchmove", onTouchMoveBottomResize);
      document.removeEventListener("touchend", onTouchUpBottomResize);
    };
    const onTouchDownBottomResize = (event) => {
      event.stopPropagation();
      y = event.touches[0].pageY; // set the mouse position at the time clicked
      // box.style.left = props.coor.left;
      // box.style.right = null;
      document.addEventListener("touchmove", onTouchMoveBottomResize);
      document.addEventListener("touchend", onTouchUpBottomResize);
    };
    // Left resize
    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width -= dx;
      width = width > props.coor.mw ? width : props.coor.mw;
      box.style.width = `${width}px`;
      box.style.setProperty("--left", `${getRef("--left") + dx}px`);
      updateArrow();
    };
    const onMouseUpLeftResize = (event) => {
      let newXAbsolute = getRef("--left");
      props.updateCoors(props.coor.type, props.coor.id, {
        w: parseInt(box.style.width.slice(0, -2)),
        x: coorRelative(newXAbsolute, props.coor.y).x,
      });
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
      document.removeEventListener("mouseup", onMouseUpLeftResize);
    };
    const onMouseDownLeftResize = (event) => {
      event.stopPropagation();
      x = event.clientX;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };
    //touch left resize
    const onTouchMoveLeftResize = (event) => {
      const dx = event.touches[0].pageX - x;
      x = event.touches[0].pageX;
      width -= dx;
      width = width > props.coor.mw ? width : props.coor.mw;
      box.style.width = `${width}px`;
      box.style.setProperty("--left", `${getRef("--left") + dx}px`);
    };
    const onTouchUpLeftResize = (event) => {
      let newXAbsolute = getRef("--left");
      props.updateCoors(props.coor.type, props.coor.id, {
        w: parseInt(box.style.width.slice(0, -2)),
        x: coorRelative(newXAbsolute, props.coor.y).x,
      });
      document.removeEventListener("touchmove", onTouchMoveLeftResize);
      document.removeEventListener("touchend", onTouchUpLeftResize);
    };
    const onTouchDownLeftResize = (event) => {
      event.stopPropagation();
      x = event.touches[0].pageX;
      document.addEventListener("touchmove", onTouchMoveLeftResize);
      document.addEventListener("touchend", onTouchUpLeftResize);
    };
    // Top resize
    const onMouseMoveTopResize = (event) => {
      const dy = event.clientY - y;
      y = event.clientY;
      height -= dy;
      height = height > props.coor.mh ? height : props.coor.mh;
      box.style.height = `${height}px`;
      box.style.setProperty("--top", `${getRef("--top") + dy}px`);
      updateArrow();
    };
    const onMouseUpTopResize = (event) => {
      props.updateCoors(props.coor.type, props.coor.id, {
        h: parseInt(box.style.height.slice(0, -2)),
      });
      document.removeEventListener("mousemove", onMouseMoveTopResize);
      document.removeEventListener("mouseup", onMouseUpTopResize);
    };
    const onMouseDownTopResize = (event) => {
      event.stopPropagation();
      y = event.clientY;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };
    //touch top resize
    const onTouchMoveTopResize = (event) => {
      const dy = event.touches[0].pageY - y;
      y = event.touches[0].pageY;
      height -= dy;
      height = height > props.coor.mh ? height : props.coor.mh;
      box.style.height = `${height}px`;
      box.style.setProperty("--top", `${getRef("--top") + dy}px`);
    };
    const onTouchUpTopResize = (event) => {
      props.updateCoors(props.coor.type, props.coor.id, {
        h: parseInt(box.style.height.slice(0, -2)),
      });
      document.removeEventListener("touchmove", onTouchMoveTopResize);
      document.removeEventListener("touchend", onTouchUpTopResize);
    };
    const onTouchDownTopResize = (event) => {
      event.stopPropagation();
      y = event.touches[0].pageY;
      document.addEventListener("touchmove", onTouchMoveTopResize);
      document.addEventListener("touchend", onTouchUpTopResize);
    };

    right.addEventListener("mousedown", onMouseDownRightResize);
    bottom.addEventListener("mousedown", onMouseDownBottomResize);
    left.addEventListener("mousedown", onMouseDownLeftResize);
    top.addEventListener("mousedown", onMouseDownTopResize);

    //touch
    right.addEventListener("touchstart", onTouchDownRightResize);
    bottom.addEventListener("touchstart", onTouchDownBottomResize);
    left.addEventListener("touchstart", onTouchDownLeftResize);
    top.addEventListener("touchstart", onTouchDownTopResize);

    // For rounded resizer
    topleft.addEventListener("mousedown", onMouseDownLeftResize);
    topleft.addEventListener("mousedown", onMouseDownTopResize);
    topright.addEventListener("mousedown", onMouseDownRightResize);
    topright.addEventListener("mousedown", onMouseDownTopResize);
    bottomleft.addEventListener("mousedown", onMouseDownLeftResize);
    bottomleft.addEventListener("mousedown", onMouseDownBottomResize);
    bottomright.addEventListener("mousedown", onMouseDownRightResize);
    bottomright.addEventListener("mousedown", onMouseDownBottomResize);

    // For rounded touch resize
    topleft.addEventListener("touchstart", onTouchDownLeftResize);
    topleft.addEventListener("touchstart", onTouchDownTopResize);
    topright.addEventListener("touchstart", onTouchDownRightResize);
    topright.addEventListener("touchstart", onTouchDownTopResize);
    bottomleft.addEventListener("touchstart", onTouchDownLeftResize);
    bottomleft.addEventListener("touchstart", onTouchDownBottomResize);
    bottomright.addEventListener("touchstart", onTouchDownRightResize);
    bottomright.addEventListener("touchstart", onTouchDownBottomResize);

    return () => {
      right.removeEventListener("mousedown", onMouseDownRightResize);
      bottom.removeEventListener("mousedown", onMouseDownBottomResize);
      left.removeEventListener("mousedown", onMouseDownLeftResize);
      top.removeEventListener("mousedown", onMouseDownTopResize);
      topleft.removeEventListener("mousedown", onMouseDownLeftResize);
      topleft.removeEventListener("mousedown", onMouseDownTopResize);
      topright.removeEventListener("mousedown", onMouseDownRightResize);
      topright.removeEventListener("mousedown", onMouseDownTopResize);
      bottomleft.removeEventListener("mousedown", onMouseDownLeftResize);
      bottomleft.removeEventListener("mousedown", onMouseDownBottomResize);
      bottomright.removeEventListener("mousedown", onMouseDownRightResize);
      bottomright.removeEventListener("mousedown", onMouseDownBottomResize);

      //touch
      right.removeEventListener("touchstart", onTouchDownRightResize);
      bottom.removeEventListener("touchstart", onTouchDownBottomResize);
      left.removeEventListener("touchstart", onTouchDownLeftResize);
      top.removeEventListener("touchstart", onTouchDownTopResize);
      topleft.removeEventListener("touchstart", onTouchDownLeftResize);
      topleft.removeEventListener("touchstart", onTouchDownTopResize);
      topright.removeEventListener("touchstart", onTouchDownRightResize);
      topright.removeEventListener("touchstart", onTouchDownTopResize);
      bottomleft.removeEventListener("touchstart", onTouchDownLeftResize);
      bottomleft.removeEventListener("touchstart", onTouchDownBottomResize);
      bottomright.removeEventListener("touchstart", onTouchDownRightResize);
      bottomright.removeEventListener("touchstart", onTouchDownBottomResize);
    };
  }, [props.coor]);
  return (
    <>
      <div
        ref={ref}
        className={` bg-white border-[1px] border-black box relative ${
          props.coor.isSelected && "box-selected"
        }`}
        style={style}
      >
        {/* Children here */}
        {/* <span className="text-black absolute -top-6 left-0 w-full truncate text-left">New {props.coor.type}</span> */}
        <BoxContext.Provider value={{ handleBoxChange, props }}>
          {props.coor.children}
        </BoxContext.Provider>
        {/* <div>
          My name is
        </div> */}
        {/* Resizing Bars and Dragging  */}
        {props.coor.isSelected && (
          <>
            {/* Bar resizer */}
            <div ref={leftResize} className="resizer resizer-left"></div>
            <div ref={rightResize} className="resizer resizer-right"></div>
            <div ref={topResize} className="resizer resizer-top"></div>
            <div ref={bottomResize} className="resizer resizer-bottom"></div>
            {/* Round resizer */}
            <div
              ref={topleftResize}
              className="resizer resizer-topleft round-resizer"
            ></div>
            <div
              ref={toprightResize}
              className="resizer resizer-topright round-resizer"
            ></div>
            <div
              ref={bottomleftResize}
              className="resizer resizer-bottomleft round-resizer"
            ></div>
            <div
              ref={bottomrightResize}
              className="resizer resizer-bottomright round-resizer"
            ></div>
          </>
        )}
      </div>
    </>
  );
}

export default React.forwardRef(Box);
