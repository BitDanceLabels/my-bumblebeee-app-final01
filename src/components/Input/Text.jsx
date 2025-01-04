import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import { TextT, LinkSimple, XCircle, CopySimple } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { onClickInputUrl } from "../../redux/clickURLSlice";
import { onClickDelete } from "../../redux/clickDeletefile";
// import { useBoxContext, props } from "../Whitespace/Element";
import { useBoxContext } from "../Whitespace/Element";

export const TextInput = React.forwardRef(function TextResult(_, ref) {
  // const reduxData = useSelector(state => state.clickText.data);
  // //console.log("check redux data:", reduxData)
  // const [textId, setTextId] = useState(1)
  const { handleBoxChange, props } = useBoxContext();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const handleClickDelete = () => {
    dispatch(onClickDelete());
  };

  const handleInputBlur1 = () => {
    // dispatch(onClickInputText());
  };
  const selectDataText = useSelector((state) => state.clickSelect.data);
  const selectDataTextId = selectDataText.id;
  function validateText(text) {
    // Trim the input to remove leading and trailing whitespaces
    const trimmedText = text.trim();

    // Check if the trimmed text is not empty
    const isValid = trimmedText.length > 0;

    return isValid;
  }
  const handleChangeInput = (value) => {
    handleBoxChange(value, validateText(value));

    setInputValue(value);
  };

  const textRef = useRef();

  useEffect(() => {
    textRef?.current?.addEventListener("mousedown", (e) => e.stopPropagation());
    return () => {
      textRef?.current?.removeEventListener("mousedown", (e) => e.stopPropagation());
    }
  }, [textRef])

  useImperativeHandle(
    ref,
    () => {
      return {
        setInput(input) {
          if (input.trim() === "") {
            throw new Error("Input is empty");
          }
          textRef.current.value = input;
          handleBoxChange(input, validateText(input));
          setInputValue(input);
        },
      };
    },
    []
  );

  const copyToClipboard = (val) => {
    navigator.clipboard.writeText(val);
  };

  const copyRef = useRef();
  const playholder =
    props.coor.onCreating ? "On Generating..." : "Enter your text ...";
  const className = `h-full resize-none text-black outline-none border-0 border-none focus:ring-0 bg-transparent flex-grow p-0 mr-5 overflow-y-scroll no-scrollbar ${props.coor.onCreating ? "animate-pulse" : ""}`
  return (
    <>
      <div className="relative touch-none bg-white w-full h-full max-h-full border-blue border-2 rounded-md inline-flex justify-center items-center p-[11px]  overflow-y-scroll no-scrollbar">
        <TextT size={25} className="text-blue bg-transparent mr-2" />
        <TextareaAutosize
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          value={inputValue}
          ref={textRef}
          onChange={(e) => {
            handleChangeInput(e.target.value);
          }}
          onBlur={handleInputBlur1}
          className={className}
          placeholder={playholder}

          minRows={1}
          maxRows={10}
        />
        {validateText(inputValue) && (
          <div className="relative cursor-pointer">
            <abbr title="Copy to clipboard">
              <CopySimple
                size={20}
                className="text-blue"
                onClick={() => {
                  copyToClipboard(textRef.current.value);
                  copyRef.current.style.display = "block";
                  setTimeout(() => {
                    copyRef.current.style.display = "none";
                  }, 1000);
                }}
              />
            </abbr>
            <span
              id="copy"
              ref={copyRef}
              className="hidden absolute top-8 right-0 p-1 text-[#353b48] text-[11px] transition-[0.25s] animate-copied"
            >
              Copied!
            </span>
          </div>
        )}
      </div>
      <div className="absolute right-0 top-0 transition-[0.25s] font-bold flex flex-col bg-[#3498DB] rounded-bl-[15px] p-1 ">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleClickDelete}
          onTouchStart={handleClickDelete}
        >
          <XCircle size={22} color="white" />
        </div>
      </div>
    </>
  );
});

export const URLInput = React.forwardRef(function URLResult(_, ref) {
  const { handleBoxChange } = useBoxContext();
  const selectDataUrl = useSelector((state) => state.clickSelect.data);
  const [linkValue, setLinkValue] = useState("");
  const dispatch = useDispatch();
  const handleClickDelete = () => {
    dispatch(onClickDelete());
  };
  const regexURL =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  function validateURL(url) {
    const isValid = url.match(regexURL);

    return isValid;
  }
  const handleInputBlur2 = () => {
    dispatch(onClickInputUrl());
  };

  const handleChangeInput = (value) => {
    handleBoxChange(value, validateURL(value));

    setLinkValue(value);
  };

  return (
    <>
      <div className="touch-none h-full w-full bg-white relative border-blue border-2 rounded-md inline-flex items-center p-[11px]">
        <LinkSimple size={20} className="text-blue" />
        <input
          value={linkValue}
          onChange={(e) => {
            validateURL(e.target.value);
            handleChangeInput(e.target.value);
          }}
          ref={ref}
          onBlur={handleInputBlur2}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          type="url"
          placeholder="Paste or enter your URL here"
          className="w-full text-black outline-none border-0 border-none focus:ring-0 bg-transparent"
        />
        {/* {mess.length > 0 && <Notify message={mess} />} */}
      </div>
      <div className="absolute right-0 top-0 transition-[0.25s] font-bold flex flex-col bg-[#3498DB] rounded-bl-[15px] p-1 ">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleClickDelete}
          onTouchStart={handleClickDelete}
        >
          <XCircle size={22} color="white" />
        </div>
      </div>
    </>
  );
});
