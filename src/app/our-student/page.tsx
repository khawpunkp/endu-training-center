'use client';

import OurStudentCard from '@/components/ourStudent/ourStudentCard';
import CustomTypography from '@/components/ui/typography';
import buddhistDayjs from '@/variables/day';
import { showcaseList } from '@/variables/showcase/showcase-list';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Input, Pagination } from 'antd';
import { useEffect, useState } from 'react';

export default function ShowcasePage() {
   const [skip, setSkip] = useState<number>(0);

   const onPaginationChange = (page: number, pageSize: number) => {
      setSkip((page - 1) * pageSize);
   };

   useEffect(() => {
      console.log(skip);
   }, [skip]);

   const contentList = showcaseList
      .sort((a, b) => {
         return buddhistDayjs(a.date).isBefore(buddhistDayjs(b.date)) ? 1 : -1;
      })
      .slice(skip, skip + 8);

   return (
      <div className='flex flex-col gap-4 min-h-[calc(100vh-190px)] mobile:min-h-[calc(100vh-250px)] w-full items-center justify-between pt-28 mobile:pt-20 pb-8 mobile:p-6'>
         <div className='flex flex-col gap-4 w-full max-w-7xl'>
            <div className='flex mobile:hidden items-center justify-between'>
               <CustomTypography variant='h5'>นักเรียนของเรา</CustomTypography>
               <CustomTypography
                  variant='body1'
                  className='text-foreground-secondary'
               >{`ทั้งหมด ${showcaseList.length} รายการ`}</CustomTypography>
            </div>
            <div className='hidden mobile:flex items-center justify-between'>
               <CustomTypography variant='subtitle2'>
                  นักเรียนของเรา
               </CustomTypography>
               <CustomTypography
                  variant='caption1'
                  className='text-foreground-secondary'
               >{`ทั้งหมด ${showcaseList.length} รายการ`}</CustomTypography>
            </div>
            <Input
               size='large'
               placeholder='ค้นหา'
               className='!w-[360px]'
               suffix={<MagnifyingGlass color='#7B89A1' />}
            />
            <div className='grid grid-cols-4 gap-3 w-full mobile:grid-cols-2 mobile:gap-2'>
               {contentList.map((content, index) => (
                  <OurStudentCard
                     key={index}
                     index={index + 1}
                     content={content}
                  />
               ))}
            </div>
         </div>
         <div className='flex w-full py-2 items-center justify-end mobile:justify-center max-w-7xl'>
            <Pagination
               align='end'
               total={showcaseList.length}
               current={skip / 8 + 1}
               pageSize={8}
               onChange={onPaginationChange}
               className='!flex mobile:!hidden'
            />
            <Pagination
               align='end'
               total={showcaseList.length}
               current={skip / 8 + 1}
               pageSize={8}
               onChange={onPaginationChange}
               simple
               className='mobile:!flex !hidden'
            />
         </div>
      </div>
   );
}
