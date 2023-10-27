import React, { useState, useEffect } from 'react'; // Importa useEffect
import { Input } from 'antd';
import { Select } from 'antd';
import translate from "translate";
import { send } from 'process';


import axios from 'axios';


// Testing Language API

let source_global = 'en_GB';
let target_global = 'es_ES';
let sourcetext_global = '';

interface ResultItem {
  full_code: string;
  englishName: string;
}

interface SLanguageSelectorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const SLanguageSelector: React.FC<SLanguageSelectorProps> = ({ value, onChange }) => {
  const [sourceLanguage, setSourceLanguage] = useState<string>(source_global); // Imposta lingua di default su 'en_GB'
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  const handleLanguageChange = (value: string) => {
    setSourceLanguage(value);
    source_global=value;
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://api-b2b.backenster.com/b1/api/v3/getLanguages',
        params: { platform: 'api', code: 'en_GB' },
        headers: {
          accept: 'application/json',
          Authorization: 'a_2KlpTKBUtsNsSDNuOyHVHv6hGR16Rcnpe8wRZFpXWRYTdYKBcW7qrXHnRhi5yXqf0BqGlJoUdxVTOl7O'
        }
      };

      try {
        const response = await axios.request(options);
        const result: ResultItem[] = response.data.result;
        const finalOptions = result.map((item: ResultItem) => ({
          value: item.full_code,
          label: item.englishName,
        }));
        setOptions(finalOptions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Esegui la richiesta una volta quando il componente viene montato

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Source Language"
      value={sourceLanguage}
      onChange={handleLanguageChange}
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={options}
    />
  );
};


interface TLanguageSelectorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const TLanguageSelector: React.FC<TLanguageSelectorProps> = ({ value, onChange }) => {
  const [targetLanguage, setTargetLanguage] = useState<string>(target_global); // Imposta lingua di default su 'es_ES'
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  const handleLanguageChange = (value: string) => {
    setTargetLanguage(value);
    target_global=value;
    
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://api-b2b.backenster.com/b1/api/v3/getLanguages',
        params: { platform: 'api', code: 'en_GB' },
        headers: {
          accept: 'application/json',
          Authorization: 'a_2KlpTKBUtsNsSDNuOyHVHv6hGR16Rcnpe8wRZFpXWRYTdYKBcW7qrXHnRhi5yXqf0BqGlJoUdxVTOl7O'
        }
      };

      try {
        const response = await axios.request(options);
        const result: ResultItem[] = response.data.result;
        const finalOptions = result.map((item: ResultItem) => ({
          value: item.full_code,
          label: item.englishName,
        }));
        setOptions(finalOptions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Esegui la richiesta una volta quando il componente viene montato

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Target Language"
      value={targetLanguage}
      onChange={handleLanguageChange}
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={options}
    />
  );
};




const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
};


interface STextAreasTranslationsProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const STextAreasTranslations: React.FC<STextAreasTranslationsProps> = ({ onChange }) => {

  
  return(
  <>
    <TextArea
      showCount
      maxLength={100}
      style={{ height: 120, marginBottom: 24 }}
      onChange={onChange}
      placeholder="Enter text to translate"
    />
  </>
  );
};

interface TTextAreasTranslationsProps {
  value: string;
}
const TTextAreasTranslations: React.FC<TTextAreasTranslationsProps> = ({ value }) => {
  
  return (
  <>
    <TextArea
      showCount
      maxLength={100}
      style={{ height: 120, marginBottom: 24 }}
      onChange={onChange}
      value={value}
      placeholder="Translation will appear here"
      readOnly
    />
  </>
  );
};



const translateText = async (sourceLanguage: string, targetLanguage: string, sourceText: string): Promise<string> => {
  const options = {
    method: 'POST',
    url: 'https://api-b2b.backenster.com/b1/api/v3/translate',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'a_2KlpTKBUtsNsSDNuOyHVHv6hGR16Rcnpe8wRZFpXWRYTdYKBcW7qrXHnRhi5yXqf0BqGlJoUdxVTOl7O',
    },
    data: {
      platform: 'api',
      data: [sourceText],
      from: sourceLanguage,
      to: targetLanguage,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.result[0];
  } catch (error) {
    console.error(error);
    throw error; // You can choose to handle the error differently if needed
  }
};


const PagGenerateT: React.FC = () => {
  
  const [targetText, setTargetText] = useState(''); // Testo di default vuoto
  const [sourceText, setSourceText] = useState(''); // Stato per gestire il testo sorgente

  useEffect(() => {
    setSourceLanguage(source_global);
    setTargetLanguage(target_global);
  }, [source_global, target_global]);

  const [sourceLanguage, setSourceLanguage] = useState(source_global); // Aggiungi le variabili di stato
  const [targetLanguage, setTargetLanguage] = useState(target_global);


  
  // Funzione per gestire il cambio di testo in STextAreasTranslations
  const handleTextAreaChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    
    const newValue = event.target.value;
    sourcetext_global = event.target.value;
    // if (newValue.endsWith(" ") || newValue.endsWith("\n")) {
      try {
        const translatedText = await translateText(sourceLanguage, targetLanguage, newValue);
        setTargetText(translatedText);
      } catch (error) {
        console.error(error);
        // Gestisci l'errore in modo appropriato
      }
      // }
  };

    // Funzione per gestire il cambio di testo in SLanguageSelector o TLanguageSelector
    const ShandleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log("aaaaa");
      const newSource = event.target.value;
      const newValue = sourcetext_global;
      // if (newValue.endsWith(" ") || newValue.endsWith("\n")) {
        try {
          const translatedText = await translateText(newSource, targetLanguage, newValue);
          setTargetText(translatedText);
        } catch (error) {
          console.error(error);
          // Gestisci l'errore in modo appropriato
        }
        // }
    };


    // Funzione per gestire il cambio di testo in SLanguageSelector o TLanguageSelector
    const ThandleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log("bbbbb");
      const newTarget = event.target.value;
      const newValue = sourcetext_global;
      // if (newValue.endsWith(" ") || newValue.endsWith("\n")) {
        try {
          const translatedText = await translateText(sourceLanguage, newTarget, newValue);
          setTargetText(translatedText);
        } catch (error) {
          console.error(error);
          // Gestisci l'errore in modo appropriato
        }
        // }
    };
    
  return (
    <div>
      <h1>Translation tool</h1>
      <h4>Source Language</h4>
      <SLanguageSelector value = {sourceLanguage} onChange={ShandleSelectChange} />
      <STextAreasTranslations onChange={handleTextAreaChange} />
      <h4>Target Language</h4>
      <TLanguageSelector value = {targetLanguage} onChange={ThandleSelectChange} />
      <TTextAreasTranslations value={targetText} />
    </div>
  );
};

export default PagGenerateT;