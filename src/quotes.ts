import Translate from 'translate';

export interface Quote {
  text: string;
  translateText: Promise<string>;
  author: string;
  translateAuthor: Promise<string>;
}

export const getQuote = async (): Promise<Quote> => {
  const response = await fetch('https://api.quotable.io/random');
  const data = await response.json();
  const translateText = Translate(data.content, { to: 'ko' });
  const translateAuthor = Translate(data.author, { to: 'ko' });

  return {
    text: data.content,
    translateText,
    author: data.author,
    translateAuthor,
  };
};
