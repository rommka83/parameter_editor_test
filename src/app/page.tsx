'use client';

import React from 'react';
import ParamEditor, { Model, Param } from '@/components/ParamEditor';
// Вариант параметров
const params: Param[] = [
  { id: 1, name: 'параметр 1', type: 'string' },
  { id: 2, name: 'параметр 2', type: 'string' },
  { id: 3, name: 'параметр 3', type: 'string' },
];

// Вариант начальной модели
const initialModel: Model = {
  paramValues: [
    { paramId: 1, value: 'описание параметра 1' },
    { paramId: 2, value: 'описание параметра 2' },
    { paramId: 3, value: 'описание параметра 3' },
  ],
  colors: [],
};

const Page = () => {
  const paramEditorRef = React.useRef<ParamEditor>(null);

  const handleGetModel = () => {
    if (paramEditorRef.current) {
      const model = paramEditorRef.current.getModel();
      console.log('Текущая модель:', model);
      alert('Текущая модель выведена в консоль');
    }
  };

  return (
    <div className='flex flex-col items-center gap-10 py-40'>
      <ParamEditor ref={paramEditorRef} params={params} model={initialModel} />
      <button
        className='w-fit cursor-pointer rounded-md bg-green-200 px-4 py-2 hover:bg-green-200/50 active:bg-green-400'
        onClick={handleGetModel}
      >
        Получить модель
      </button>
    </div>
  );
};

export default Page;
