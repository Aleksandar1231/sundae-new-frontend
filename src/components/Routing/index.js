import React from 'react'
import { useSelector } from "react-redux";
import { Route, Routes } from 'react-router-dom'

const Routing = ({ routes }) => {
    const { access } = useSelector(state => state.rootReducer.accessReducer)

    return (
        <Routes>
            {
                routes.map((item, i) =>
                    item.role.indexOf(access) !== -1 &&
                    <Route
                        key={i} {...item}
                    />
                )
            }
        </Routes>
    );
};

export default Routing;
