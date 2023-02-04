import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import MainPage from './pages/MainPage';
import Header from '../../components/Header';

Photo.propTypes = {
    arr: PropTypes.array,
};

function Photo(props) {
    return (
        <div> 
            <Header />
            <Routes>
                <Route path=":id" element={<AddEditPage />} />
                <Route path="*" element={<MainPage />} />
            </Routes>
        </div>
    );
}

export default Photo;