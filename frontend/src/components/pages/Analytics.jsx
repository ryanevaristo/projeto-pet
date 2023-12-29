import React from 'react';
//import { Link } from 'react-router-dom';
import Container from '../layout/Container';
//importe um icone para minhas finanças
import { RiMoneyDollarCircleFill, RiUser2Fill } from 'react-icons/ri';
import { AiFillSchedule } from 'react-icons/ai';

//import 'bootstrap/dist/css/bootstrap.min.css';

function Analytics() {

  return (
    <>

<Container customClass="center">
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            
            <div
              class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <AiFillSchedule size={50} color="#4F46E8" />
              </div>
        
              <div class="mt-4 flex items-end justify-between">
                <div>
                  
                  <span class="ml-4 px-4 text-sm font-medium">Agendamentos</span>
                </div>
        
                <span class="flex items-center gap-1 text-sm font-medium text-meta-3">
                <h4 class="ml-4 px-4 text-title-md font-bold text-black dark:text-black">
                    2000
                  </h4>
                </span>
              </div>
            </div>
            <div
              class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <RiMoneyDollarCircleFill size={50} color="#4F46E5" />
              </div>
        
              <div class="mt-4 flex items-end justify-between">
                <div>
                  <span class="ml-4 px-4 text-sm font-medium">Faturamento</span>
                </div>
        
                <span class="flex items-center gap-1 text-sm font-medium text-meta-3">
                <h4 class="ml-4 px-4 text-title-md font-bold text-black dark:text-black">
                    $45,2K
                  </h4>                  
                </span>
              </div>
            </div>

            <div
              class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <RiMoneyDollarCircleFill size={50} color="#4F46E5" />
              </div>
        
              <div class="mt-4 flex items-end justify-between">
                <div>
                  <span class="ml-4 px-4 text-sm font-medium">Despesas</span>
                </div>
        
                <span class="flex items-center gap-1 text-sm font-medium text-meta-3">
                <h4 class="ml-4 px-4 text-title-md font-bold text-black dark:text-black">
                    $2.450k
                  </h4>
                </span>
              </div>
            </div>
            <div
              class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <RiUser2Fill size={50} color="#4F46E5" />
              </div>
        
              <div class="mt-4 flex items-end justify-between">
                <div>                  
                  <span class="ml-4 px-4 text-sm font-medium">Usuários</span>
                </div>        
                <span class="flex items-center gap-1 text-sm font-medium text-meta-5">
                <h4 class=" ml-4 px-4 text-title-md font-bold text-black dark:text-black">
                    3.456
                  </h4>
                  
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>



    </>
  )

}

export default Analytics;