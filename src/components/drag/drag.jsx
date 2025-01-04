import Draggable from 'react-draggable';
import React, { useState } from 'react';
import './drag.css'
import { TextInput, URLInput } from '../Input/Text';
import { Audio, Image, Video} from '../Input/Media';
import Record from '../Input/Record';

function Drag(props) {
    const { isOpenInputText, isOpenInputURL, isOpenInputAudio, isOpenInputVideo, isOpenInputImage, isOpenInputRecord } = props;
    return (
        <>
            <Draggable>
                <div className="box">
                    {isOpenInputText === true ? <TextInput /> : <></>}
                </div>
            </Draggable>
            <Draggable>
                <div className="box">
                    {isOpenInputURL === true ? <URLInput /> : <></>}
                </div>
            </Draggable>
            <Draggable>
                <div className="box">
                    {isOpenInputAudio === true ? <Audio /> : <></>}
                </div>
            </Draggable>
            <Draggable>
                <div className="box">
                    {isOpenInputVideo === true ? <Video /> : <></>}
                </div>
            </Draggable>
            <Draggable>

                <div className="box">
                    {isOpenInputImage === true ? <Image/> : <></>}
                </div>
            </Draggable>
            <Draggable>

                <div className="box">
                    {isOpenInputRecord === true ? <Record/> : <></>}
                </div>
            </Draggable>
        </>
    );
}
export default Drag;
