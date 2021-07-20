import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { eventDeleted } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const { activeEvent } = useSelector(state => state.calendar);

    const handleClick = () => {
        dispatch(eventDeleted());
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleClick}
        >
            <i className="fas fa-trash"></i>
            <span> Borrar Evento</span>
        </button>
    )
}