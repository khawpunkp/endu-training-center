'use client';

import OurStudentCard from '@/components/ourStudent/ourStudentCard';
import CustomTypography from '@/components/ui/typography';
import buddhistDayjs from '@/variables/day';
import { showcaseList } from '@/variables/showcase/showcase-list';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Input, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { nonCaseSensitiveSearch, scrollToTop } from '@/utils/misc';
import Notfound from '@/components/ui/notfound';

export default function ShowcasePage() {
   const pageSize = 8;
   const [skip, setSkip] = useState<number>(0);

   const onPaginationChange = (page: number) => {
      setSkip((page - 1) * pageSize);
   };

   const master = showcaseList.sort((a, b) => {
      return buddhistDayjs(a.date).isBefore(buddhistDayjs(b.date)) ? 1 : -1;
   });

   const [filteredList, setFilteredList] = useState(master);
   const [contentList, setContentList] = useState(
      filteredList.slice(skip, skip + pageSize),
   );
   const [searchInput, setSearchInput] = useState<string>('');

   const search = () => {
      const filteredList = master.filter((d) =>
         nonCaseSensitiveSearch(d.title, searchInput),
      );
      setFilteredList(filteredList);
      onPaginationChange(1);
   };

   const clear = () => {
      setFilteredList(master);
      onPaginationChange(1);
   };

   useEffect(() => {
      setContentList(filteredList.slice(skip, skip + pageSize));
      scrollToTop();
   }, [skip, filteredList]);

   return (
      <div className='flex flex-col gap-4 min-h-[calc(100vh-190px)] mobile:min-h-[calc(100vh-250px)] w-full items-center justify-between pt-28 mobile:pt-20 pb-8 mobile:p-6'>
         <div className='flex flex-col gap-4 w-full max-w-6xl h-full flex-grow'>
            <div className='flex mobile:hidden items-center justify-between'>
               <CustomTypography variant='h5'>นักเรียนของเรา</CustomTypography>
               <CustomTypography
                  variant='body1'
                  className='text-foreground-secondary'
               >{`ทั้งหมด ${filteredList.length} รายการ`}</CustomTypography>
            </div>
            <div className='hidden mobile:flex items-center justify-between'>
               <CustomTypography variant='subtitle2'>
                  นักเรียนของเรา
               </CustomTypography>
               <CustomTypography
                  variant='caption1'
                  className='text-foreground-secondary'
               >{`ทั้งหมด ${filteredList.length} รายการ`}</CustomTypography>
            </div>
            <Input.Search
               size='large'
               placeholder='ค้นหา'
               className='!w-[360px]'
               value={searchInput}
               onChange={(e) => setSearchInput(e.target.value)}
               onPressEnter={search}
               onSearch={search}
            />
            {contentList.length === 0 ? (
               <div className='h-full w-full flex-grow flex items-center justify-center'>
                  <Notfound />
               </div>
            ) : (
               <div className='grid grid-cols-4 gap-3 w-full mobile:grid-cols-2 mobile:gap-2'>
                  {contentList.map((content, index) => (
                     <OurStudentCard
                        key={index}
                        index={index + 1}
                        content={content}
                     />
                  ))}
               </div>
            )}
         </div>
         {contentList.length > 0 && (
            <div className='flex w-full py-2 items-center justify-end mobile:justify-center max-w-6xl'>
               <Pagination
                  align='end'
                  total={filteredList.length}
                  current={skip / pageSize + 1}
                  pageSize={pageSize}
                  onChange={onPaginationChange}
                  className='!flex mobile:!hidden'
               />
               <Pagination
                  total={filteredList.length}
                  current={skip / pageSize + 1}
                  pageSize={pageSize}
                  onChange={onPaginationChange}
                  simple
                  className='mobile:!flex !hidden !items-center'
               />
            </div>
         )}
      </div>
   );
}
