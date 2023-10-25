
import React, { useState } from 'react';
import { Input } from 'antd';
import { Select } from 'antd';
import translate from "translate";


const text = async () => {
  await translate("Hello world", { from:"en", to: "es", engine: "deepl", key: "b53bc108-48aa-37e9-e4f9-6ee098265447:fx" });
};

console.log(text);

console.log("test");

const LanguageSelector: React.FC = () => (
  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: 'IT',
        label: 'Italian',
      },
      {
        value: 'EN',
        label: 'English',
      },
      {
        value: 'SP',
        label: 'Spanish',
      },
      {
        value: 'PT',
        label: 'Portuguese',
      },
      {
        value: 'GE',
        label: 'German',
      },
      {
        value: 'CH',
        label: 'Chinese',
      },
    ]}
  />
);



const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
};

const STextAreasTranslations: React.FC = () => (
  <>
    <TextArea
      showCount
      maxLength={100}
      style={{ height: 120, marginBottom: 24 }}
      onChange={onChange}
      placeholder="can resize"
    />
  </>
);


const TTextAreasTranslations: React.FC = () => (
  <>
    <TextArea
      showCount
      maxLength={100}
      style={{ height: 120, marginBottom: 24 }}
      onChange={onChange}
      value={""}
      placeholder="Translation will appear here"
      readOnly
    />
  </>
);



const PagGenerateT: React.FC = () => {


    return (

        <div>
            <h1>Translation tool</h1>
            <h4>Source Language</h4>
            <LanguageSelector />
            <STextAreasTranslations />
            <h4>Target Language</h4>
            <LanguageSelector />
            <TTextAreasTranslations />
        </div>
    )
}

export default PagGenerateT;