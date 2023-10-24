import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { Select } from 'antd';
import axios from 'axios';

const LanguageSelector: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) =>
      (option?.label ?? '').includes(input)
    }
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    value={value}
    onChange={onChange}
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
        value: 'DE',
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

const PagGenerateT: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [sourceLang, setSourceLang] = useState('EN');
  const [targetLang, setTargetLang] = useState('IT');

  const handleSourceLangChange = (value: string) => {
    setSourceLang(value);
    translateText(sourceText, value, targetLang);
  };

  const handleTargetLangChange = (value: string) => {
    setTargetLang(value);
    translateText(sourceText, sourceLang, value);
  };

  const handleSourceTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setSourceText(text);
    translateText(text, sourceLang, targetLang);
  };

  const translateText = (text: string, sourceLang: string, targetLang: string) => {
    // Effettua una richiesta API a DeepL per tradurre il testo
    axios.post(
      'http://localhost:3001/translate',
      {
        text,
        source_lang: sourceLang,
        target_lang: targetLang,
      },
      {
        headers: {
          'Authorization': 'DeepL-Auth-Key [b53bc108-48aa-37e9-e4f9-6ee098265447:fx]',
        },
      }
    )
    .then((response) => {
      const translatedText = response.data.translations[0].text;
      setTargetText(translatedText);
    })
    .catch((error) => {
      console.error('Errore durante la traduzione:', error);
    });
  };

  return (
    <div>
      <h1>Translation tool</h1>
      <h4>Source Language</h4>
      <LanguageSelector value={sourceLang} onChange={handleSourceLangChange} />
      <TextArea
        showCount
        maxLength={100}
        style={{ height: 120, marginBottom: 24 }}
        onChange={handleSourceTextChange}
        placeholder="can resize"
      />
      <h4>Target Language</h4>
      <LanguageSelector value={targetLang} onChange={handleTargetLangChange} />
      <TextArea
        showCount
        maxLength={100}
        style={{ height: 120, marginBottom: 24 }}
        value={targetText}
        placeholder="Translation will appear here"
        readOnly
      />
    </div>
  );
}

export default PagGenerateT;
