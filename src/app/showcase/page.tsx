'use client';

import ShowcaseCard from '@/components/showcase/showcaseCard';
import CustomTypography from '@/components/ui/typography';
import { nonCaseSensitiveSearch, scrollToTop } from '@/utils/misc';
import buddhistDayjs from '@/variables/day';
import { showcaseList } from '@/variables/showcase/showcase-list';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Input, Pagination } from 'antd';
import { useEffect, useState } from 'react';

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
      <div className='flex flex-col gap-4 w-full items-center justify-center mt-20 mobile:mt-14 py-8 mobile:p-6'>
         <div className='flex flex-col gap-4 w-full max-w-6xl'>
            <div className='flex mobile:hidden items-center justify-between'>
               <CustomTypography variant='h5'>ผลงานการซ่อม</CustomTypography>
               <CustomTypography
                  variant='body1'
                  className='text-foreground-secondary'
               >{`ทั้งหมด ${filteredList.length} รายการ`}</CustomTypography>
            </div>
            <div className='hidden mobile:flex items-center justify-between'>
               <CustomTypography variant='subtitle2'>
                  ผลงานการซ่อม
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
            <div className='grid grid-cols-4 gap-3 w-full mobile:grid-cols-2 mobile:gap-2'>
               {contentList.map((content, index) => (
                  <ShowcaseCard key={index} index={index} content={content} />
               ))}
            </div>
         </div>
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
      </div>
   );
}
