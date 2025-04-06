'use client';

import React, { useRef, useState } from 'react';

export interface Param {
  id: number;
  name: string;
  type: 'string' | 'number' | 'list';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
  hex: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface IParamEditorProps {
  params: Param[];
  model: Model;
}

interface IState {
  paramValues: ParamValue[];
}

interface IParamProps {
  param: Param;
  description: string;
  onChange: (value: string) => void;
}

interface IParamsLisProps {
  params: Param[];
  paramValues: ParamValue[];
  getChange: (value: ParamValue[]) => void;
}

class ParamEditor extends React.Component<IParamEditorProps, IState> {
  constructor(props: IParamEditorProps) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues ? [...props.model.paramValues] : [],
    };
  }

  private handleChangeParamsValue(newParamValues: ParamValue[]) {
    this.setState((prev) => ({ ...prev, paramValues: newParamValues }));
  }

  public getModel(): Model {
    return {
      ...this.props.model,
      paramValues: this.state.paramValues,
    };
  }

  render() {
    const { params } = this.props;

    return (
      <div className='w-fit'>
        <h2 className='mb-5 text-2xl font-bold'>Редактор параметров</h2>
        <ParamsList
          params={params}
          paramValues={this.state.paramValues}
          getChange={(v) => this.handleChangeParamsValue(v)}
        />
      </div>
    );
  }
}

function Param({ param, description, onChange }: IParamProps) {
  const [value, setValue] = useState(description);

  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (param.type !== 'string') return;
    const newValue = e.target.value.trim();
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <li key={param.id} className='flex items-center justify-between gap-4'>
      <label className='font-bold' htmlFor={`param-${param.id}`}>
        {param.name}:
      </label>
      <input
        className='rounded border px-2 py-1'
        id={`param-${param.id}`}
        type='text'
        value={value}
        onChange={handleParamChange}
      />
    </li>
  );
}

function ParamsList({ params, paramValues, getChange }: IParamsLisProps) {
  const paramsValues = useRef<ParamValue[]>(paramValues);
  const handleChangeParamsValue = (id: number, value: string) => {
    paramsValues.current = paramsValues.current.map((param) =>
      param.paramId === id ? { ...param, value: value } : param,
    );

    getChange(paramsValues.current);
  };

  return (
    <ul className='flex flex-col gap-3'>
      {params.map((param) => (
        <Param
          key={param.id}
          param={param}
          description={
            paramValues.find((pv) => pv.paramId === param.id)?.value || ''
          }
          onChange={(value) => handleChangeParamsValue(param.id, value)}
        />
      ))}
    </ul>
  );
}

export default ParamEditor;
