import React, { useEffect, useState } from 'react';

function Expire(props)
{
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() =>
    {
        setTimer(props.delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const setTimer = (delay) =>
    {
        setTimeout(() => setIsVisible(false), delay);
    };

    return (
        isVisible
            ? <div>{props.children}</div>
            : <span />
    );
}

export default Expire;