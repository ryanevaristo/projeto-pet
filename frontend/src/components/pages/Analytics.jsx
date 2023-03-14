import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../layout/Container';


function Analytics() {

    return (
        <>
            
                <Container customClass="start">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg h-60" style={{width:'30rem'}}>
                <div class="px-4 py-3 border-b border-gray-200">
                    <h2 class="text-2xl font-bold">name</h2>
                    <p class="text-gray-600">Ryan Evaristo de Lima</p>
                </div>
                <div class="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                    <div class="w-1/2">
                    <div className="w-full h-40 bg-cover bg-center" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIRyMpCY1M0sLMFFvGPODkFYTgDEWze2SrxB5VWiOA&s')` }}></div>

                    </div>
                    <div class="w-2/3 ml-4">
                    <p class="text-gray-600 mb-2">date - horario</p>
                    <p class="text-gray-600 mb-2">porte | raca</p>
                    <p class="text-gray-600 mb-2">(79) 9999-9999</p>
                    <p class="text-gray-600 mb-2">petservice</p>
                    <p class="text-gray-600">R$price,00</p>
                    </div>
                </div>
                </div>
                </Container>

        </>
    )
    
}

export default Analytics;