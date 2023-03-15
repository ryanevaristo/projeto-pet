import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../layout/Container';
//importe um icone para minhas finanças
import {RiMoneyDollarCircleFill} from 'react-icons/ri';
import {AiFillSchedule} from 'react-icons/ai';

function Analytics() {

    return (
        <>
            
<Container customClass="center">
<div class="flex justify-center space-x-60">
  <div class="w-2/3 bg-white rounded-md overflow-hidden shadow-lg p-5 flex">
    <div class="flex items-center justify-center">
      <AiFillSchedule size={80} color="#4F46E5"/>
    </div>
    <div class="px-4 py-4">
      <h2 class="text-xl font-bold mb-2">Agendamentos</h2>
      <h3 class="text-gray-600 text-lg">2000.</h3>
    </div>
  </div>
  
  <div class="w-1/3 bg-white rounded-lg overflow-hidden shadow-lg p-5">
    <div class="flex items-center justify-center">
      <RiMoneyDollarCircleFill size={80} color="#4F46E5"/>
    </div>
    <div class="px-4 py-4">
      <h2 class="text-xl font-bold mb-2">Faturamento</h2>
      <h3 class="text-gray-600 text-lg">5000.</h3>
    </div>
  </div>
  
  <div class="w-1/3 bg-white rounded-lg overflow-hidden shadow-lg p-5">
    <div class="flex items-center justify-center">
      <RiMoneyDollarCircleFill size={80} color="#4F46E5"/>
    </div>
    <div class="px-4 py-4">
      <h2 class="text-xl font-bold mb-2">Despesas</h2>
      <h3 class="text-gray-600 text-lg">5000.</h3>
    </div>
  </div>
</div>

                </Container>

        </>
    )
    
}

export default Analytics;