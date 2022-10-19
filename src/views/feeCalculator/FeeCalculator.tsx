import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from '../../components/button/Button'
import SetTime from '../../components/date-time-picker/SetTime'
import Display from '../../components/display/Display'
import VehicleList from '../../components/vehicle-list/VehicleList'
import { API_URL } from '../../config/Api';
import { feeRequest } from '../../interfaces/fee-request.interface';

import './FeeCalculator.css';

const initialTime = new Date('2021-08-18T00:00:54')

const FeeCalculator = () => {
    const [vehiclesTypes, setVehiclesTypes] = useState<Record <string,string>>();
    const [freeTaxVehicleType, setFreeTaxVehicleType] = useState();
    const [checkInTime, setCheckInTime] = useState<Date>(initialTime);
    const [checkOutTime, setCheckOutTime] = useState<Date>(initialTime);
    const [feeAmount, setFeeAmount] = useState<number | null>(null)
    const [selectedVehicle, setSelectedVehicle] = useState<string>('');
    const [disableRequest, setDisableRequest] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/vehicles/getVehicleTypes`)
            .then(data => setVehiclesTypes(data.data));
            
    }, [])

    useEffect(() => {
        axios.get(`${API_URL}/vehicles/getTaxFreeTypes`)
            .then(data => setFreeTaxVehicleType(data.data));
            
    }, [])

    useEffect(() => {
        if(selectedVehicle && checkInTime < checkOutTime){
            setDisableRequest(false)
        } else {
            setDisableRequest(true)
        }
    }, [selectedVehicle, checkInTime, checkOutTime])

    function resetAllData(){
        setCheckInTime(initialTime);
        setCheckOutTime(initialTime);
        setFeeAmount(null);
        setSelectedVehicle('');
    }

    function getTollFee(){
        const requestBody: feeRequest = {
            checkInDate: checkInTime,
            checkOutDate: checkOutTime,
            vehicleType: selectedVehicle,
        }

        axios.post(`${API_URL}/tollFee`, requestBody)
            .then(data => setFeeAmount(data.data))
    }
        

return (
    <div className='container'>
        {vehiclesTypes && <VehicleList list={vehiclesTypes} callback={setSelectedVehicle} selectedVehicle={selectedVehicle} />}
        <div className='container__pair'>
            <SetTime label={'CheckIn Time'} callback={setCheckInTime} date={checkInTime}/>
            <SetTime label={'CheckOut Time'} callback={setCheckOutTime} date={checkOutTime}/>
        </div>
        <div className='container__pair'>
            <Button text={'Get Fee'} callback={getTollFee} disabled={disableRequest}/>
            <Button text={'Reset'} color='red' callback={resetAllData} />
        </div>
        {feeAmount !== null && <Display fee={feeAmount} />}
    </div>
)
}

export default FeeCalculator