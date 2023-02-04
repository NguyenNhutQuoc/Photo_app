import React from 'react';
import Banner from '../../../../components/Banner';
import PhotoForm from '../../components/PhotoForm';
import './AddEditPage.scss';
import { useParams } from 'react-router-dom';
import {  useSelector } from 'react-redux';


const AddEditPage = () => {
    const param = useParams();
    console.log(param);
    const photos = useSelector(state => state.photos);
    console.log(photos);
    const photo = photos.find(x => x.id === parseInt(param.id));
    console.log(photo);
    return (
        <div>
            <Banner title='Add your new Photo' />
            <div className='form-add'>
                {
                    param.id === 'add' ? <PhotoForm /> : <PhotoForm initialValues={photo}/>
                }
            </div>
        </div>
    );
};

export default AddEditPage;