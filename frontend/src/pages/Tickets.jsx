import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const Tickets = () => {
    const { tickets, isLoading, isSuccess } = useSelector(state => state.tickets);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch])

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <h2>dfdf</h2>
        </div>
    );
};

export default Tickets;