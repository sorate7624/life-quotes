import { useState, useEffect } from 'react';
import { getQuote, Quote } from './quotes';
import { TypeAnimation } from 'react-type-animation';

export const App = () => {
  const [quote, setQuote] = useState<Quote>({
    text: '',
    translateText: Promise.resolve(''),
    author: '',
    translateAuthor: Promise.resolve('')
  });

  const [translatedText, setTranslatedText] = useState('');
  const [translatedAuthor, setTranslatedAuthor] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      const quoteData = await getQuote();
      setQuote(quoteData);
    };
    fetchQuote();
  }, []);

  useEffect(() => {
    quote.translateText.then((text) => {
      setTranslatedText(text);
    });
  }, [quote.translateText]);

  useEffect(() => {
    quote.translateAuthor.then((author) => {
      setTranslatedAuthor(author);
    });
  }, [quote.translateAuthor]);

  const handleClick = async () => {
    const data = await getQuote();
    setQuote(data);
  };

  return (
    <div className='text-center max-w-screen-xl'>
      <h1 className='font-black mb-20 opacity-50 text-3xl sm:text-7xl leading-normal'>Random Quote Generator</h1>
      <TypeAnimation
        sequence={[
          translatedText
        ]}
        wrapper='p'
        cursor={true}
        className='text-3xl mb-8 font-black leading-normal'
        key={translatedText}
      />
      <p className='text-lg sm:text-2xl mb-4 leading-normal'>{quote.text}</p>
      <p className='font-bold text-lg sm:text mb-8 leading-normal'>- {quote.author} ({translatedAuthor})</p>
      <button onClick={handleClick} className='bg-neutral-900'>New Quote</button>
    </div>
  );
};
